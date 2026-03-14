#!/usr/bin/env python3
"""
VAD-based channel filtering for stereo podcast audio.

For each time window, compares signal energy between channels and silences
the weaker channel to eliminate audio bleed/crosstalk.
"""
import argparse
import wave
import struct
import math
from pathlib import Path

from tools._common import die, ep_work_dir


def read_stereo_wav(path: Path) -> tuple[list[int], list[int], int, int]:
    """Read a stereo WAV file and return left/right channels as sample lists."""
    with wave.open(str(path), "rb") as wav:
        n_channels = wav.getnchannels()
        sample_width = wav.getsampwidth()
        frame_rate = wav.getframerate()
        n_frames = wav.getnframes()

        if n_channels != 2:
            die(f"Expected stereo (2 channels), got {n_channels}")
        if sample_width != 2:
            die(f"Expected 16-bit audio, got {sample_width * 8}-bit")

        raw = wav.readframes(n_frames)

    # Unpack interleaved stereo samples (L, R, L, R, ...)
    samples = struct.unpack(f"<{n_frames * 2}h", raw)
    left = list(samples[0::2])
    right = list(samples[1::2])

    return left, right, frame_rate, sample_width


def write_mono_wav(path: Path, samples: list[int], frame_rate: int) -> None:
    """Write a mono WAV file from a list of 16-bit samples."""
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)  # 16-bit
        wav.setframerate(frame_rate)
        wav.writeframes(struct.pack(f"<{len(samples)}h", *samples))


def compute_rms(samples: list[int]) -> float:
    """Compute RMS (root mean square) energy of samples."""
    if not samples:
        return 0.0
    sum_sq = sum(s * s for s in samples)
    return math.sqrt(sum_sq / len(samples))


def vad_filter_channels(
    left: list[int],
    right: list[int],
    frame_rate: int,
    window_ms: int = 50,
    ratio_threshold: float = 1.5,
    min_energy: float = 500.0,
) -> tuple[list[int], list[int]]:
    """
    Filter channels based on energy comparison.

    For each window:
    - If one channel has significantly more energy (ratio > threshold),
      silence the other channel
    - If both are similar or below min_energy, keep both (likely silence or crosstalk)

    Args:
        left: Left channel samples
        right: Right channel samples
        frame_rate: Sample rate in Hz
        window_ms: Analysis window size in milliseconds
        ratio_threshold: How much louder one channel must be to "win"
        min_energy: Minimum RMS to consider as speech (vs silence)

    Returns:
        Filtered (left, right) sample lists
    """
    window_samples = int(frame_rate * window_ms / 1000)
    n_samples = len(left)

    filtered_left = []
    filtered_right = []

    # Stats for logging
    left_wins = 0
    right_wins = 0
    ties = 0
    silence = 0

    for i in range(0, n_samples, window_samples):
        end = min(i + window_samples, n_samples)
        left_window = left[i:end]
        right_window = right[i:end]

        left_rms = compute_rms(left_window)
        right_rms = compute_rms(right_window)

        # Determine which channel is dominant
        if left_rms < min_energy and right_rms < min_energy:
            # Both channels are quiet - keep as-is (silence)
            filtered_left.extend(left_window)
            filtered_right.extend(right_window)
            silence += 1
        elif left_rms > right_rms * ratio_threshold:
            # Left channel is dominant - silence right
            filtered_left.extend(left_window)
            filtered_right.extend([0] * len(right_window))
            left_wins += 1
        elif right_rms > left_rms * ratio_threshold:
            # Right channel is dominant - silence left
            filtered_left.extend([0] * len(left_window))
            filtered_right.extend(right_window)
            right_wins += 1
        else:
            # Too close to call - keep the louder one, silence the other
            # This handles crosstalk where both pick up the same voice
            if left_rms >= right_rms:
                filtered_left.extend(left_window)
                filtered_right.extend([0] * len(right_window))
                left_wins += 1
            else:
                filtered_left.extend([0] * len(left_window))
                filtered_right.extend(right_window)
                right_wins += 1
            ties += 1

    total_windows = left_wins + right_wins + silence
    print(f"  VAD analysis: {total_windows} windows ({window_ms}ms each)")
    print(f"  Left channel dominant: {left_wins} ({100*left_wins/total_windows:.1f}%)")
    print(f"  Right channel dominant: {right_wins} ({100*right_wins/total_windows:.1f}%)")
    print(f"  Silence/quiet: {silence} ({100*silence/total_windows:.1f}%)")
    print(f"  Close calls (ties): {ties}")

    return filtered_left, filtered_right


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Apply VAD-based filtering to separate speakers in stereo audio"
    )
    parser.add_argument("--episode", required=True, help="Episode ID (e.g., ep001)")
    parser.add_argument(
        "--window-ms",
        type=int,
        default=50,
        help="Analysis window size in milliseconds (default: 50)",
    )
    parser.add_argument(
        "--ratio",
        type=float,
        default=1.5,
        help="Energy ratio threshold for channel dominance (default: 1.5)",
    )
    parser.add_argument(
        "--min-energy",
        type=float,
        default=500.0,
        help="Minimum RMS energy to consider as speech (default: 500)",
    )
    args = parser.parse_args()

    ep = args.episode
    work_dir = ep_work_dir(ep)

    # Input: the split channel files from 11_split_stereo.py
    ch0_in = work_dir / f"{ep}_ch0.wav"
    ch1_in = work_dir / f"{ep}_ch1.wav"

    # We need to read the original stereo file instead
    # since the split files might already have bleed baked in
    raw_stereo = Path("episodes") / ep / "raw" / f"{ep}.wav"

    if not raw_stereo.exists():
        die(f"Missing stereo input: {raw_stereo}")

    print(f"Reading stereo audio from {raw_stereo}...")
    left, right, frame_rate, _ = read_stereo_wav(raw_stereo)
    print(f"  {len(left)} samples at {frame_rate}Hz ({len(left)/frame_rate:.1f}s)")

    print(f"Applying VAD filtering (window={args.window_ms}ms, ratio={args.ratio})...")
    filtered_left, filtered_right = vad_filter_channels(
        left,
        right,
        frame_rate,
        window_ms=args.window_ms,
        ratio_threshold=args.ratio,
        min_energy=args.min_energy,
    )

    # Output filtered mono files
    ch0_out = work_dir / f"{ep}_ch0.wav"
    ch1_out = work_dir / f"{ep}_ch1.wav"

    print(f"Writing filtered channels...")
    write_mono_wav(ch0_out, filtered_left, frame_rate)
    write_mono_wav(ch1_out, filtered_right, frame_rate)

    print(f"✓ VAD-filtered audio written to:")
    print(f"  - {ch0_out}")
    print(f"  - {ch1_out}")


if __name__ == "__main__":
    main()
