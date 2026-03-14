import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from tools._common import read_json, die


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument("--title-size", type=int, default=72)
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    meta = read_json(base / "ep.json")
    pub = base / "publish"
    work = base / "work"

    bg_path = work / "cover_bg.png"
    if not bg_path.exists():
        die(f"Missing {bg_path}. Generate a background image and save it there.")

    pkg_path = pub / "episode_package.json"
    if not pkg_path.exists():
        die("Missing episode_package.json. Run tools/50_notes_and_segments.py first.")

    pkg = read_json(pkg_path)

    template = Image.open(meta["brand"]["cover_template"]).convert("RGBA")
    mask = Image.open(meta["brand"]["cover_mask"]).convert("L")
    bg = Image.open(bg_path).convert("RGBA")

    # ensure bg matches template size
    bg = bg.resize(template.size)

    # composite: where mask is white, take bg; else keep template
    comp = Image.composite(bg, template, mask)

    # draw title
    draw = ImageDraw.Draw(comp)
    font_path = meta["brand"]["font_bold"]
    font = ImageFont.truetype(font_path, args.title_size)

    title = (pkg.get("episode_title") or meta.get("title") or ep).strip()

    # Basic wrapping
    max_width = int(comp.size[0] * 0.82)
    words = title.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=font) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)

    # Position: you will likely tweak these for your template
    x = int(comp.size[0] * 0.09)
    y = int(comp.size[1] * 0.78)

    # Shadow + text (simple, readable)
    for i, line in enumerate(lines[:3]):
        ly = y + i * int(args.title_size * 1.05)
        draw.text((x+2, ly+2), line, font=font, fill=(0, 0, 0, 160))
        draw.text((x, ly), line, font=font, fill=(255, 255, 255, 255))

    out_path = pub / f"{ep}.png"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    comp.save(out_path)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()