import { Play, Pause, X } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MiniPlayer() {
  const { currentEpisode, isPlaying, progress, currentTime, duration, toggle, close, seek } = usePlayer();

  if (!currentEpisode) return null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(pct * duration);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-300">
      <div className="border-t-2 border-purple-300 bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-6 py-4 shadow-2xl backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-6">
          {/* Episode Info */}
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-xs font-black text-white shadow-lg">
              {currentEpisode.number.toString().padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-sm font-bold text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {currentEpisode.title}
              </p>
              <p className="font-mono text-xs text-purple-200">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5B21B6] shadow-lg transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </button>
            <button
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
              aria-label="Close player"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar — clickable to seek */}
        <div
          className="mx-auto mt-3 max-w-7xl cursor-pointer"
          onClick={handleProgressClick}
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#F0ABFC] to-[#FBCFE8] transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
