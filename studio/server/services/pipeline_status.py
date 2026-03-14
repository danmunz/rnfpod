"""Detect pipeline step completion by checking output files."""

from __future__ import annotations

from pathlib import Path

EPISODES_DIR = Path("episodes")

# Each step maps to a list of files whose existence signals completion.
# Paths are relative to episodes/{ep}/
STEP_OUTPUTS: dict[str, list[str]] = {
    "init":        ["ep.json"],
    "upload-audio": ["raw/{ep}.wav"],
    "transcribe":  ["work/transcript.json"],
    "cutlist":     ["work/cutlist.json"],
    "review":      ["work/cutlist.approved"],
    "apply-cuts":  ["publish/keep.txt", "publish/time_map.json"],
    "render":      ["publish/{ep}_cut.wav"],
    "remap":       ["publish/transcript_published.json"],
    "notes":       ["publish/episode_package.json"],
    "links":       ["publish/links.json"],
    "show-notes":  ["publish/{ep}.md"],
    "cover":       ["publish/{ep}.png"],
    "publish":     [],  # determined by R2 upload + content/episodes/ file
}

STEP_ORDER = list(STEP_OUTPUTS.keys())


def _resolve(pattern: str, ep: str) -> str:
    return pattern.replace("{ep}", ep)


def get_step_status(ep: str) -> dict[str, str]:
    """Return {step_name: 'done' | 'pending'} for every pipeline step."""
    base = EPISODES_DIR / ep
    result: dict[str, str] = {}
    for step, patterns in STEP_OUTPUTS.items():
        if not patterns:
            # Special case: publish is done if the content/episodes file exists
            if step == "publish":
                # Check multiple possible slug patterns
                done = any(Path("content/episodes").glob(f"*{ep}*"))
                result[step] = "done" if done else "pending"
            else:
                result[step] = "pending"
            continue
        done = all((base / _resolve(p, ep)).exists() for p in patterns)
        result[step] = "done" if done else "pending"
    return result


def get_step_order() -> list[str]:
    return STEP_ORDER
