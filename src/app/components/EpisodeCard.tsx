import { Play, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Episode } from '../types/episode';
import { usePlayer } from '../contexts/PlayerContext';

interface EpisodeCardProps {
  episode: Episode;
  /** If provided, clicking a topic calls this instead of linking */
  onTopicClick?: (topic: string) => void;
}

export function EpisodeCard({ episode, onTopicClick }: EpisodeCardProps) {
  const { play } = usePlayer();

  return (
    <article className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-sm transition hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Gradient top bar */}
      <div className={`h-2 bg-gradient-to-r ${episode.gradient}`} />

      {/* Episode number badge */}
      <div
        className={`absolute -right-3 -top-3 flex h-14 w-14 rotate-12 items-center justify-center rounded-full bg-gradient-to-br ${episode.gradient} border-3 border-white font-mono text-base font-black text-white shadow-xl`}
      >
        {episode.number.toString().padStart(2, '0')}
      </div>

      <div className="p-6">
        {/* Metadata */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Calendar className="h-3 w-3" />
            {new Date(episode.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {episode.duration}
          </div>
        </div>

        {/* Title */}
        <Link to={`/episodes/${episode.slug}`}>
          <h3
            className="mb-3 font-black text-xl leading-tight text-slate-900 transition group-hover:text-[#5B21B6]"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {episode.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {episode.description}
        </p>

        {/* Topics */}
        <div className="mb-4 flex flex-wrap gap-2">
          {episode.topics.map((topic) => (
            <button
              key={topic}
              onClick={() => onTopicClick?.(topic)}
              className="rounded-full border border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-1 text-xs font-medium text-[#5B21B6] transition hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Annotation */}
        {episode.annotation && (
          <div className="mb-4 rounded-lg border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-3 shadow-sm">
            <p className="font-mono text-xs font-bold text-[#5B21B6]">
              {episode.annotation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-purple-100 pt-4">
          <button
            onClick={() => play(episode)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            <Play className="h-4 w-4 fill-current" />
            Play
          </button>
          <Link
            to={`/episodes/${episode.slug}`}
            className="rounded-full border-2 border-purple-300 bg-white px-4 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
