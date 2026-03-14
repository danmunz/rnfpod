const BASE = '/api';

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

export interface EpisodeMeta {
  episode_id: string;
  recorded_date: string;
  title: string;
  people: Array<{ id: string; name: string }>;
  brand: Record<string, string>;
}

export interface EpisodePackage {
  episode_title: string;
  summary: string;
  segments: Array<{
    title: string;
    start: number;
    end: number;
    one_sentence: string;
  }>;
  highlights: string[];
  mentions: Array<{
    label: string;
    type: string;
    context: string;
  }>;
}

export interface EpisodeSummary {
  episode_id: string;
  meta: EpisodeMeta | null;
  package?: EpisodePackage | null;
  steps: Record<string, string>;
  progress: string;
}

export interface CutItem {
  start: number;
  end: number;
  duration: number;
  reason: string;
  before_text: string;
  after_text: string;
  approved: boolean;
}

export interface CutsResponse {
  cuts: CutItem[];
  total_cut_duration: number;
  approved: boolean;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  speaker_id?: string;
  speaker?: string;
  text: string;
}

export interface SSEMessage {
  type: 'start' | 'log' | 'done';
  text?: string;
  status?: string;
  code?: number;
  cmd?: string;
}

// Episodes
export const listEpisodes = () => fetchJSON<EpisodeSummary[]>('/episodes');
export const getEpisode = (ep: string) => fetchJSON<EpisodeSummary>(`/episodes/${ep}`);
export const createEpisode = (episode_id: string) =>
  fetchJSON<EpisodeSummary>('/episodes', {
    method: 'POST',
    body: JSON.stringify({ episode_id }),
  });
export const updateEpisode = (ep: string, data: Partial<EpisodeMeta>) =>
  fetchJSON<EpisodeSummary>(`/episodes/${ep}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// Pipeline
export async function uploadAudio(ep: string, file: File): Promise<{ status: string; path: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/episodes/${ep}/upload-audio`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json();
}

export function runStep(
  ep: string,
  step: string,
  onMessage: (msg: SSEMessage) => void,
): AbortController {
  const controller = new AbortController();
  fetch(`${BASE}/episodes/${ep}/run/${step}`, {
    method: 'POST',
    signal: controller.signal,
  }).then(async (res) => {
    if (!res.ok || !res.body) {
      onMessage({ type: 'done', status: 'error', code: res.status });
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            onMessage(JSON.parse(line.slice(6)));
          } catch { /* skip malformed */ }
        }
      }
    }
  }).catch((err) => {
    if (err.name !== 'AbortError') {
      onMessage({ type: 'done', status: 'error', code: -1, text: err.message });
    }
  });
  return controller;
}

// Cuts
export const getCuts = (ep: string) => fetchJSON<CutsResponse>(`/episodes/${ep}/cuts`);
export const updateCuts = (ep: string, cuts: CutItem[]) =>
  fetchJSON<{ saved: number; rejected: number }>(`/episodes/${ep}/cuts`, {
    method: 'PUT',
    body: JSON.stringify({ cuts }),
  });
export const approveCuts = (ep: string) =>
  fetchJSON<{ approved: boolean }>(`/episodes/${ep}/cuts/approve`, { method: 'POST' });

// Transcript
export const getTranscript = (ep: string) =>
  fetchJSON<{ segments: TranscriptSegment[] }>(`/episodes/${ep}/transcript`);

// Preview
export const previewNotes = (ep: string) =>
  fetchJSON<{ meta: EpisodeMeta; package: EpisodePackage; links: Array<Record<string, string>> }>(
    `/episodes/${ep}/preview/notes`,
  );
export const previewMarkdown = (ep: string) =>
  fetchJSON<{ markdown: string }>(`/episodes/${ep}/preview/markdown`);

// Audio URLs (for direct use, not fetched as JSON)
export const rawAudioUrl = (ep: string) => `${BASE}/episodes/${ep}/audio/raw`;
export const publishedAudioUrl = (ep: string) => `${BASE}/episodes/${ep}/audio/published`;
export const cutAudioUrl = (ep: string) => `${BASE}/episodes/${ep}/audio/cut`;
export const coverUrl = (ep: string) => `${BASE}/episodes/${ep}/preview/cover`;
