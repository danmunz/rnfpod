#!/usr/bin/env node
/**
 * Build-time script: reads content/episodes/*.md, parses frontmatter,
 * and outputs src/generated/episodes.json for the app to import.
 *
 * Run: node scripts/build-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('content/episodes');
const OUT_FILE = path.resolve('src/generated/episodes.json');

function run() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('[build-content] No content/episodes directory found – writing empty array.');
    fs.writeFileSync(OUT_FILE, '[]', 'utf-8');
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md')).sort();
  const episodes = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    if (data.published === false) continue;

    episodes.push({
      number: data.number,
      title: data.title,
      slug: data.slug,
      date: data.date,
      duration: data.duration,
      published: data.published ?? true,
      audioUrl: data.audioUrl ?? '',
      topics: data.topics ?? [],
      gradient: data.gradient ?? 'from-purple-600 to-fuchsia-600',
      annotation: data.annotation ?? null,
      segments: data.segments ?? [],
      resources: data.resources ?? [],
      description: content.trim(),
    });
  }

  // Sort by date descending (newest first)
  episodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(episodes, null, 2), 'utf-8');
  console.log(`[build-content] Wrote ${episodes.length} episodes to ${OUT_FILE}`);
}

run();
