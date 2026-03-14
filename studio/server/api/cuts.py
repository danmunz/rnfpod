"""Cut review data endpoints."""

from __future__ import annotations

import re
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from tools._common import read_json, write_json

router = APIRouter(tags=["cuts"])

EPISODES_DIR = Path("episodes")


def _validate_ep(ep: str) -> Path:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id")
    base = EPISODES_DIR / ep
    if not base.exists():
        raise HTTPException(404, f"Episode {ep} not found")
    return base


class CutItem(BaseModel):
    start: float
    end: float
    reason: str
    approved: bool = True


class UpdateCutsRequest(BaseModel):
    cuts: list[CutItem]


@router.get("/episodes/{ep}/cuts")
def get_cuts(ep: str) -> dict:
    """Return the cutlist with transcript context."""
    base = _validate_ep(ep)

    # Try work dir first, then publish dir
    cutlist_path = base / "work" / "cutlist.json"
    if not cutlist_path.exists():
        cutlist_path = base / "publish" / "cutlist.json"
    if not cutlist_path.exists():
        raise HTTPException(404, "No cutlist found. Run the cutlist step first.")

    cutlist = read_json(cutlist_path)
    removes = cutlist.get("remove", [])

    # Load transcript for context
    transcript_path = base / "work" / "transcript.json"
    if not transcript_path.exists():
        transcript_path = base / "publish" / "transcript_published.json"
    if not transcript_path.exists():
        transcript_path = base / "work" / "transcript.json"

    segments = []
    if transcript_path.exists():
        transcript = read_json(transcript_path)
        segments = transcript.get("segments", [])

    # Enrich cuts with surrounding transcript context
    enriched_cuts = []
    approved_flag = (base / "work" / "cutlist.approved").exists()

    for cut in removes:
        start = float(cut["start"])
        end = float(cut["end"])
        before_text = ""
        after_text = ""
        for seg in segments:
            seg_end = float(seg.get("end", 0))
            seg_start = float(seg.get("start", 0))
            if seg_end <= start and seg_end > start - 5:
                before_text = seg.get("text", "")
            if seg_start >= end and seg_start < end + 5:
                after_text = seg.get("text", "")
                break

        enriched_cuts.append({
            "start": start,
            "end": end,
            "duration": round(end - start, 2),
            "reason": cut.get("reason", ""),
            "before_text": before_text,
            "after_text": after_text,
            "approved": True,
        })

    return {
        "cuts": enriched_cuts,
        "total_cut_duration": round(sum(c["duration"] for c in enriched_cuts), 2),
        "approved": approved_flag,
    }


@router.put("/episodes/{ep}/cuts")
def update_cuts(ep: str, req: UpdateCutsRequest) -> dict:
    """Save updated cut approvals and regenerate the cutlist."""
    base = _validate_ep(ep)

    work = base / "work"
    work.mkdir(parents=True, exist_ok=True)

    # Save only approved cuts back to cutlist.json
    approved_cuts = [
        {"start": c.start, "end": c.end, "reason": c.reason}
        for c in req.cuts if c.approved
    ]
    write_json(work / "cutlist.json", {"remove": approved_cuts})

    # Remove the approved flag so review must be re-confirmed
    flag = work / "cutlist.approved"
    if flag.exists():
        flag.unlink()

    return {"saved": len(approved_cuts), "rejected": len(req.cuts) - len(approved_cuts)}


@router.post("/episodes/{ep}/cuts/approve")
def approve_cuts(ep: str) -> dict:
    """Mark the current cutlist as approved."""
    base = _validate_ep(ep)
    flag = base / "work" / "cutlist.approved"
    flag.parent.mkdir(parents=True, exist_ok=True)
    flag.touch()
    return {"approved": True}


@router.get("/episodes/{ep}/transcript")
def get_transcript(ep: str) -> dict:
    """Return the full transcript with speaker labels."""
    base = _validate_ep(ep)

    # Prefer published transcript, fall back to work transcript
    for path in [
        base / "publish" / "transcript_published.json",
        base / "work" / "transcript.json",
    ]:
        if path.exists():
            return read_json(path)

    raise HTTPException(404, "No transcript found. Run the transcribe step first.")
