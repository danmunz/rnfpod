import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { type Region } from 'wavesurfer.js/dist/plugins/regions.js';
import type { CutItem } from '@/lib/api';

interface WaveformViewerProps {
  audioUrl: string;
  cuts: CutItem[];
  onReady?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
}

export interface WaveformViewerRef {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  playRegion: (start: number, end: number) => void;
  isPlaying: () => boolean;
  getDuration: () => number;
}

export const WaveformViewer = forwardRef<WaveformViewerRef, WaveformViewerProps>(
  ({ audioUrl, cuts, onReady, onTimeUpdate }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WaveSurfer | null>(null);
    const regionsRef = useRef<RegionsPlugin | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => wsRef.current?.play(),
      pause: () => wsRef.current?.pause(),
      seekTo: (time: number) => {
        const ws = wsRef.current;
        if (ws) ws.seekTo(time / ws.getDuration());
      },
      playRegion: (start: number, end: number) => {
        const ws = wsRef.current;
        if (!ws) return;
        ws.seekTo(start / ws.getDuration());
        ws.play();
        const checkEnd = () => {
          if (ws.getCurrentTime() >= end) {
            ws.pause();
            ws.un('timeupdate', checkEnd);
          }
        };
        ws.on('timeupdate', checkEnd);
      },
      isPlaying: () => wsRef.current?.isPlaying() || false,
      getDuration: () => wsRef.current?.getDuration() || 0,
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const regions = RegionsPlugin.create();
      regionsRef.current = regions;

      const ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#374151',
        progressColor: '#45F0DF',
        cursorColor: '#FF3D9A',
        cursorWidth: 2,
        height: 128,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        plugins: [regions],
      });

      wsRef.current = ws;

      ws.load(audioUrl);

      ws.on('ready', () => {
        onReady?.(ws.getDuration());
      });

      ws.on('timeupdate', (time) => {
        onTimeUpdate?.(time);
      });

      return () => {
        ws.destroy();
        wsRef.current = null;
        regionsRef.current = null;
      };
    }, [audioUrl]);

    // Update cut regions when cuts change
    useEffect(() => {
      const regions = regionsRef.current;
      if (!regions) return;

      // Clear existing regions
      regions.clearRegions();

      // Add cut regions
      cuts.forEach((cut, i) => {
        regions.addRegion({
          start: cut.start,
          end: cut.end,
          color: cut.approved ? 'rgba(248, 113, 113, 0.2)' : 'rgba(156, 163, 175, 0.1)',
          drag: false,
          resize: false,
          id: `cut-${i}`,
        });
      });
    }, [cuts]);

    return (
      <div className="bg-bg-card border border-border rounded-lg p-4">
        <div ref={containerRef} />
      </div>
    );
  },
);
