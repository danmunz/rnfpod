#!/usr/bin/env python3
import argparse
import json
import subprocess
from pathlib import Path

from tools._common import die, ep_raw_dir, ep_work_dir


def get_audio_channels(audio_path: Path) -> int:
    """Use ffprobe to determine the number of audio channels."""
    cmd = [
        "ffprobe",
        "-v", "error",
        "-select_streams", "a:0",
        "-show_entries", "stream=channels",
        "-of", "json",
        str(audio_path),
    ]
    try:
        result = subprocess.check_output(cmd).decode()
        data = json.loads(result)
        channels = data["streams"][0]["channels"]
        return int(channels)
    except Exception as e:
        die(f"Failed to probe audio channels: {e}")


def split_stereo(audio_path: Path, output_dir: Path, base_name: str) -> tuple[Path, Path]:
    """Split stereo audio into two mono channel files."""
    ch0_path = output_dir / f"{base_name}_ch0.wav"
    ch1_path = output_dir / f"{base_name}_ch1.wav"

    # Use filter_complex with channelsplit to extract each channel separately
    # This is more reliable than pan for files with unknown channel layout
    cmd = [
        "ffmpeg", "-y",
        "-i", str(audio_path),
        "-filter_complex", "[0:a]channelsplit=channel_layout=stereo[FL][FR]",
        "-map", "[FL]", "-ar", "48000", str(ch0_path),
        "-map", "[FR]", "-ar", "48000", str(ch1_path),
    ]

    print(f"Splitting stereo to {ch0_path.name} and {ch1_path.name}...")
    subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return ch0_path, ch1_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Split a stereo WAV file into two mono channel files"
    )
    parser.add_argument("--episode", required=True, help="Episode ID (e.g., ep001)")
    parser.add_argument(
        "--force-mono",
        action="store_true",
        help="If input is mono, duplicate it to both channels (for testing)",
    )
    args = parser.parse_args()

    ep = args.episode
    raw_dir = ep_raw_dir(ep)
    work_dir = ep_work_dir(ep)
    audio_path = raw_dir / f"{ep}.wav"

    if not audio_path.exists():
        die(f"Missing input WAV: {audio_path}")

    # Check channel count
    channels = get_audio_channels(audio_path)
    print(f"Detected {channels} channel(s) in {audio_path.name}")

    if channels == 2:
        # Standard stereo split
        ch0, ch1 = split_stereo(audio_path, work_dir, ep)
        print(f"✓ Split stereo audio into:\n  - {ch0}\n  - {ch1}")
    elif channels == 1:
        if args.force_mono:
            # Duplicate mono to both channels for testing
            print("Warning: Input is mono. Duplicating to both channels (--force-mono).")
            ch0_path = work_dir / f"{ep}_ch0.wav"
            ch1_path = work_dir / f"{ep}_ch1.wav"

            for out_path in [ch0_path, ch1_path]:
                cmd = [
                    "ffmpeg", "-y",
                    "-i", str(audio_path),
                    "-ar", "48000",
                    str(out_path),
                ]
                subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

            print(f"✓ Duplicated mono audio to:\n  - {ch0_path}\n  - {ch1_path}")
        else:
            die(
                f"Expected 2 channels (stereo), found {channels} (mono).\n"
                f"Use the mono pipeline (13_calibrate_speakers + 14_smooth_speakers) instead,\n"
                f"or use --force-mono to duplicate the mono file for testing."
            )
    else:
        die(
            f"Expected 2 channels (stereo), found {channels}.\n"
            f"This pipeline only supports stereo (2-channel) audio."
        )


if __name__ == "__main__":
    main()
