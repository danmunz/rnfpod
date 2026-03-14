# Random Neural Firings

A podcast by **Dan (dad, 41)** and **AJ (daughter, 11)** — making unexpected connections between completely unrelated topics.

> Original design: [Figma](https://www.figma.com/design/x6IBxuFnoyvgT6w42CxW2p/Random-Neural-Firings-podcast)

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS 4** with shadcn/ui components
- **react-router-dom** — hash-based routing for GitHub Pages
- **Markdown CMS** — episodes authored as `.md` files with YAML frontmatter
- **Decap CMS** — browser-based editor at `/admin/`
- **HTML5 Audio** — persistent player with OP3 analytics prefix
- **RSS 2.0** — auto-generated podcast feed with iTunes extensions

## Quick Start

```bash
npm install
npm run dev
```

This runs `build-content` (parses episode markdown → JSON) then starts the Vite dev server.

## Project Structure

```
content/
  episodes/          # Episode markdown files (the CMS)
    001-sims-spinning-chairs.md
    047-mario-kart-to-mythology.md
    ...
scripts/
  build-content.mjs  # Markdown → src/generated/episodes.json
  build-rss.mjs      # Episodes → dist/feed.xml
public/
  admin/              # Decap CMS (browser-based editor)
src/
  app/
    pages/            # Route-level page components
    components/       # Shared UI components (Header, Footer, MiniPlayer, EpisodeCard)
    contexts/         # PlayerContext (global audio state)
    hooks/            # useEpisodes, useEpisode, useFilteredEpisodes
    layouts/          # SiteLayout (header + footer + player wrapper)
    lib/              # Podcast config
    types/            # TypeScript interfaces
  generated/          # Auto-generated episode JSON (gitignored)
  styles/             # Tailwind, fonts, theme
docs/                 # Design system docs (colors, typography, layout, components)
```

## Routes

| Route | Page |
|-------|------|
| `#/` | Homepage — hero, latest episode, recent grid, about |
| `#/episodes` | Browse all episodes — search, filter by topic, sort |
| `#/episodes/:slug` | Episode detail — show notes, segments, resources |
| `#/styleguide` | Design system reference |
| `#/brand` | Brand guide & component library |

## Adding an Episode

### Option A: Markdown file

Create `content/episodes/048-your-episode-slug.md`:

```yaml
---
number: 48
title: "Your Episode Title"
slug: "your-episode-slug"
date: "2026-01-21"
duration: "45:00"
published: true
audioUrl: "episodes/ep048.mp3"
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

Your show notes in markdown here. Supports **bold**, *italic*, [links](https://example.com), lists, etc.
```

Commit and push — GitHub Actions will rebuild and deploy automatically.

### Option B: Decap CMS

Navigate to `/admin/` in your browser, authenticate with GitHub, and use the visual editor to create/edit episodes.

## Audio & MP3 Hosting

MP3 files are hosted on **Cloudflare R2** (free egress, ~$0.015/GB storage).

1. Create an R2 bucket and enable public access
2. Upload MP3s to an `episodes/` prefix (e.g., `episodes/ep001.mp3`)
3. Set your bucket URL in `src/app/lib/podcast-config.ts`:
   ```ts
   mediaBaseUrl: 'https://media.randomneuralfirings.com'
   ```

All audio URLs are automatically prefixed with `https://op3.dev/e/` for open podcast download analytics.

## Analytics

### Podcast Downloads — OP3

[OP3](https://op3.dev/) tracks downloads via URL prefix — no code needed. Register at op3.dev to view your dashboard.

### Web Analytics — Umami

Uncomment the Umami script tag in `index.html` and set your site ID:

```html
<script defer src="https://your-umami.com/script.js" data-website-id="YOUR_ID"></script>
```

Self-host Umami for free on Railway, Vercel, or similar.

## Build & Deploy

### Local build

```bash
npm run build    # content → vite build → RSS feed
npm run preview  # preview the production build
```

### GitHub Pages (automatic)

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Parse episode markdown → JSON
2. Vite production build
3. Generate RSS feed (`dist/feed.xml`)
4. Deploy to GitHub Pages

**Setup**: Go to repo Settings → Pages → Source: **GitHub Actions**.

## Decap CMS Setup

1. Register a [GitHub OAuth App](https://github.com/settings/developers)
   - Homepage URL: your GitHub Pages URL
   - Callback URL: `https://api.netlify.com/auth/done` (if using Netlify Identity) or your own OAuth provider
2. Configure authentication per [Decap docs](https://decapcms.org/docs/authentication-backends/)
3. Access the CMS at `https://your-site/#/admin/`

## RSS Feed

The podcast RSS feed is auto-generated at build time from episode markdown:

- **Location**: `dist/feed.xml` (also `https://your-site/feed.xml`)
- **Format**: RSS 2.0 with iTunes podcast extensions
- **Validation**: Test at [podba.se/validate](https://podba.se/validate/)
- Submit to Apple Podcasts, Spotify, etc. using your feed URL

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Build content + start dev server |
| `npm run build` | Full production build (content + vite + RSS) |
| `npm run build:content` | Parse episode markdown → JSON only |
| `npm run build:rss` | Generate RSS feed only |
| `npm run preview` | Preview production build locally |
