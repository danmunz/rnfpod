"""Pipeline step execution with Server-Sent Events for log streaming."""

from __future__ import annotations

import asyncio
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse

from tools._common import read_json, write_json
from studio.server.services.pipeline_status import get_step_status
from studio.server.services.r2_upload import upload_file as r2_upload

router = APIRouter(tags=["pipeline"])

EPISODES_DIR = Path("episodes")

# Map step names to the Python module or shell command to run
STEP_COMMANDS: dict[str, list[str] | None] = {
    "transcribe":  ["bash", "tools/10_transcribe.sh", "{ep}"],
    "cutlist":     [sys.executable, "-m", "tools.20_make_cutlist", "--episode", "{ep}"],
    "apply-cuts":  [sys.executable, "-m", "tools.40_apply_cutlist", "--episode", "{ep}"],
    "render":      None,  # handled specially (multi-step ffmpeg)
    "remap":       [sys.executable, "-m", "tools.45_remap_transcript", "--episode", "{ep}"],
    "notes":       [sys.executable, "-m", "tools.50_notes_and_segments", "--episode", "{ep}"],
    "links":       [sys.executable, "-m", "tools.60_link_resolve", "--episode", "{ep}"],
    "show-notes":  [sys.executable, "-m", "tools.55_make_show_notes", "--episode", "{ep}"],
    "cover":       [sys.executable, "-m", "tools.70_make_cover", "--episode", "{ep}"],
}


def _validate_ep(ep: str) -> Path:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id")
    base = EPISODES_DIR / ep
    if not base.exists():
        raise HTTPException(404, f"Episode {ep} not found")
    return base


async def _stream_process(cmd: list[str]):
    """Run a subprocess and yield SSE events with stdout/stderr lines."""
    yield f"data: {json.dumps({'type': 'start', 'cmd': ' '.join(cmd)})}\n\n"

    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )

    assert proc.stdout is not None
    async for line in proc.stdout:
        text = line.decode("utf-8", errors="replace").rstrip()
        yield f"data: {json.dumps({'type': 'log', 'text': text})}\n\n"

    await proc.wait()
    status = "success" if proc.returncode == 0 else "error"
    yield f"data: {json.dumps({'type': 'done', 'status': status, 'code': proc.returncode})}\n\n"


@router.post("/episodes/{ep}/upload-audio")
async def upload_audio(ep: str, file: UploadFile = File(...)) -> dict:
    """Upload a WAV file as the raw audio for an episode."""
    base = _validate_ep(ep)
    raw_dir = base / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    dest = raw_dir / f"{ep}.wav"
    with open(dest, "wb") as f:
        while chunk := await file.read(1024 * 1024):
            f.write(chunk)

    return {"status": "uploaded", "path": str(dest)}


@router.post("/episodes/{ep}/run/{step}")
async def run_step(ep: str, step: str) -> StreamingResponse:
    """Execute a pipeline step and stream its output as SSE."""
    _validate_ep(ep)

    if step == "review":
        # Special case: just create the approval flag
        flag = EPISODES_DIR / ep / "work" / "cutlist.approved"
        flag.parent.mkdir(parents=True, exist_ok=True)
        flag.touch()
        async def _review_sse():
            yield f"data: {json.dumps({'type': 'log', 'text': 'Cut list approved.'})}\n\n"
            yield f"data: {json.dumps({'type': 'done', 'status': 'success', 'code': 0})}\n\n"
        return StreamingResponse(_review_sse(), media_type="text/event-stream")

    if step == "publish":
        return StreamingResponse(
            _publish_step(ep),
            media_type="text/event-stream",
        )

    if step == "render":
        return StreamingResponse(
            _render_step(ep),
            media_type="text/event-stream",
        )

    if step not in STEP_COMMANDS or STEP_COMMANDS[step] is None:
        raise HTTPException(400, f"Unknown step: {step}")

    cmd = [arg.replace("{ep}", ep) for arg in STEP_COMMANDS[step]]
    return StreamingResponse(_stream_process(cmd), media_type="text/event-stream")


async def _render_step(ep: str):
    """Render: ffmpeg concat → WAV → MP3."""
    pub = EPISODES_DIR / ep / "publish"
    keep_txt = pub / "keep.txt"
    if not keep_txt.exists():
        yield f"data: {json.dumps({'type': 'done', 'status': 'error', 'code': 1, 'text': 'Missing keep.txt. Run apply-cuts first.'})}\n\n"
        return

    wav_out = pub / f"{ep}_cut.wav"
    mp3_out = pub / f"{ep}.mp3"

    # Step 1: Concat to WAV
    cmd1 = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(keep_txt),
            "-ar", "48000", "-ac", "2", str(wav_out)]
    yield f"data: {json.dumps({'type': 'log', 'text': 'Rendering WAV from keep list...'})}\n\n"
    async for event in _stream_process(cmd1):
        yield event
        if '"status": "error"' in event:
            return

    # Step 2: Encode to MP3
    cmd2 = ["ffmpeg", "-y", "-i", str(wav_out), "-codec:a", "libmp3lame",
            "-qscale:a", "2", str(mp3_out)]
    yield f"data: {json.dumps({'type': 'log', 'text': 'Encoding MP3...'})}\n\n"
    async for event in _stream_process(cmd2):
        yield event


