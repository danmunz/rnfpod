"""Audio file serving and waveform data."""

from __future__ import annotations

import json
import re
import struct
import wave
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, JSONResponse

router = APIRouter(tags=["audio"])

EPISODES_DIR = Path("episodes")


def _validate_ep(ep: str) -> Path:
    if not re.match(r"^ep\d{3}$", ep):
        raise HTTPException(400, "Invalid episode id")
    base = EPISODES_DIR / ep
    if not base.exists():
        raise HTTPException(404, f"Episode {ep} not found")
    return base


@router.get("/episodes/{ep}/audio/raw")
def serve_raw_audio(ep: str) -> FileResponse:
    base = _validate_ep(ep)
    wav = base / "raw" / f"{ep}.wav"
    if not wav.exists():
        raise HTTPException(404, "Raw audio not found")
    return FileResponse(wav, media_type="audio/wav")


@router.get("/episodes/{ep}/audio/published")
def serve_published_audio(ep: str) -> FileResponse:
    base = _validate_ep(ep)
    mp3 = base / "publish" / f"{ep}.mp3"
    if not mp3.exists():
        raise HTTPException(404, "Published audio not found")
    return FileResponse(mp3, media_type="audio/mpeg")


@router.get("/episodes/{ep}/audio/cut")
def serve_cut_audio(ep: str) -> FileResponse:
    base = _validate_ep(ep)
    wav = base / "publish" / f"{ep}_cut.wav"
    if not wav.exists():
        raise HTTPException(404, "Cut audio not found")
    return FileResponse(wav, media_type="audio/wav")


@router.get("/episodes/{ep}/waveform")
def get_waveform(ep: str, samples: int = 2000) -> JSONResponse:
    """Generate waveform peak data from the raw WAV file.

    Returns an array of normalized peak values (0.0 to 1.0).
    """
    base = _validate_ep(ep)
    wav_path = base / "raw" / f"{ep}.wav"
    if not wav_path.exists():
        raise HTTPException(404, "Raw audio not found")

    cache_path = base / "work" / f"waveform_{samples}.json"
    if cache_path.exists():
        return JSONResponse(json.loads(cache_path.read_text()))

    peaks = _compute_peaks(wav_path, samples)
    # Cache the result
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(peaks))
    return JSONResponse(peaks)


def _compute_peaks(wav_path: Path, num_samples: int) -> list[float]:
    """Read WAV and compute peak amplitudes for visualization."""
    with wave.open(str(wav_path), "rb") as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        n_frames = wf.getnframes()

        if n_frames == 0:
            return [0.0] * num_samples

        frames_per_sample = max(1, n_frames // num_samples)
        peaks: list[float] = []
        max_val = (2 ** (sampwidth * 8 - 1)) - 1

        fmt = {1: "b", 2: "<h", 4: "<i"}.get(sampwidth, "<h")
        frame_size = sampwidth * n_channels

        for _ in range(num_samples):
            raw = wf.readframes(frames_per_sample)
            if not raw:
                peaks.append(0.0)
                continue
            # Process frames, take absolute max across all channels
            peak = 0
            for i in range(0, len(raw), frame_size):
                for ch in range(n_channels):
                    offset = i + ch * sampwidth
                    if offset + sampwidth <= len(raw):
                        val = struct.unpack_from(fmt, raw, offset)[0]
                        peak = max(peak, abs(val))
            peaks.append(min(peak / max_val, 1.0))

    return peaks
