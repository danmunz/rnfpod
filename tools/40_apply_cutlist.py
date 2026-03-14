#!/usr/bin/env python3
import argparse
from pathlib import Path

from tools._common import read_json, write_json, die, run


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--episode", required=True)
    args = ap.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    work = base / "work"
    pub = base / "publish"

    if not (work / "cutlist.approved").exists():
        die("Cutlist not approved. Run tools/30_review_cutlist.py --approve first.")

    cutlist_path = work / "cutlist.json"
    if not cutlist_path.exists():
        die("Missing cutlist.json. Run tools/20_make_cutlist.py first.")

    input_wav = base / "raw" / f"{ep}.wav"
    if not input_wav.exists():
        die(f"Missing input WAV: {input_wav}")

    dur = float(
        run(
            [
                "ffprobe",
                "-v",
                "error",
                "-show_entries",
                "format=duration",
                "-of",
                "default=noprint_wrappers=1:nokey=1",
                str(input_wav),
            ]
        )
    )

    cutlist = read_json(cutlist_path)
    removes = cutlist.get("remove", [])

    # Normalize and merge remove ranges
    normalized = []
    for r in sorted(removes, key=lambda x: float(x["start"])):
        start = max(0.0, float(r["start"]))
        end = min(dur, float(r["end"]))
        if end <= start:
            continue
        if normalized and start <= normalized[-1]["end"]:
            normalized[-1]["end"] = max(normalized[-1]["end"], end)
        else:
            normalized.append({"start": start, "end": end})

    # Build keep ranges (complement of remove ranges)
    keeps = []
    cursor = 0.0
    for r in normalized:
        if r["start"] > cursor:
            keeps.append((cursor, r["start"]))
        cursor = r["end"]
    if cursor < dur:
        keeps.append((cursor, dur))

    pub.mkdir(parents=True, exist_ok=True)

    # Write ffmpeg concat list
    keep_txt = pub / "keep.txt"
    lines = []
    for start, end in keeps:
        lines.append(f"file '{input_wav.resolve()}'")
        lines.append(f"inpoint {start:.3f}")
        lines.append(f"outpoint {end:.3f}")
    keep_txt.write_text("\n".join(lines) + "\n")

    # Write time map
    time_map = []
    dest = 0.0
    for start, end in keeps:
        time_map.append(
            {
                "source_from": round(start, 3),
                "source_to": round(end, 3),
                "dest_from": round(dest, 3),
            }
        )
        dest += end - start
    write_json(pub / "time_map.json", time_map)

    print(f"Wrote {keep_txt}")
    print(f"Wrote {pub/'time_map.json'}")


if __name__ == "__main__":
    main()
