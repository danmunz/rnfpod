import { useState, useEffect, useCallback } from 'react';
import { listEpisodes, getEpisode, type EpisodeSummary } from '@/lib/api';

export function useEpisodes() {
  const [episodes, setEpisodes] = useState<EpisodeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setEpisodes(await listEpisodes());
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { episodes, loading, error, refresh };
}

export function useEpisode(ep: string) {
  const [episode, setEpisode] = useState<EpisodeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setEpisode(await getEpisode(ep));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [ep]);

  useEffect(() => { refresh(); }, [refresh]);

  return { episode, loading, error, refresh };
}
