# Walkthrough: audio file to published episode (macOS)

This guide walks you from a recorded WAV file to a published episode using the tools in this repo.
It assumes you are on macOS and running from the repo root (not a subfolder like `work/`).

## 0) One-time setup

### 0.0 Go to the repo root

```bash
cd /Users/danmunz/Library/Mobile Documents/com~apple~CloudDocs/randomneuralfirings
```

Success sign:
- `pwd` shows the repo root.

Failure sign:
- `ModuleNotFoundError: No module named 'tools'` means you ran from the wrong directory.

### 0.1 Create and activate a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Success sign:
- Your shell prompt shows `(.venv)`.

Failure sign:
- `python3: command not found` means Python is not installed or not on PATH.

### 0.2 Install Python dependencies

```bash
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```

Success sign:
- `Successfully installed ...` output.

Failure sign:
- `No module named ...` errors later mean this step did not complete.

### 0.3 Set your API keys and model config

Edit `config.env` and fill in keys:

```
DEEPGRAM_API_KEY=...your key...
LLM_API_KEY=...your key...
```

Then load it (and export variables for child processes):

```bash
set -a
source config.env
set +a
```

Success sign:
- `echo $DEEPGRAM_API_KEY` shows a value.

Failure sign:
- Empty output for `echo $DEEPGRAM_API_KEY` means the env file was not sourced.

### 0.4 Ensure ffmpeg is installed

```bash
ffmpeg -version
```

Success sign:
- You see version info.

Failure sign:
- `command not found` means install ffmpeg via Homebrew.

---

## Before each session

Every time you open a new terminal, activate the virtual environment and load your API keys:

```bash
cd /Users/danmunz/Library/Mobile\ Documents/com~apple~CloudDocs/randomneuralfirings
source .venv/bin/activate
set -a; source config.env; set +a
```

Success signs:
- Your shell prompt shows `(.venv)`
- `echo $DEEPGRAM_API_KEY` shows a value

Failure sign:
- `ModuleNotFoundError: No module named 'requests'` means the venv is not activated.

---

## 1) Episode naming convention and directory structure

Episode IDs must look like `ep001`, `ep002`, etc.

Directory structure for an episode:

```
episodes/ep001/
  raw/         # original audio
  work/        # intermediate files (transcripts, cutlist)
  publish/     # final audio + notes
  ep.json      # episode metadata
```

Audio naming convention:
- `episodes/<ep>/raw/<ep>.wav` (example: `episodes/ep001/raw/ep001.wav`)

## 2) Initialize a new episode

```bash
python3 -m tools.10_init_episode ep001
```

Success sign:
- `Initialized ep001 at episodes/ep001`
- `episodes/ep001/` exists with `raw/`, `work/`, `publish/`, and `ep.json`

Failure sign:
- `ERROR: Episode ep001 already exists` means the episode folder already exists.

## 3) Record and place your WAV

Place your recorded WAV file at:

```
episodes/ep001/raw/ep001.wav
```

Success sign:
- `ls episodes/ep001/raw/ep001.wav` shows the file.

Failure sign:
- `No such file or directory` means the file path or name is wrong.

## 4) Transcribe (Deepgram)

This step creates a transcript from the WAV. The script automatically detects whether
your audio is stereo (2 channels) or mono (1 channel) and uses the appropriate pipeline.

### Stereo pipeline (default for 2-channel audio)

If your audio is stereo (one speaker per channel):

```bash
bash tools/10_transcribe.sh ep001
```

The script will:
1. Apply VAD (Voice Activity Detection) filtering to eliminate audio bleed between channels
2. Transcribe each filtered channel separately via Deepgram (without diarization)
3. Normalize each channel transcript with a fixed speaker ID (0 or 1)
4. Merge the transcripts into a single timeline with overlap detection

**How VAD filtering works:**

The stereo pipeline uses energy-based VAD to handle audio bleed/crosstalk between channels.
For each 50ms window, it compares RMS energy between left and right channels and silences
the weaker one. This ensures each speaker's audio only appears in their designated channel.

Success signs:
- You see "VAD analysis: X windows (50ms each)" with channel dominance stats
- `episodes/ep001/work/ep001_ch0.wav` and `ep001_ch1.wav` exist (VAD-filtered mono files)
- `episodes/ep001/work/transcript.ch0.json` and `transcript.ch1.json` exist
- `episodes/ep001/work/transcript.json` exists (merged timeline)
- You see "Stereo transcription complete!"

