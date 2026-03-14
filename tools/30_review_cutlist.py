#!/usr/bin/env python3
"""
30_review_cutlist.py

Review gate for the cutlist. Creates cutlist.approved when --approve is used.
"""

import argparse
from pathlib import Path

from tools._common import ep_work_dir, die


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument("--approve", action="store_true")
    args = parser.parse_args()

    ep = args.episode
    work = ep_work_dir(ep)

    cutlist_path = Path(work) / "cutlist.json"
    review_md = Path(work) / "cutlist_review.md"
    approved_flag = Path(work) / "cutlist.approved"

    if not cutlist_path.exists():
        die("Missing cutlist.json. Run tools/20_make_cutlist.py first.")
    if not review_md.exists():
        die("Missing cutlist_review.md. Run tools/20_make_cutlist.py first.")

    if args.approve:
        approved_flag.write_text("approved")
        print(f"Approved: {approved_flag}")
        return

    print(f"Review this file: {review_md}")
    print(f"Approve with: python tools/30_review_cutlist.py --episode {ep} --approve")
    raise SystemExit(2)


if __name__ == "__main__":
    main()
