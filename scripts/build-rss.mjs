#!/usr/bin/env node
/**
 * Build-time script: generates a podcast RSS 2.0 feed with iTunes extensions
 * from the episode manifest (src/generated/episodes.json).
 *
 * Run: node scripts/build-rss.mjs
 * Output: dist/feed.xml
 */
import fs from 'node:fs';
import path from 'node:path';

const EPISODES_FILE = path.resolve('src/generated/episodes.json');
const OUT_DIR = path.resolve('dist');
const OUT_FILE = path.join(OUT_DIR, 'feed.xml');

// Podcast config — keep in sync with src/app/lib/podcast-config.ts
const config = {
  title: 'Random Neural Firings',
  subtitle: 'A dad and daughter making unexpected connections',
  description:
    'Dan (dad, 41) and AJ (daughter, 11) make unexpected connections between completely unrelated topics. Neural pathways firing at random.',
  author: 'Dan & AJ',
  email: '',
  language: 'en-us',
  categories: ['Kids & Family', 'Education', 'Science'],
  imageUrl: '',
  siteUrl: 'https://danmunz.github.io/rnfpod',
  mediaBaseUrl: '', // Set to R2 public URL when ready
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Convert "MM:SS" or "H:MM:SS" to seconds */
function durationToSeconds(dur) {
  const parts = dur.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

/** Convert seconds to HH:MM:SS for itunes:duration */
function secondsToHMS(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function buildAudioUrl(audioUrl) {
  if (!config.mediaBaseUrl || !audioUrl) return '';
  const fullUrl = `${config.mediaBaseUrl}/${audioUrl}`;
  // Prefix with OP3 for download analytics
  return `https://op3.dev/e/${fullUrl}`;
}

function run() {
  if (!fs.existsSync(EPISODES_FILE)) {
    console.warn('[build-rss] No episodes.json found. Run build-content first.');
    return;
  }

  const episodes = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf-8'));
  const pubDate = new Date().toUTCString();

  const items = episodes
    .filter(ep => ep.published !== false)
    .map(ep => {
      const secs = durationToSeconds(ep.duration);
      const audioUrl = buildAudioUrl(ep.audioUrl);
      const epDate = new Date(ep.date).toUTCString();
      const episodeUrl = `${config.siteUrl}/#/episodes/${ep.slug}`;

      return `    <item>
      <title>${escapeXml(ep.title)}</title>
      <description><![CDATA[${ep.description}]]></description>
      <link>${escapeXml(episodeUrl)}</link>
      <guid isPermaLink="false">rnfpod-ep-${ep.number}</guid>
      <pubDate>${epDate}</pubDate>
      ${audioUrl ? `<enclosure url="${escapeXml(audioUrl)}" type="audio/mpeg" length="0" />` : ''}
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:episode>${ep.number}</itunes:episode>
      <itunes:duration>${secondsToHMS(secs)}</itunes:duration>
      <itunes:summary><![CDATA[${ep.description}]]></itunes:summary>
      ${ep.topics.map(t => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const categoryXml = config.categories
    .map(c => `    <itunes:category text="${escapeXml(c)}" />`)
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.apple.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <description><![CDATA[${config.description}]]></description>
    <link>${escapeXml(config.siteUrl)}</link>
    <language>${config.language}</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${escapeXml(config.siteUrl + '/feed.xml')}" rel="self" type="application/rss+xml" />
    <itunes:subtitle>${escapeXml(config.subtitle)}</itunes:subtitle>
    <itunes:author>${escapeXml(config.author)}</itunes:author>
    <itunes:summary><![CDATA[${config.description}]]></itunes:summary>
    ${config.imageUrl ? `<itunes:image href="${escapeXml(config.imageUrl)}" />` : ''}
    <itunes:explicit>false</itunes:explicit>
${categoryXml}
${items}
  </channel>
</rss>`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, feed, 'utf-8');
  console.log(`[build-rss] Wrote feed with ${episodes.length} episodes to ${OUT_FILE}`);
}

run();
