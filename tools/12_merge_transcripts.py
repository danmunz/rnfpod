#!/usr/bin/env python3
import argparse
from pathlib import Path

from tools._common import die, ep_work_dir, read_json, write_json


def detect_overlaps(segments: list[dict], overlap_threshold: float = 1.0) -> list[dict]:
    """
    Detect overlapping speech segments and log warnings.

    Args:
        segments: List of segments sorted by start time
        overlap_threshold: Log warning if overlap exceeds this duration (seconds)

    Returns:
        List of overlap details for segments exceeding threshold
    """
    overlaps = []

    for i in range(len(segments) - 1):
        curr = segments[i]
        next_seg = segments[i + 1]

        # Check if current segment ends after next segment starts
        if curr["end"] > next_seg["start"]:
            overlap_duration = curr["end"] - next_seg["start"]

            if overlap_duration >= overlap_threshold:
                overlaps.append({
                    "index": i,
                    "duration": overlap_duration,
                    "speaker1": curr["speaker"],
                    "speaker2": next_seg["speaker"],
                    "time_range": f"{next_seg['start']:.1f}s - {curr['end']:.1f}s",
                })

    return overlaps


def merge_transcripts(ch0_path: Path, ch1_path: Path, overlap_threshold: float = 1.0) -> dict:
    """
    Merge two channel transcripts into a single timeline.

    Args:
        ch0_path: Path to channel 0 transcript JSON
        ch1_path: Path to channel 1 transcript JSON
        overlap_threshold: Warn if overlaps exceed this duration (seconds)

    Returns:
        Merged transcript dict with segments sorted by (start_time, channel_index)
    """
    ch0_data = read_json(ch0_path)
    ch1_data = read_json(ch1_path)

    ch0_segments = ch0_data.get("segments", [])
    ch1_segments = ch1_data.get("segments", [])

    print(f"Channel 0: {len(ch0_segments)} segments")
    print(f"Channel 1: {len(ch1_segments)} segments")

    # Tag segments with channel index for stable sorting
    for seg in ch0_segments:
        seg["_channel"] = 0
    for seg in ch1_segments:
        seg["_channel"] = 1

    # Merge and sort by (start_time, channel_index)
    # This ensures deterministic ordering when segments start at the same time
    all_segments = ch0_segments + ch1_segments
    all_segments.sort(key=lambda s: (s["start"], s.get("_channel", 0)))

    # Remove temporary channel tag
    for seg in all_segments:
        seg.pop("_channel", None)

    # Detect overlapping speech
    overlaps = detect_overlaps(all_segments, overlap_threshold)

    if overlaps:
        print(f"\n⚠ Warning: Detected {len(overlaps)} overlapping speech segment(s) exceeding {overlap_threshold}s:")
        for overlap in overlaps:
            print(
                f"  • {overlap['speaker1']} ↔ {overlap['speaker2']}: "
                f"{overlap['duration']:.2f}s overlap at {overlap['time_range']}"
            )
        print("  (This is normal for natural conversation, but review if excessive)\n")

    return {
        "segments": all_segments,
        "source": {
            "provider": "deepgram",
            "merged_from": [str(ch0_path), str(ch1_path)],
            "total_segments": len(all_segments),
            "overlaps_detected": len(overlaps),
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Merge two channel transcripts into a single timeline"
    )
    parser.add_argument("--episode", required=True, help="Episode ID (e.g., ep001)")
    parser.add_argument(
        "--ch0",
        help="Path to channel 0 transcript JSON (default: episodes/<ep>/work/transcript.ch0.json)",
    )
    parser.add_argument(
        "--ch1",
        help="Path to channel 1 transcript JSON (default: episodes/<ep>/work/transcript.ch1.json)",
    )
    parser.add_argument(
        "--out",
        help="Output path for merged transcript (default: episodes/<ep>/work/transcript.json)",
    )
    parser.add_argument(
        "--overlap-threshold",
        type=float,
        default=1.0,
        help="Log warning if speech overlaps exceed this duration in seconds (default: 1.0)",
    )
    args = parser.parse_args()

    ep = args.episode
    work_dir = ep_work_dir(ep)

    # Determine input paths
    ch0_path = Path(args.ch0) if args.ch0 else work_dir / "transcript.ch0.json"
    ch1_path = Path(args.ch1) if args.ch1 else work_dir / "transcript.ch1.json"

    if not ch0_path.exists():
        die(f"Missing channel 0 transcript: {ch0_path}")
    if not ch1_path.exists():
        die(f"Missing channel 1 transcript: {ch1_path}")

    # Determine output path
    out_path = Path(args.out) if args.out else work_dir / "transcript.json"

    print(f"Merging transcripts from {ch0_path.name} and {ch1_path.name}...")
    merged = merge_transcripts(ch0_path, ch1_path, args.overlap_threshold)

    write_json(out_path, merged)
    print(f"✓ Wrote merged transcript to {out_path}")
    print(f"  Total segments: {len(merged['segments'])}")


if __name__ == "__main__":
    main()
