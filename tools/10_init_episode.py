#!/usr/bin/env python3
import argparse
from datetime import date
from pathlib import Path

from tools._common import die, write_json


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("episode", help="Episode id, e.g. ep001")
    parser.add_argument("--force", action="store_true", help="Overwrite existing episode")
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    if base.exists() and not args.force:
        die(f"Episode {ep} already exists. Use --force to overwrite.")

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
    print(f"Initialized {ep} at {base}")


if __name__ == "__main__":
    main()
