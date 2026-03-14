#!/usr/bin/env python3
import argparse
from pathlib import Path

from tools._common import die, load_speaker_map, read_json, write_json


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", help="Episode ID (used to derive default paths)")
    parser.add_argument("--input", help="Path to input Deepgram JSON (overrides episode default)")
    parser.add_argument("--out", help="Path to output normalized JSON (overrides episode default)")
    parser.add_argument(
        "--speaker-id",
        help="Force all segments to this speaker ID (e.g., '0' or '1' for stereo channels)",
    )
    parser.add_argument(
        "--allow-no-diarization",
        action="store_true",
        help="Fallback to a single-speaker transcript if utterances are missing",
    )
    args = parser.parse_args()

    # Determine input path
    if args.input:
        dg_path = Path(args.input)
    elif args.episode:
        work = Path("episodes") / args.episode / "work"
        dg_path = work / "transcript.dg.json"
    else:
        die("Either --episode or --input must be specified")

    if not dg_path.exists():
        die(f"Missing input file: {dg_path}. Run tools/10_transcribe_deepgram.py first.")

    # Determine output path
    if args.out:
        out_path = Path(args.out)
    elif args.episode:
        work = Path("episodes") / args.episode / "work"
        out_path = work / "transcript.json"
    else:
        die("Either --episode or --out must be specified")

    data = read_json(dg_path)
    try:
        results = data["results"]
        channels = results["channels"]
        alt = channels[0]["alternatives"][0]
    except Exception:
        die("Unexpected Deepgram response shape")

    # Deepgram may return utterances at results.utterances or on the alternative.
    utterances = results.get("utterances") or alt.get("utterances")
    if not utterances:
        if not args.allow_no_diarization:
            die(
                "Deepgram response missing utterances. "
                "Ensure utterances=true in the request or rerun with "
                "--allow-no-diarization for a single-speaker fallback."
            )
        words = alt.get("words", [])
        if not words:
            die("Deepgram response missing utterances and words.")
        transcript = (alt.get("transcript") or "").strip()
        if not transcript:
            transcript = " ".join(w.get("word", "") for w in words).strip()
        utterances = [
            {
                "start": words[0].get("start", 0.0),
                "end": words[-1].get("end", 0.0),
                "speaker": "0",
                "transcript": transcript,
            }
        ]
        print("Warning: no utterances found; using single-speaker fallback.")

    # Load speaker map (supports episode-level or repo-level speakers.json)
    speaker_map = load_speaker_map(args.episode) if args.episode else {}

    # Default speaker mapping for channel IDs
    default_speakers = {
        "0": "Speaker 0",
        "1": "Speaker 1",
    }

    segments = []
    for u in utterances:
        start = float(u.get("start", 0.0))
        end = float(u.get("end", 0.0))
        text = (u.get("transcript") or "").strip()
        if not text:
            continue

        # If --speaker-id is provided, override all speaker IDs with that value
        if args.speaker_id is not None:
            spk_id = str(args.speaker_id)
        else:
            spk_id = str(u.get("speaker", ""))

        # Map speaker ID to name
        spk_name = speaker_map.get(spk_id)
        if not spk_name:
            # Try default mapping for channel IDs
            spk_name = default_speakers.get(spk_id)
        if not spk_name:
            # Final fallback
            spk_name = f"SPEAKER_{int(spk_id):02d}" if spk_id.isdigit() else "SPEAKER"

        segments.append(
            {
                "start": start,
                "end": end,
                "speaker_id": spk_id,
                "speaker": spk_name,
                "text": text,
            }
        )

    out = {
        "segments": segments,
        "source": {
            "provider": "deepgram",
            "utterances": len(segments),
        },
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    write_json(out_path, out)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
