#!/usr/bin/env python3
import argparse
import os
from pathlib import Path

import requests

from tools._common import die, ep_work_dir


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", help="Episode ID (used to derive default paths)")
    parser.add_argument("--audio", help="Path to input audio file (overrides episode default)")
    parser.add_argument("--out", help="Path to output JSON file (overrides episode default)")
    parser.add_argument("--language", default=os.getenv("DEEPGRAM_LANGUAGE", "en"))
    parser.add_argument(
        "--diarize",
        action="store_true",
        help="Enable speaker diarization (default: disabled for mono channel audio)",
    )
    args = parser.parse_args()

    # Determine audio path
    if args.audio:
        audio_path = Path(args.audio)
    elif args.episode:
        ep = args.episode
        audio_path = Path("episodes") / ep / "raw" / f"{ep}.wav"
    else:
        die("Either --episode or --audio must be specified")

    if not audio_path.exists():
        die(f"Missing input WAV: {audio_path}")

    # Determine output path
    if args.out:
        out_path = Path(args.out)
    elif args.episode:
        work_dir = ep_work_dir(args.episode)
        out_path = work_dir / "transcript.dg.json"
    else:
        die("Either --episode or --out must be specified")

    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        die("Missing DEEPGRAM_API_KEY in environment")

    model = os.getenv("DEEPGRAM_MODEL", "nova-2")
    endpoint = "https://api.deepgram.com/v1/listen"
    params = {
        "model": model,
        "language": args.language,
        "punctuate": "true",
        "smart_format": "true",
        "utterances": "true",
    }

    # Only enable diarization if explicitly requested
    # (For per-channel transcription, we don't need diarization)
    if args.diarize:
        params["diarize"] = "true"

    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "audio/wav",
    }

    diarize_status = "with diarization" if args.diarize else "without diarization"
    print(f"Transcribing {audio_path.name} with Deepgram ({model}, {diarize_status})...")
    audio_bytes = audio_path.read_bytes()
    resp = requests.post(endpoint, params=params, headers=headers, data=audio_bytes, timeout=900)
    if resp.status_code != 200:
        die(f"Deepgram request failed: {resp.status_code} {resp.text}")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(resp.text)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
