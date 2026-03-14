import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Episode } from '../types/episode';
import { podcastConfig } from '../lib/podcast-config';

interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
}

interface PlayerActions {
  play: (episode: Episode) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  close: () => void;
}

type PlayerContextValue = PlayerState & PlayerActions;

const PlayerContext = createContext<PlayerContextValue | null>(null);

/** Construct audio URL with OP3 analytics prefix */
function buildAudioUrl(audioUrl: string): string {
  if (!audioUrl) return '';
  const { mediaBaseUrl } = podcastConfig;
  if (!mediaBaseUrl) {
    // In development or if R2 isn't configured yet, return empty
    // This prevents broken audio but still lets the UI work
    return '';
  }
  const fullUrl = `${mediaBaseUrl}/${audioUrl}`;
  return `https://op3.dev/e/${fullUrl}`;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMetadata = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback((episode: Episode) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentEpisode?.slug === episode.slug) {
      // Same episode — resume
      audio.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    // New episode
    const url = buildAudioUrl(episode.audioUrl);
    if (url) {
      audio.src = url;
      audio.play().catch(() => {});
    }
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setCurrentTime(0);
    setProgress(0);

    // Parse duration string "MM:SS" to seconds for display when no audio loaded
    const parts = episode.duration.split(':').map(Number);
    if (parts.length === 2) {
      setDuration(parts[0] * 60 + parts[1]);
    } else if (parts.length === 3) {
      setDuration(parts[0] * 3600 + parts[1] * 60 + parts[2]);
    }
  }, [currentEpisode]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (currentEpisode) {
      const audio = audioRef.current;
      if (audio && audio.src) {
        audio.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  }, [isPlaying, pause, currentEpisode]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio && audio.src && isFinite(time)) {
      audio.currentTime = time;
      setCurrentTime(time);
      if (audio.duration && isFinite(audio.duration)) {
        setProgress((time / audio.duration) * 100);
      }
    }
  }, []);

  const close = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = '';
    }
    setCurrentEpisode(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);
  }, []);

  return (
    <PlayerContext.Provider value={{ currentEpisode, isPlaying, currentTime, duration, progress, play, pause, toggle, seek, close }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
