#!/usr/bin/env bash
set -euo pipefail

EP="${1:?Usage: tools/10_transcribe.sh ep001 [--mono]}"
MODE="${2:-}"

# Load API keys from config
if [[ -z "${DEEPGRAM_API_KEY:-}" ]]; then
  if [[ -f "config.env" ]]; then
    set -a
    # shellcheck disable=SC1091
    source config.env
    set +a
  fi
  if [[ -z "${DEEPGRAM_API_KEY:-}" && -f ".env" ]]; then
    set -a
    # shellcheck disable=SC1091
    source .env
    set +a
  fi
fi

WORK_DIR="episodes/$EP/work"
RAW_DIR="episodes/$EP/raw"

# Check if the input audio is stereo or mono
CHANNELS=$(ffprobe -v error -select_streams a:0 -show_entries stream=channels -of default=noprint_wrappers=1:nokey=1 "$RAW_DIR/$EP.wav" 2>/dev/null || echo "0")

if [[ "$MODE" == "--mono" ]] || [[ "$CHANNELS" -ne 2 ]]; then
  # Mono pipeline: use diarization
  echo "==> Using MONO pipeline (with speaker diarization)"
  python3 -m tools.10_transcribe_deepgram --episode "$EP" --diarize
  python3 -m tools.12_normalize_transcript --episode "$EP"
  echo ""
  echo "Next steps for mono pipeline:"
  echo "  python3 -m tools.13_calibrate_speakers --episode $EP"
  echo "  python3 -m tools.14_smooth_speakers --episode $EP"
else
  # Stereo pipeline: split channels, transcribe separately, merge
  echo "==> Using STEREO pipeline (channel-based speaker separation)"

  # Step 1: Apply VAD filtering to separate speakers
  # This reads the raw stereo file and outputs filtered mono channels
  # where crosstalk/bleed is silenced based on energy comparison
  python3 -m tools.11b_vad_filter --episode "$EP"

  # Step 2: Transcribe each channel separately (without diarization)
  echo ""
  echo "Transcribing channel 0..."
  python3 -m tools.10_transcribe_deepgram \
    --audio "$WORK_DIR/${EP}_ch0.wav" \
    --out "$WORK_DIR/transcript.ch0.dg.json"

  echo ""
  echo "Transcribing channel 1..."
  python3 -m tools.10_transcribe_deepgram \
    --audio "$WORK_DIR/${EP}_ch1.wav" \
    --out "$WORK_DIR/transcript.ch1.dg.json"

  # Step 3: Normalize each channel transcript with fixed speaker ID
  echo ""
  echo "Normalizing channel transcripts..."
  python3 -m tools.12_normalize_transcript \
    --input "$WORK_DIR/transcript.ch0.dg.json" \
    --out "$WORK_DIR/transcript.ch0.json" \
    --speaker-id 0 \
    --episode "$EP"

  python3 -m tools.12_normalize_transcript \
    --input "$WORK_DIR/transcript.ch1.dg.json" \
    --out "$WORK_DIR/transcript.ch1.json" \
    --speaker-id 1 \
    --episode "$EP"

  # Step 4: Merge channel transcripts into single timeline
  echo ""
  python3 -m tools.12_merge_transcripts --episode "$EP"

  echo ""
  echo "✓ Stereo transcription complete!"
fi
