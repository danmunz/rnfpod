"""Preview endpoints for show notes and cover art."""

from __future__ import annotations

import re
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from tools._common import read_json

router = APIRouter(tags=["preview"])

EPISODES_DIR = Path("episodes")


def _validate_ep(ep: str) -> Path:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id")
    base = EPISODES_DIR / ep
    if not base.exists():
        raise HTTPException(404, f"Episode {ep} not found")
    return base


@router.get("/episodes/{ep}/preview/notes")
def preview_notes(ep: str) -> dict:
    """Return episode_package.json + links.json for preview."""
    base = _validate_ep(ep)
    pub = base / "publish"

    pkg_path = pub / "episode_package.json"
    if not pkg_path.exists():
        raise HTTPException(404, "Episode package not found. Run the notes step first.")

    pkg = read_json(pkg_path)
    links = read_json(pub / "links.json") if (pub / "links.json").exists() else []
    meta = read_json(base / "ep.json")

    return {
        "meta": meta,
        "package": pkg,
        "links": links,
    }


@router.get("/episodes/{ep}/preview/cover")
def preview_cover(ep: str) -> FileResponse:
    """Serve the generated cover image."""
    base = _validate_ep(ep)
    cover = base / "publish" / f"{ep}.png"
    if not cover.exists():
        raise HTTPException(404, "Cover image not found. Run the cover step first.")
    return FileResponse(cover, media_type="image/png")


@router.get("/episodes/{ep}/preview/markdown")
def preview_markdown(ep: str) -> dict:
    """Return the generated show notes markdown."""
    base = _validate_ep(ep)
    md_path = base / "publish" / f"{ep}.md"
    if not md_path.exists():
        raise HTTPException(404, "Show notes markdown not found.")
    return {"markdown": md_path.read_text()}
