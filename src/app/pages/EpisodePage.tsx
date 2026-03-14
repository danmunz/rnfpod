import { Play, Pause, ArrowLeft, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEpisode } from '../hooks/useEpisodes';
import { usePlayer } from '../contexts/PlayerContext';

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function EpisodePage() {
  const { slug } = useParams<{ slug: string }>();
  const episode = useEpisode(slug);
  const { play, seek, currentEpisode, isPlaying, toggle } = usePlayer();

  if (!episode) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-black text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Episode Not Found
          </h1>
          <Link
            to="/episodes"
            className="rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-6 py-3 font-bold text-white"
          >
            Browse All Episodes
          </Link>
        </div>
      </div>
    );
  }

  const isCurrentlyPlaying = isPlaying && currentEpisode?.slug === episode.slug;

  const handlePlaySegment = (timestamp: number) => {
    if (currentEpisode?.slug !== episode.slug) {
      play(episode);
    }
    // Small delay to let audio load if it's a new episode
    setTimeout(() => seek(timestamp), currentEpisode?.slug === episode.slug ? 0 : 500);
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="border-b border-purple-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link
            to="/episodes"
            className="flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            <ArrowLeft className="h-4 w-4" />
            All Episodes
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          {/* Episode Number Badge */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-4xl font-black text-white shadow-2xl shadow-purple-500/50">
            {episode.number.toString().padStart(2, '0')}
          </div>

          {/* Episode Info */}
          <div className="flex-1">
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-3 py-1">
                <Calendar className="h-3 w-3 text-purple-600" />
                <span className="font-mono text-xs font-bold text-purple-700">
                  {new Date(episode.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-3 py-1">
                <Clock className="h-3 w-3 text-purple-600" />
                <span className="font-mono text-xs font-bold text-purple-700">{episode.duration}</span>
              </div>
              <div className="inline-block rounded border-2 border-dashed border-pink-400 bg-pink-100 px-3 py-1 font-mono text-xs font-bold uppercase text-pink-700">
                EPISODE #{episode.number}
              </div>
            </div>

            <h1
              className="mb-6 text-5xl font-black leading-tight text-slate-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {episode.title}
            </h1>

            <button
              onClick={() => (isCurrentlyPlaying ? toggle() : play(episode))}
              className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-black text-[#5B21B6] shadow-2xl shadow-purple-500/50 transition hover:scale-105 hover:shadow-purple-500/70 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50"
            >
              {isCurrentlyPlaying ? (
                <>
                  <Pause className="h-6 w-6 fill-current" />
                  Pause Episode
                </>
              ) : (
                <>
                  <Play className="h-6 w-6 fill-current" />
                  Play Episode
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Description & Segments */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <div className="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
              <h2
                className="mb-4 text-2xl font-black text-slate-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                About This Episode
              </h2>
              <div className="prose prose-slate max-w-none prose-p:leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{episode.description}</ReactMarkdown>
              </div>
              {episode.annotation && (
                <div className="mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-3 py-1.5 font-mono text-xs font-bold text-purple-700">
                  {episode.annotation}
                </div>
              )}
            </div>

            {/* Segments */}
            {episode.segments.length > 0 && (
              <div className="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2
                    className="text-2xl font-black text-slate-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Segments
                  </h2>
                  <div className="inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-2 py-1 font-mono text-xs font-bold text-purple-700">
                    jump around →
                  </div>
                </div>
                <div className="space-y-3">
                  {episode.segments.map((segment, index) => {
                    let accentGradient = 'from-[#A855F7] to-[#EC4899]';
                    let accentBorder = 'border-purple-200';
                    let accentBg = 'bg-purple-50';

                    if (segment.accent === 'cyan') {
                      accentGradient = 'from-[#06B6D4] to-[#3B82F6]';
                      accentBorder = 'border-cyan-300';
                      accentBg = 'bg-cyan-50';
                    } else if (segment.accent === 'amber') {
                      accentGradient = 'from-[#F59E0B] to-[#F43F5E]';
                      accentBorder = 'border-amber-300';
                      accentBg = 'bg-amber-50';
                    } else if (segment.accent === 'emerald') {
                      accentGradient = 'from-[#10B981] to-[#06B6D4]';
                      accentBorder = 'border-emerald-300';
                      accentBg = 'bg-emerald-50';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handlePlaySegment(segment.timestamp)}
                        className={`group w-full rounded-xl border-2 ${accentBorder} ${accentBg} p-4 text-left transition hover:border-purple-400 hover:bg-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-400/50`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentGradient} shadow-lg transition group-hover:scale-110`}
                          >
                            <Play className="h-4 w-4 fill-current text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="mb-1 font-bold text-slate-900 transition group-hover:text-purple-700">
                              {segment.title}
                            </p>
                            {segment.description && (
                              <p className="mb-2 text-sm text-slate-600">{segment.description}</p>
                            )}
                            <p className="font-mono text-xs text-purple-600">
                              {formatTimestamp(segment.timestamp)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Show Notes */}
          <div className="space-y-8">
            {/* Things Mentioned */}
            {episode.resources.length > 0 && (
              <div className="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
                <h2
                  className="mb-4 text-xl font-black text-slate-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Things Mentioned
                </h2>
                <div className="space-y-3">
                  {episode.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border-2 border-purple-200 bg-purple-50 p-3 transition hover:border-purple-400 hover:bg-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                    >
                      <span className="text-sm font-medium text-slate-700 transition group-hover:text-purple-700">
                        {resource.title}
                      </span>
                      <ExternalLink className="h-4 w-4 text-purple-600 transition group-hover:text-purple-700" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Episode Stats */}
            <div className="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-purple-600">
                Episode Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Segments</span>
                  <span className="font-mono font-bold text-slate-900">{episode.segments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-mono font-bold text-slate-900">{episode.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Resources</span>
                  <span className="font-mono font-bold text-slate-900">{episode.resources.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Topics</span>
                  <span className="font-mono font-bold text-slate-900">{episode.topics.length}</span>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-purple-600">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {episode.topics.map((topic) => (
                  <Link
                    key={topic}
                    to={`/episodes?topic=${encodeURIComponent(topic)}`}
                    className="rounded-full border-2 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-1.5 text-sm font-bold text-[#5B21B6] transition hover:bg-purple-100"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
