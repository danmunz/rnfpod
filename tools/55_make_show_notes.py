#!/usr/bin/env python3
import argparse
from pathlib import Path

from tools._common import read_json, die


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument("--rss-url", default="/feed.xml")
    parser.add_argument("--apple-url", default="")
    parser.add_argument("--spotify-url", default="")
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    pub = base / "publish"

    meta = read_json(base / "ep.json")
    pkg_path = pub / "episode_package.json"
    links_path = pub / "links.json"

    if not pkg_path.exists():
        die("Missing episode_package.json. Run tools/50_notes_and_segments.py first.")

    pkg = read_json(pkg_path)
    links = read_json(links_path) if links_path.exists() else []

    title = pkg.get("episode_title", ep)
    summary = pkg.get("summary", "")
    segs = pkg.get("segments", [])

    audio = f"/assets/audio/{ep}.mp3"
    cover = f"/assets/covers/{ep}.png"

    md = []
    md.append("---")
    md.append(f"title: \"{title}\"")
    md.append(f"date: {meta.get('recorded_date','')}")
    md.append(f"audio: {audio}")
    md.append(f"cover: {cover}")
    md.append("---\n")

    if summary:
        md.append(summary.strip())
        md.append("")

    md.append("## Segments")
    for s in segs:
        st = int(float(s.get("start", 0)))
        line = f"- [{s.get('title','Segment')}](/episodes/{ep}/?t={st}) - {s.get('one_sentence','').strip()}"
        md.append(line)
    md.append("")

    md.append("## Things mentioned")
    if not links:
        md.append("- (none)")
    else:
        for l in links:
            parts = [l.get("label", "")]  # first part always label
            if l.get("wikipedia_url"):
                parts.append(f"[Wikipedia]({l['wikipedia_url']})")
            if l.get("official_url"):
                parts.append(f"[Official site]({l['official_url']})")
            label = parts[0]
            refs = " ".join(parts[1:]).strip()
            md.append(f"- {label} {refs}".rstrip())
    md.append("")

    md.append("## Subscribe")
    md.append(f"- RSS: {args.rss_url}")
    if args.apple_url:
        md.append(f"- Apple Podcasts: {args.apple_url}")
    if args.spotify_url:
        md.append(f"- Spotify: {args.spotify_url}")

    out_path = pub / f"{ep}.md"
    out_path.write_text("\n".join(md) + "\n")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
