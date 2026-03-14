"""Episode management endpoints."""

from __future__ import annotations

import re
from datetime import date
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from tools._common import read_json, write_json
from studio.server.services.pipeline_status import get_step_status, get_step_order

router = APIRouter(tags=["episodes"])

EPISODES_DIR = Path("episodes")


class CreateEpisodeRequest(BaseModel):
    episode_id: str  # e.g. "ep003"


class UpdateEpisodeRequest(BaseModel):
    title: str | None = None
    recorded_date: str | None = None
    people: list[dict[str, str]] | None = None


def _episode_summary(ep: str) -> dict[str, Any]:
    base = EPISODES_DIR / ep
    meta_path = base / "ep.json"
    if not meta_path.exists():
        return {"episode_id": ep, "meta": None, "steps": get_step_status(ep)}
    meta = read_json(meta_path)
    pkg_path = base / "publish" / "episode_package.json"
    pkg = read_json(pkg_path) if pkg_path.exists() else None
    steps = get_step_status(ep)
    done_count = sum(1 for v in steps.values() if v == "done")
    return {
        "episode_id": ep,
        "meta": meta,
        "package": pkg,
        "steps": steps,
        "progress": f"{done_count}/{len(steps)}",
    }


@router.get("/episodes")
def list_episodes() -> list[dict]:
    if not EPISODES_DIR.exists():
        return []
    eps = sorted(
        d.name for d in EPISODES_DIR.iterdir()
        if d.is_dir() and (d / "ep.json").exists()
    )
    return [_episode_summary(ep) for ep in eps]


@router.get("/episodes/{ep}")
def get_episode(ep: str) -> dict:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id format. Use ep001, ep002, etc.")
    base = EPISODES_DIR / ep
    if not base.exists():
        raise HTTPException(404, f"Episode {ep} not found")
    return _episode_summary(ep)


@router.post("/episodes", status_code=201)
def create_episode(req: CreateEpisodeRequest) -> dict:
    ep = req.episode_id
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id format. Use ep001, ep002, etc.")
    base = EPISODES_DIR / ep
    if base.exists():
        raise HTTPException(409, f"Episode {ep} already exists")

    (base / "raw").mkdir(parents=True, exist_ok=True)
    (base / "work").mkdir(parents=True, exist_ok=True)
    (base / "publish").mkdir(parents=True, exist_ok=True)

    meta = {
        "episode_id": ep,
        "recorded_date": date.today().isoformat(),
        "title": "",
        "people": [
            {"id": "SPEAKER_00", "name": "Dad"},
            {"id": "SPEAKER_01", "name": "Daughter"},
        ],
        "brand": {
            "podcast_name": "Random Neural Firings",
            "palette_file": "assets/palette/palette.json",
            "cover_template": "assets/templates/cover_template.png",
            "cover_mask": "assets/templates/cover_mask.png",
            "font_regular": "assets/templates/fonts/Inter-Regular.ttf",
            "font_bold": "assets/templates/fonts/Inter-Bold.ttf",
        },
    }
    write_json(base / "ep.json", meta)
    return _episode_summary(ep)


@router.put("/episodes/{ep}")
def update_episode(ep: str, req: UpdateEpisodeRequest) -> dict:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id format")
    base = EPISODES_DIR / ep
    meta_path = base / "ep.json"
    if not meta_path.exists():
        raise HTTPException(404, f"Episode {ep} not found")

    meta = read_json(meta_path)
    if req.title is not None:
        meta["title"] = req.title
    if req.recorded_date is not None:
        meta["recorded_date"] = req.recorded_date
    if req.people is not None:
        meta["people"] = req.people
    write_json(meta_path, meta)
    return _episode_summary(ep)
