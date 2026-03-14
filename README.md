# Random Neural Firings

A podcast by **Dan (dad, 41)** and **AJ (daughter, 11)** — making unexpected connections between completely unrelated topics.

**Live site**: [danmunz.github.io/rnfpod](https://danmunz.github.io/rnfpod/)

> Original design: [Figma](https://www.figma.com/design/x6IBxuFnoyvgT6w42CxW2p/Random-Neural-Firings-podcast)

---

## Overview

This repo contains everything for the podcast:

1. **Public website** — React app deployed to GitHub Pages
2. **Production tools** — Python scripts that take a raw WAV recording through transcription, editing, show-notes generation, and publishing
3. **RNF Studio** — local web UI (FastAPI + React) that wraps the production tools into a visual workflow

## Tech Stack

### Website
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS 4** with shadcn/ui components
- **react-router-dom** — hash-based routing for GitHub Pages
- **Markdown CMS** — episodes authored as `.md` files with YAML frontmatter
- **HTML5 Audio** — persistent player with OP3 analytics prefix
- **RSS 2.0** — auto-generated podcast feed with iTunes extensions

### Production Tools
- **Python 3** scripts in `tools/` — transcription (Deepgram), silence-based cut detection, LLM show-notes generation, Wikipedia link resolution, cover art compositing
- **ffmpeg** — audio rendering (WAV concat, MP3 encoding)
- **Cloudflare R2** — MP3 and cover art hosting (free egress)

### RNF Studio
- **FastAPI** backend — wraps the Python tools as API endpoints with SSE streaming
- **React + Vite** client — dashboard, 13-step episode workflow, waveform-based cut review (WaveSurfer.js)

## Quick Start

### Website only

```bash
npm install
npm run dev
```

Runs `build-content` (parses episode markdown → JSON) then starts the Vite dev server.

### Studio (full production workflow)

```bash
# One-time setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd studio/client && npm install && cd ../..

# Copy config.env.example → config.env and fill in API keys
cp config.env.example config.env

# Start Studio (FastAPI on :8000 + Vite on :5174)
make studio
```

Open [localhost:5174](http://localhost:5174) to access the Studio UI.

## Project Structure

```
content/
  episodes/            # Episode markdown files (the CMS)
    001-sims-spinning-chairs.md
    002-harsh-winds-beautiful-waterfalls.md
scripts/
  build-content.mjs    # Markdown → src/generated/episodes.json
  build-rss.mjs        # Episodes → dist/feed.xml
src/
  app/
    pages/             # Route-level page components (Home, Browse, Episode)
    components/        # Shared UI (Header, Footer, MiniPlayer, EpisodeCard)
    contexts/          # PlayerContext (global audio state)
    hooks/             # useEpisodes, useEpisode, useFilteredEpisodes
    layouts/           # SiteLayout (header + footer + player wrapper)
    lib/               # podcast-config.ts
    types/             # TypeScript interfaces
  generated/           # Auto-generated episode JSON (gitignored)
  styles/              # Tailwind, fonts, theme
tools/                 # Python production scripts (see walkthrough.md)
  10_init_episode.py
  10_transcribe.sh     # Deepgram transcription (stereo + mono pipelines)
  20_make_cutlist.py   # Silence-based cut detection
  30_review_cutlist.py # Human review gate
  40_apply_cutlist.py  # Build keep plan + time map
  45_remap_transcript.py
  50_notes_and_segments.py  # LLM-generated title, summary, segments
  55_make_show_notes.py
  60_link_resolve.py   # Wikipedia link resolution
  70_make_cover.py     # Cover art compositing
  80_publish_to_site.py
episodes/              # Episode working directories
  ep001/
    raw/               # Original WAV recordings (gitignored)
    work/              # Intermediate files (transcripts, cutlist)
    publish/           # Final artifacts (show notes, cover, links)
    ep.json            # Episode metadata
studio/
  server/              # FastAPI backend
    main.py            # App entry, CORS, routers
    api/               # Endpoints: episodes, pipeline, audio, cuts, preview
    services/          # R2 upload, pipeline status
  client/              # React + Vite UI
    src/
      pages/           # Dashboard, EpisodeWorkflow, CutReview
      components/      # WaveformViewer, Layout
      hooks/           # useEpisodes, usePipelineStep
      lib/             # API client with SSE streaming
docs/                  # Design system docs (colors, typography, layout)
```

## Routes

| Route | Page |
|-------|------|
| `#/` | Homepage — hero, latest episode, about section |
| `#/episodes` | Browse all episodes — search, filter by topic |
| `#/episodes/:slug` | Episode detail — show notes, segments, resources, player |

## Episode Production Pipeline

The full pipeline from raw recording to published episode:

```
WAV recording
  → Transcribe (Deepgram, stereo or mono)
  → Generate cutlist (silence-based)
  → Human review & approve cuts
  → Apply cuts + render MP3
  → Remap transcript to cut audio
  → LLM generates title, summary, segments
  → Resolve Wikipedia links
  → Generate show notes markdown
  → Generate cover art
  → Upload MP3 to R2
  → Publish episode markdown to site
```

Run the pipeline via Studio UI (`make studio`) or from the command line:

```bash
make episode EP=ep003
```

See [walkthrough.md](walkthrough.md) for detailed step-by-step instructions.

## Adding an Episode

### Option A: Studio UI

1. Start Studio: `make studio`
2. Click "New Episode" in the dashboard
3. Upload a WAV recording
4. Step through the pipeline — transcription, cuts, review, notes, publish
5. Commit and push once published

### Option B: Command line

```bash
make episode EP=ep003
```

This runs the full pipeline interactively, pausing for you to review cuts.

### Option C: Manual markdown

Create `content/episodes/003-your-episode-slug.md`:

```yaml
---
number: 3
title: "Your Episode Title"
slug: "your-episode-slug"
date: "2026-03-14"
duration: "12:30"
published: true
audioUrl: "audio/ep003.mp3"
topics:
  - topic1
  - topic2
gradient: "from-purple-600 to-fuchsia-600"
annotation: "A fun note for the card"
segments:
  - title: "Intro"
    timestamp: 0
    description: "What we're talking about today"
  - title: "Main Topic"
    timestamp: 180
    description: "The deep dive"
    accent: "cyan"
resources:
  - title: "Interesting Link"
    url: "https://example.com"
---

Show notes in markdown. Supports **bold**, *italic*, [links](https://example.com), lists, etc.
```

Commit and push — GitHub Actions rebuilds and deploys automatically.

## Audio Hosting (Cloudflare R2)

MP3 files are hosted on **Cloudflare R2** (free egress, ~$0.015/GB storage).

### Setup

1. Create an R2 bucket and enable public access (Settings → Public access → Allow)
2. Create an API token with R2 read/write permissions
3. Copy `config.env.example` → `config.env` and fill in the R2 fields:
   ```
   R2_ACCOUNT_ID=your-account-id
   R2_ACCESS_KEY_ID=your-access-key
   R2_SECRET_ACCESS_KEY=your-secret-key
   R2_BUCKET_NAME=your-bucket-name
   R2_PUBLIC_URL=https://pub-XXXX.r2.dev
   ```
4. Update `mediaBaseUrl` in `src/app/lib/podcast-config.ts` to match `R2_PUBLIC_URL`

The Studio publish step and `tools/80_publish_to_site.py` handle uploading to R2 automatically.

All audio URLs are prefixed with `https://op3.dev/e/` for open podcast download analytics.

## API Keys

Create `config.env` from the example (never commit this file):

| Variable | Service | Purpose |
|----------|---------|---------|
| `DEEPGRAM_API_KEY` | [Deepgram](https://deepgram.com) | Speech-to-text transcription |
| `LLM_API_KEY` | OpenAI / compatible | Show notes, title, segment generation |
| `R2_*` | [Cloudflare R2](https://developers.cloudflare.com/r2/) | Audio + cover art hosting |

## Analytics

### Podcast Downloads — OP3

[OP3](https://op3.dev/) tracks downloads via URL prefix — no code needed. Register at op3.dev to view your dashboard.

### Web Analytics — Umami

Uncomment the Umami script tag in `index.html` and set your site ID:

```html
<script defer src="https://your-umami.com/script.js" data-website-id="YOUR_ID"></script>
```

## Build & Deploy

### Local build

```bash
npm run build    # content → vite build → RSS feed
npm run preview  # preview the production build
```

### GitHub Pages (automatic)

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. Parse episode markdown → JSON
2. Vite production build
3. Generate RSS feed (`dist/feed.xml`)
4. Deploy to GitHub Pages

**Setup**: Repo Settings → Pages → Source: **GitHub Actions**.

## RSS Feed

Auto-generated at build time from episode markdown:

- **URL**: `https://danmunz.github.io/rnfpod/feed.xml`
- **Format**: RSS 2.0 with iTunes podcast extensions
- **Validation**: Test at [podba.se/validate](https://podba.se/validate/)

## Scripts & Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build content + start dev server |
| `npm run build` | Full production build (content + vite + RSS) |
| `npm run build:content` | Parse episode markdown → JSON only |
| `npm run build:rss` | Generate RSS feed only |
| `npm run preview` | Preview production build locally |
| `make studio` | Start RNF Studio (FastAPI + React) |
| `make episode EP=ep003` | Run full episode pipeline from CLI |
| `make env` | Print shell command to load config.env |
