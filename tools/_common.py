from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EPISODES = ROOT / "episodes"


def load_config_env() -> None:
    """Load config.env and .env files if they exist (like 'set -a; source config.env; set +a')."""
    for env_file in ["config.env", ".env"]:
        env_path = ROOT / env_file
        if env_path.exists():
            with open(env_path) as f:
                for line in f:
                    line = line.strip()
                    # Skip comments and empty lines
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        key, _, value = line.partition("=")
                        key = key.strip()
                        value = value.strip()
                        # Only set if not already in environment
                        if key and key not in os.environ:
                            os.environ[key] = value


def die(msg: str, code: int = 1) -> None:
    raise SystemExit(f"ERROR: {msg}")


def run(cmd: list[str]) -> str:
    return subprocess.check_output(cmd).decode().strip()


def ep_dir(episode: str) -> Path:
    return EPISODES / episode


def ep_raw_dir(episode: str) -> Path:
    return ep_dir(episode) / "raw"


def ep_work_dir(episode: str) -> Path:
    return ep_dir(episode) / "work"


def ep_publish_dir(episode: str) -> Path:
    return ep_dir(episode) / "publish"


def read_json(path: Path):
    return json.loads(path.read_text())


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def format_ts(seconds: float) -> str:
    seconds = max(0, float(seconds))
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m:02d}:{s:02d}"


def load_speaker_map(episode: str) -> dict[str, str]:
    """Load speaker map from episode work folder, episode folder, or repo root."""
    work_map = ep_work_dir(episode) / "speaker_map.json"
    ep_map = ep_dir(episode) / "speakers.json"
    root_map = ROOT / "speakers.json"
    if work_map.exists():
        return read_json(work_map)
    if ep_map.exists():
        return read_json(ep_map)
    if root_map.exists():
        return read_json(root_map)
    return {}
