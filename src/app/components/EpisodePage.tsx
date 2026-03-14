import { Play, ArrowLeft, Clock, Calendar, ExternalLink, Pause } from "lucide-react";

interface Segment {
  title: string;
  timestamp: number;
  url: string;
  description?: string;
  accent?: string;
}

interface Resource {
  title: string;
  url: string;
}

interface EpisodePageProps {
  onNavigateBack: () => void;
  onPlayEpisode: (episode: any) => void;
  isPlaying: boolean;
  currentEpisode: any;
  theme?: 'light' | 'dark' | 'hybrid';
}

export function EpisodePage({ onNavigateBack, onPlayEpisode, isPlaying, currentEpisode, theme = 'hybrid' }: EpisodePageProps) {
  // Determine if we should use dark mode
  const isDark = theme === 'dark' || theme === 'hybrid';

  // Episode data
  const episode = {
    number: 1,
    title: "Sims, Spinning Chairs, and the Joy of Randomness",
    date: "2026-01-13",
    duration: "42:18",
    description: [
      "In our very first episode, we sit down (on spinning chairs, which becomes relevant later) to talk about The Sims. What starts as AJ explaining her character-building strategy quickly spirals into discussions about free will, personality types, and whether randomness makes games more fun or just more frustrating.",
      "Along the way, we discover that spinning chairs are the enemy of focused conversation, debate the merits of chaotic vs. planned gameplay, and somehow end up talking about Maslow's hierarchy of needs.",
      "This is what happens when an 11-year-old and her dad try to have a serious conversation. Spoiler: it's never serious for long."
    ],
    segments: [
      {
        title: "Intro & The Spinning Chair Problem",
        timestamp: 0,
        description: "We try to explain what this podcast is, but the chairs have other ideas."
      },
      {
        title: "Why The Sims is Basically Life",
        timestamp: 342,
        description: "AJ breaks down her character creation philosophy and why randomness matters.",
        accent: "cyan"
      },
      {
        title: "Chaos vs. Control in Games",
        timestamp: 891,
        description: "Do we want to control everything, or is unpredictability the whole point?",
        accent: "amber"
      },
      {
        title: "Personality Types & Maslow",
        timestamp: 1456,
        description: "Somehow we end up discussing psychology. This tracks.",
        accent: "emerald"
      },
      {
        title: "The Spinning Chair Incident",
        timestamp: 2103,
        description: "Things get derailed. Literally spinning."
      },
      {
        title: "Wrap-Up & What's Next",
        timestamp: 2398,
        description: "We reflect on randomness, patterns, and what we learned (maybe)."
      }
    ],
    resources: [
      {
        title: "The Sims 4",
        url: "https://www.ea.com/games/the-sims/the-sims-4"
      },
      {
        title: "Maslow's Hierarchy of Needs",
        url: "https://www.simplypsychology.org/maslow.html"
      },
      {
        title: "Game Design & Randomness",
        url: "https://www.gamedeveloper.com"
      }
    ]
  };

  const formatTimestamp = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaySegment = (timestamp: number) => {
    // In a real implementation, this would seek to the timestamp
    onPlayEpisode(episode);
  };

  const isCurrentlyPlaying = isPlaying && currentEpisode?.number === episode.number;

  return (
    <div className={isDark ? "min-h-screen bg-gradient-to-b from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]" : "min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F3FF] to-[#EDE9FE]"}>
      {/* Atmospheric glow orbs */}
      {isDark && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-[120px]"></div>
          <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-pink-500 opacity-15 blur-[100px]"></div>
        </div>
      )}

      <div className="relative">
        {/* Navigation */}
        <nav className={isDark ? "border-b border-white/10 bg-white/5 backdrop-blur-xl" : "border-b border-purple-200 bg-white/80 backdrop-blur-xl"}>
          <div className="mx-auto max-w-4xl px-6 py-4">
            <button
              onClick={onNavigateBack}
              className={isDark 
                ? "flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
                : "flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              }
            >
              <ArrowLeft className="h-4 w-4" />
              All Episodes
            </button>
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
                <div className={isDark 
                  ? "inline-flex items-center gap-2 rounded-full border-2 border-purple-400/50 bg-purple-500/20 px-3 py-1 backdrop-blur-sm"
                  : "inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-3 py-1"
                }>
                  <Calendar className={isDark ? "h-3 w-3 text-purple-200" : "h-3 w-3 text-purple-600"} />
                  <span className={isDark ? "font-mono text-xs font-bold text-purple-100" : "font-mono text-xs font-bold text-purple-700"}>
                    {new Date(episode.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className={isDark 
                  ? "inline-flex items-center gap-2 rounded-full border-2 border-purple-400/50 bg-purple-500/20 px-3 py-1 backdrop-blur-sm"
                  : "inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-3 py-1"
                }>
                  <Clock className={isDark ? "h-3 w-3 text-purple-200" : "h-3 w-3 text-purple-600"} />
                  <span className={isDark ? "font-mono text-xs font-bold text-purple-100" : "font-mono text-xs font-bold text-purple-700"}>
                    {episode.duration}
                  </span>
                </div>
                <div className={isDark 
                  ? "inline-block rounded border-2 border-dashed border-pink-400 bg-pink-500/30 px-3 py-1 font-mono text-xs font-bold uppercase text-pink-200 backdrop-blur-sm"
                  : "inline-block rounded border-2 border-dashed border-pink-400 bg-pink-100 px-3 py-1 font-mono text-xs font-bold uppercase text-pink-700"
                }>
                  EPISODE #{episode.number}
                </div>
              </div>

              <h1 className={isDark ? "mb-6 font-black text-5xl leading-tight text-white" : "mb-6 font-black text-5xl leading-tight text-slate-900"} style={{ fontFamily: 'Outfit, sans-serif' }}>
                {episode.title}
              </h1>

              <button
                onClick={() => onPlayEpisode(episode)}
                className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-black text-lg text-[#5B21B6] shadow-2xl shadow-purple-500/50 transition hover:scale-105 hover:shadow-purple-500/70 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50"
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
              <div className={isDark 
                ? "rounded-2xl border-2 border-purple-400/30 bg-white/10 p-6 backdrop-blur-xl"
                : "rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg"
              }>
                <h2 className={isDark ? "mb-4 font-black text-2xl text-white" : "mb-4 font-black text-2xl text-slate-900"} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  About This Episode
                </h2>
                <div className="space-y-4">
                  {episode.description.map((paragraph, index) => (
                    <p key={index} className={isDark ? "leading-relaxed text-purple-100" : "leading-relaxed text-slate-700"}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className={isDark 
                  ? "mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-500/20 px-3 py-1.5 font-mono text-xs font-bold text-purple-200"
                  : "mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-3 py-1.5 font-mono text-xs font-bold text-purple-700"
                }>
                  our first episode! 🎉
                </div>
              </div>

              {/* Segments */}
              <div className={isDark 
                ? "rounded-2xl border-2 border-purple-400/30 bg-white/10 p-6 backdrop-blur-xl"
                : "rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg"
              }>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className={isDark ? "font-black text-2xl text-white" : "font-black text-2xl text-slate-900"} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Segments
                  </h2>
                  <div className={isDark 
                    ? "inline-block rounded border-2 border-dashed border-purple-400 bg-purple-500/20 px-2 py-1 font-mono text-xs font-bold text-purple-200"
                    : "inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-2 py-1 font-mono text-xs font-bold text-purple-700"
                  }>
                    jump around →
                  </div>
                </div>
                <div className="space-y-3">
                  {episode.segments.map((segment, index) => {
                    // Determine accent colors for specific segments
                    let accentGradient = "from-[#A855F7] to-[#EC4899]"; // default purple-pink
                    let accentBorder = "";
                    let accentBg = "";
                    
                    if (segment.accent === "cyan") {
                      accentGradient = "from-[#06B6D4] to-[#3B82F6]";
                      accentBorder = isDark ? "border-cyan-400/40" : "border-cyan-300";
                      accentBg = isDark ? "bg-cyan-500/10" : "bg-cyan-50";
                    } else if (segment.accent === "amber") {
                      accentGradient = "from-[#F59E0B] to-[#F43F5E]";
                      accentBorder = isDark ? "border-amber-400/40" : "border-amber-300";
                      accentBg = isDark ? "bg-amber-500/10" : "bg-amber-50";
                    } else if (segment.accent === "emerald") {
                      accentGradient = "from-[#10B981] to-[#06B6D4]";
                      accentBorder = isDark ? "border-emerald-400/40" : "border-emerald-300";
                      accentBg = isDark ? "bg-emerald-500/10" : "bg-emerald-50";
                    }

                    const baseClass = isDark 
                      ? `group w-full rounded-xl border-2 ${accentBorder || "border-purple-400/20"} ${accentBg || "bg-white/5"} p-4 text-left transition hover:border-purple-400/50 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-purple-400/50`
                      : `group w-full rounded-xl border-2 ${accentBorder || "border-purple-200"} ${accentBg || "bg-purple-50"} p-4 text-left transition hover:border-purple-400 hover:bg-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-400/50`;

                    return (
                      <button
                        key={index}
                        onClick={() => handlePlaySegment(segment.timestamp)}
                        className={baseClass}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentGradient} shadow-lg transition group-hover:scale-110`}>
                            <Play className="h-4 w-4 fill-current text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={isDark ? "mb-1 font-bold text-white transition group-hover:text-purple-200" : "mb-1 font-bold text-slate-900 transition group-hover:text-purple-700"}>
                              {segment.title}
                            </p>
                            {segment.description && (
                              <p className={isDark ? "mb-2 text-sm text-purple-200" : "mb-2 text-sm text-slate-600"}>
                                {segment.description}
                              </p>
                            )}
                            <p className={isDark ? "font-mono text-xs text-purple-300" : "font-mono text-xs text-purple-600"}>
                              {formatTimestamp(segment.timestamp)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Show Notes */}
            <div className="space-y-8">
              {/* Things Mentioned */}
              <div className={isDark 
                ? "rounded-2xl border-2 border-purple-400/30 bg-white/10 p-6 backdrop-blur-xl"
                : "rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg"
              }>
                <h2 className={isDark ? "mb-4 font-black text-xl text-white" : "mb-4 font-black text-xl text-slate-900"} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Things Mentioned
                </h2>
                <div className="space-y-3">
                  {episode.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDark 
                        ? "group flex items-center justify-between rounded-lg border-2 border-purple-400/20 bg-white/5 p-3 transition hover:border-purple-400/50 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                        : "group flex items-center justify-between rounded-lg border-2 border-purple-200 bg-purple-50 p-3 transition hover:border-purple-400 hover:bg-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                      }
                    >
                      <span className={isDark ? "font-medium text-sm text-purple-100 transition group-hover:text-white" : "font-medium text-sm text-slate-700 transition group-hover:text-purple-700"}>
                        {resource.title}
                      </span>
                      <ExternalLink className={isDark ? "h-4 w-4 text-purple-300 transition group-hover:text-purple-200" : "h-4 w-4 text-purple-600 transition group-hover:text-purple-700"} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className={isDark 
                ? "rounded-2xl border-2 border-pink-400/30 bg-pink-500/10 p-6 backdrop-blur-xl"
                : "rounded-2xl border-2 border-pink-300 bg-pink-50 p-6 shadow-lg"
              }>
                <div className={isDark 
                  ? "mb-3 inline-block rounded border-2 border-dashed border-pink-400 bg-pink-500/30 px-2 py-1 font-mono text-xs font-bold uppercase text-pink-200"
                  : "mb-3 inline-block rounded border-2 border-dashed border-pink-400 bg-pink-200 px-2 py-1 font-mono text-xs font-bold uppercase text-pink-800"
                }>
                  Fun fact (maybe)
                </div>
                <p className={isDark ? "text-sm leading-relaxed text-pink-100" : "text-sm leading-relaxed text-pink-900"}>
                  This episode was recorded on spinning chairs, which explains approximately 73% of the tangents.
                </p>
              </div>

              {/* Episode Stats */}
              <div className={isDark 
                ? "rounded-2xl border-2 border-purple-400/30 bg-white/10 p-6 backdrop-blur-xl"
                : "rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg"
              }>
                <h3 className={isDark ? "mb-4 font-bold text-sm uppercase tracking-wider text-purple-300" : "mb-4 font-bold text-sm uppercase tracking-wider text-purple-600"}>
                  Episode Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? "text-purple-200" : "text-slate-600"}>Segments</span>
                    <span className={isDark ? "font-mono font-bold text-white" : "font-mono font-bold text-slate-900"}>{episode.segments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-purple-200" : "text-slate-600"}>Duration</span>
                    <span className={isDark ? "font-mono font-bold text-white" : "font-mono font-bold text-slate-900"}>{episode.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-purple-200" : "text-slate-600"}>Resources</span>
                    <span className={isDark ? "font-mono font-bold text-white" : "font-mono font-bold text-slate-900"}>{episode.resources.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}