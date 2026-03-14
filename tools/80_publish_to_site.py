#!/usr/bin/env python3
import argparse
import shutil
from pathlib import Path

from tools._common import die


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    pub = base / "publish"

    mp3 = pub / f"{ep}.mp3"
    md = pub / f"{ep}.md"
    cover = pub / f"{ep}.png"

    if not mp3.exists():
        die(f"Missing {mp3}")
    if not md.exists():
        die(f"Missing {md}")
    if not cover.exists():
        die(f"Missing {cover}")

    site_audio = Path("site/src/assets/audio")
    site_covers = Path("site/src/assets/covers")
    site_eps = Path("site/src/episodes")

    site_audio.mkdir(parents=True, exist_ok=True)
    site_covers.mkdir(parents=True, exist_ok=True)
    site_eps.mkdir(parents=True, exist_ok=True)

    shutil.copy(mp3, site_audio / mp3.name)
    shutil.copy(cover, site_covers / cover.name)
    shutil.copy(md, site_eps / md.name)

    print("Published to site/")


if __name__ == "__main__":
    main()