**Tuning VAD parameters (optional):**

If you have unusual audio conditions, you can tune the VAD filter by running it manually:

```bash
python3 -m tools.11b_vad_filter --episode ep001 --window-ms 30 --ratio 1.2 --min-energy 300
```

- `--window-ms`: Analysis window size (default: 50). Smaller = more granular but noisier.
- `--ratio`: Energy ratio threshold for channel dominance (default: 1.5). Lower = more aggressive silencing.
- `--min-energy`: Minimum RMS to consider as speech (default: 500). Lower = detect quieter speech.

**Channel to speaker mapping:**
- By default, channel 0 = "Speaker 0" and channel 1 = "Speaker 1"
- To customize names, create `speakers.json` at the repo root or episode level:
  ```json
  {
    "0": "AJ",
    "1": "Dan"
  }
  ```

### Mono pipeline (for single-channel audio)

If your audio is mono (single channel with multiple speakers), use the `--mono` flag:

```bash
bash tools/10_transcribe.sh ep001 --mono
```

This will use Deepgram's speaker diarization to identify different speakers.

After transcription, you'll need to run speaker calibration and smoothing (Steps 5-6 below).

Failure signs:
- `Missing DEEPGRAM_API_KEY` means the key is not set.
- Non-200 errors from Deepgram mean your key or model is invalid.

---

## 5) Calibrate speaker mapping (mono pipeline only)

**Skip this step if using stereo pipeline.**

This step tries to map Deepgram's speaker IDs to real names using anchor phrases
like "I'm AJ" or "I'm Dan".

```bash
python3 -m tools.13_calibrate_speakers --episode ep001
```

Outputs:
- `episodes/ep001/work/speaker_map.json`
- `episodes/ep001/work/speaker_calibration.md`
- Updated `episodes/ep001/work/transcript.json` with corrected `speaker` fields.

Success sign:
- `speaker_map.json` exists and transcript segments show correct names.

Failure signs:
- `No anchor phrases found` means the script could not detect introductions.
  You can add a `speaker_aliases.json` file or rerun with `--force`.

Example `speaker_aliases.json` format (optional):

```
{
  "Dan": ["Dan", "Dad"],
  "AJ": ["AJ", "Ava"]
}
```

## 6) Smooth speaker labels (mono pipeline only)

**Skip this step if using stereo pipeline.**

This step fixes short, incorrect speaker flips (like "I'm Dan... dad.") by
applying anchor phrases and short-segment reassignment.

```bash
python3 -m tools.14_smooth_speakers --episode ep001
```

Success sign:
- `episodes/ep001/work/transcript.json` is updated, and small speaker flips are reduced.
Note:
- This improves diarization but does not guarantee perfection on single-channel audio.

Optional tuning flags:
- `--anchor-window 6.0` (seconds to keep the anchor speaker active)
- `--short-sec 1.0` (duration threshold for short-segment reassignment)
- `--short-words 3` (word threshold for short-segment reassignment)

## 7) Generate cutlist (silence-based)

```bash
python3 -m tools.20_make_cutlist --episode ep001
```

Outputs:
- `episodes/ep001/work/cutlist.json`
- `episodes/ep001/work/cutlist_review.md`

Success sign:
- Both files exist.

Failure sign:
- `Missing transcript.json` means transcription (Step 4) did not complete.

## 8) Review and approve cutlist (human gate)

Open the review file and inspect it:

```
open episodes/ep001/work/cutlist_review.md
```

If it looks good, approve:

```bash
python3 -m tools.30_review_cutlist --episode ep001 --approve
```

Success sign:
- `episodes/ep001/work/cutlist.approved` exists.

Failure sign:
- `Missing cutlist_review.md` means Step 7 did not run.

## 9) Build keep plan and time map

```bash
python3 -m tools.40_apply_cutlist --episode ep001
```

Outputs:
- `episodes/ep001/publish/keep.txt`
- `episodes/ep001/publish/time_map.json`

Success sign:
- Both files exist.

Failure signs:
- `Cutlist not approved` means Step 8 is not done.
- `Missing input WAV` means Step 3 is not done.