async def _publish_step(ep: str):
    """Publish: upload to R2, generate site markdown, rebuild content."""
    base = EPISODES_DIR / ep
    pub = base / "publish"
    meta = read_json(base / "ep.json")

    mp3 = pub / f"{ep}.mp3"
    cover = pub / f"{ep}.png"
    pkg_path = pub / "episode_package.json"

    missing = []
    if not mp3.exists():
        missing.append(str(mp3))
    if not pkg_path.exists():
        missing.append(str(pkg_path))
    if missing:
        yield f"data: {json.dumps({'type': 'done', 'status': 'error', 'code': 1, 'text': f'Missing files: {missing}'})}\n\n"
        return

    pkg = read_json(pkg_path)
    links = read_json(pub / "links.json") if (pub / "links.json").exists() else []

    # 1. Upload to R2
    audio_url = ""
    cover_url = ""
    try:
        yield f"data: {json.dumps({'type': 'log', 'text': 'Uploading MP3 to R2...'})}\n\n"
        audio_url = r2_upload(mp3, f"audio/{ep}.mp3", "audio/mpeg")
        yield f"data: {json.dumps({'type': 'log', 'text': f'MP3 uploaded: {audio_url}'})}\n\n"

        if cover.exists():
            yield f"data: {json.dumps({'type': 'log', 'text': 'Uploading cover to R2...'})}\n\n"
            cover_url = r2_upload(cover, f"covers/{ep}.png", "image/png")
            yield f"data: {json.dumps({'type': 'log', 'text': f'Cover uploaded: {cover_url}'})}\n\n"
    except Exception as exc:
        yield f"data: {json.dumps({'type': 'log', 'text': f'R2 upload failed: {exc}. Continuing with local paths.'})}\n\n"
        audio_url = f"audio/{ep}.mp3"
        cover_url = f"covers/{ep}.png"

    # 2. Generate content/episodes markdown
    yield f"data: {json.dumps({'type': 'log', 'text': 'Generating episode markdown...'})}\n\n"

    title = pkg.get("episode_title", meta.get("title", ep))
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    summary = pkg.get("summary", "")
    segments = pkg.get("segments", [])

    # Determine episode number
    content_dir = Path("content/episodes")
    content_dir.mkdir(parents=True, exist_ok=True)
    existing_numbers = []
    for md_file in content_dir.glob("*.md"):
        text = md_file.read_text()
        for line in text.split("\n"):
            if line.startswith("number:"):
                try:
                    existing_numbers.append(int(line.split(":")[1].strip()))
                except ValueError:
                    pass
    ep_number = max(existing_numbers, default=0) + 1
    # If there's already a file for this episode, reuse its number
    ep_num_from_id = int(ep.replace("ep", ""))
    if ep_num_from_id in existing_numbers:
        ep_number = ep_num_from_id
    elif ep_num_from_id not in existing_numbers:
        ep_number = ep_num_from_id

    # Get duration from mp3 if ffprobe available
    duration = ""
    try:
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", str(mp3)],
            capture_output=True, text=True, timeout=10,
        )
        total_secs = float(result.stdout.strip())
        mins = int(total_secs // 60)
        secs = int(total_secs % 60)
        duration = f"{mins}:{secs:02d}"
    except Exception:
        duration = "0:00"

    # Build frontmatter segments
    fm_segments = []
    for s in segments:
        fm_segments.append({
            "title": s.get("title", "Segment"),
            "timestamp": int(float(s.get("start", 0))),
            "description": s.get("one_sentence", ""),
        })

    # Build mentions as resources
    resources = []
    for link in links:
        r: dict[str, str] = {"title": link.get("label", ""), "type": link.get("type", "Other")}
        if link.get("wikipedia_url"):
            r["url"] = link["wikipedia_url"]
        elif link.get("official_url"):
            r["url"] = link["official_url"]
        resources.append(r)

    # Write markdown with YAML frontmatter
    filename = f"{ep_number:03d}-{slug}.md"
    md_lines = [
        "---",
        f"number: {ep_number}",
        f'title: "{title}"',
        f'slug: "{slug}"',
        f'date: "{meta.get("recorded_date", "")}"',
        f'duration: "{duration}"',
        "published: true",
        f'audioUrl: "{audio_url}"',
        "topics: []",
        'gradient: "from-violet-600 to-pink-600"',
        f'annotation: ""',
    ]
    if fm_segments:
        md_lines.append("segments:")
        for seg in fm_segments:
            md_lines.append(f'  - title: "{seg["title"]}"')
            md_lines.append(f"    timestamp: {seg['timestamp']}")
            md_lines.append(f'    description: "{seg["description"]}"')
    if resources:
        md_lines.append("resources:")
        for res in resources:
            md_lines.append(f'  - title: "{res["title"]}"')
            if res.get("url"):
                md_lines.append(f'    url: "{res["url"]}"')
            md_lines.append(f'    type: "{res.get("type", "Other")}"')
    md_lines.append("---")
    md_lines.append("")
    if summary:
        md_lines.append(summary.strip())
        md_lines.append("")

    out_path = content_dir / filename
    out_path.write_text("\n".join(md_lines) + "\n")
    yield f"data: {json.dumps({'type': 'log', 'text': f'Wrote {out_path}'})}\n\n"

    # 3. Rebuild content JSON
    yield f"data: {json.dumps({'type': 'log', 'text': 'Rebuilding episodes.json...'})}\n\n"
    proc = await asyncio.create_subprocess_exec(
        "node", "scripts/build-content.mjs",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )
    assert proc.stdout is not None
    async for line in proc.stdout:
        text = line.decode("utf-8", errors="replace").rstrip()
        yield f"data: {json.dumps({'type': 'log', 'text': text})}\n\n"
    await proc.wait()

    yield f"data: {json.dumps({'type': 'done', 'status': 'success', 'code': 0})}\n\n"
