#!/usr/bin/env python3
"""
20_make_cutlist.py

Generate a deterministic cutlist based on silence gaps.
"""

import argparse
from pathlib import Path

from tools._common import ep_work_dir, read_json, write_json, format_ts, die


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument("--min-gap", type=float, default=2.0, help="Silence threshold in seconds")
    args = parser.parse_args()

    ep = args.episode
    work = ep_work_dir(ep)

    transcript_path = Path(work) / "transcript.json"
    if not transcript_path.exists():
        die("Missing transcript.json. Run tools/12_normalize_transcript.py first.")

    data = read_json(transcript_path)
    segments = data.get("segments", [])
    segments = sorted(segments, key=lambda s: float(s["start"]))

    removes = []
    contexts = []
    for prev, curr in zip(segments, segments[1:]):
        prev_end = float(prev["end"])
        curr_start = float(curr["start"])
        gap = curr_start - prev_end
        if gap >= args.min_gap:
            removes.append(
                {
                    "start": round(prev_end, 3),
                    "end": round(curr_start, 3),
                    "reason": f"silence>{args.min_gap:.1f}s",
                }
            )
            contexts.append((prev.get("text", "").strip(), curr.get("text", "").strip()))

    cutlist = {"remove": removes}
    cutlist_path = Path(work) / "cutlist.json"
    write_json(cutlist_path, cutlist)

    review_path = Path(work) / "cutlist_review.md"
    lines = [
        f"# Cutlist review for {ep}\n",
        f"Silence threshold: {args.min_gap:.1f}s\n",
        "| Start | End | Dur | Reason | Context |\n",
        "| --- | --- | --- | --- | --- |\n",
    ]
    for idx, r in enumerate(removes):
        start = float(r["start"])
        end = float(r["end"])
        dur = end - start
        prev_text, next_text = contexts[idx] if idx < len(contexts) else ("", "")
        context = f"… {prev_text} / {next_text} …"
        lines.append(
            f"| {format_ts(start)} | {format_ts(end)} | {dur:.1f}s | {r['reason']} | {context} |\n"
        )

    review_path.write_text("".join(lines))
    print(f"Wrote {cutlist_path}")
    print(f"Wrote {review_path}")


if __name__ == "__main__":
    main()