## 10) Render cut audio and MP3

```bash
ffmpeg -f concat -safe 0 -i episodes/ep001/publish/keep.txt -ar 48000 -ac 2 episodes/ep001/publish/ep001_cut.wav
ffmpeg -i episodes/ep001/publish/ep001_cut.wav -codec:a libmp3lame -qscale:a 2 episodes/ep001/publish/ep001.mp3
```

Success sign:
- `episodes/ep001/publish/ep001.mp3` exists.

Failure sign:
- ffmpeg errors mean `keep.txt` is missing or malformed.

## 11) Remap transcript timestamps to the cut audio

```bash
python3 -m tools.45_remap_transcript --episode ep001
```

Output:
- `episodes/ep001/publish/transcript_published.json`

Success sign:
- Output file exists.

Failure sign:
- `Missing time_map.json` means Step 9 is not done.

## 12) Generate title, summary, segments, mentions (LLM)

```bash
python3 -m tools.50_notes_and_segments --episode ep001
```

Outputs:
- `episodes/ep001/publish/transcript_llm.txt`
- `episodes/ep001/publish/episode_package.json`

Success sign:
- Both files exist.

Failure signs:
- `Missing LLM_API_KEY` means your LLM key is not set.
- JSON parse errors mean the LLM did not return valid JSON.

## 13) Resolve Wikipedia links

```bash
python3 -m tools.60_link_resolve --episode ep001
```

Output:
- `episodes/ep001/publish/links.json`

Success sign:
- Output file exists (it may be empty if no links found).

Failure sign:
- Network errors mean you are offline or blocked.

## 14) Generate show notes Markdown

```bash
python3 -m tools.55_make_show_notes --episode ep001
```

Output:
- `episodes/ep001/publish/ep001.md`

Success sign:
- Output file exists.

Failure sign:
- `Missing episode_package.json` means Step 12 did not run.

## 15) Generate cover art (manual background + template)

1) Create a background image and save it here:

```
episodes/ep001/work/cover_bg.png
```

2) Composite it into the template:

```bash
python3 -m tools.70_make_cover --episode ep001
```

Output:
- `episodes/ep001/publish/ep001.png`

Success sign:
- Output file exists.

Failure sign:
- `Missing cover_bg.png` means you did not provide the background image.

## 16) Publish to the site folder

```bash
python3 -m tools.80_publish_to_site --episode ep001
```

Copies:
- `episodes/ep001/publish/ep001.mp3` -> `site/src/assets/audio/ep001.mp3`
- `episodes/ep001/publish/ep001.png` -> `site/src/assets/covers/ep001.png`
- `episodes/ep001/publish/ep001.md` -> `site/src/episodes/ep001.md`

Success sign:
- Files exist in the `site/src/` folders.

Failure sign:
- Missing input files means earlier steps failed.

## 17) One-command run

After you have keys set in `config.env`, you can run:

```bash
make episode EP=ep001
```

This will:
1. Initialize the episode directory
2. Wait for you to place the WAV file
3. Transcribe (auto-detects stereo vs mono)
4. Generate the cutlist
5. Stop for you to review

Approve the cutlist, then re-run the same command to continue through audio rendering, LLM notes generation, and publishing.

**Note:** For stereo recordings (2-channel audio), steps 5-6 (speaker calibration/smoothing) are automatically skipped since each channel is a known speaker.

## Troubleshooting checklist

- Missing API keys: run `source config.env` and re-check `echo $DEEPGRAM_API_KEY`.
- Python import errors: re-run `python3 -m pip install -r requirements.txt` in the venv.
- `No module named 'tools'`: you are not in the repo root. Run `cd .../randomneuralfirings`.
- Audio not found: confirm `episodes/<ep>/raw/<ep>.wav` exists.
- LLM JSON errors: re-run the notes step and inspect the raw output in `transcript_llm.txt`.
- Transcript has duplicate segments (both speakers saying same thing): audio bleed is too strong.
  Try lowering the VAD ratio: `python3 -m tools.11b_vad_filter --episode ep001 --ratio 1.2`
- VAD silencing too much audio: try raising the ratio or lowering min-energy:
  `python3 -m tools.11b_vad_filter --episode ep001 --ratio 2.0 --min-energy 300`
