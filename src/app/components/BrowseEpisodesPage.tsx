import { Play, Search, Filter, Calendar, Clock, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Episode {
  number: number;
  title: string;
  date: string;
  duration: string;
  description: string;
  topics: string[];
  gradient: string;
  annotation?: string;
}

interface BrowseEpisodesPageProps {
  onNavigateBack: () => void;
  onNavigateToEpisode: () => void;
  onPlayEpisode: (episode: any) => void;
  isPlaying: boolean;
  currentEpisode: any;
  theme?: 'light' | 'dark' | 'hybrid';
}

export function BrowseEpisodesPage({ 
  onNavigateBack, 
  onNavigateToEpisode,
  onPlayEpisode,
  isPlaying,
  currentEpisode,
  theme = 'hybrid'
}: BrowseEpisodesPageProps) {
  // Determine if we should use dark mode
  const isDark = theme === 'dark' || theme === 'hybrid';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Mock episode data
  const allEpisodes: Episode[] = [
    {
      number: 47,
      title: "From Mario Kart to Mythology: The Unexpected Journey",
      date: "2026-01-14",
      duration: "48:32",
      description: "What started as AJ explaining Rainbow Road strategy somehow became a deep dive into Greek mythology, the hero's journey, and whether video games are accidentally teaching us narrative structure.",
      topics: ["gaming", "mythology", "narrative design"],
      gradient: "from-purple-600 to-fuchsia-600",
      annotation: "Contains 4 'wait what?' moments"
    },
    {
      number: 46,
      title: "Comic Sans: A Redemption Arc?",
      date: "2026-01-07",
      duration: "42:18",
      description: "AJ discovers typography exists. Dan tries to explain the great font wars of the 90s. We end up in a surprisingly deep conversation about accessibility and design prejudice.",
      topics: ["design", "history", "accessibility"],
      gradient: "from-violet-600 to-purple-600",
      annotation: "Fonts have feelings (probably)"
    },
    {
      number: 45,
      title: "Redstone = Electronics (An Investigation)",
      date: "2025-12-31",
      duration: "51:03",
      description: "Teaching Dan Minecraft circuits turns into a conversation about logic gates, how brains process information, and why learning by doing beats learning by reading.",
      topics: ["minecraft", "logic", "learning"],
      gradient: "from-indigo-600 to-violet-600",
      annotation: "⚡ Circuits = brain connections?"
    },
    {
      number: 44,
      title: "The Sims Are Just... People?",
      date: "2025-12-24",
      duration: "39:47",
      description: "Starting with character traits in The Sims, ending with Maslow's hierarchy of needs and game design philosophy. Somehow this tracks.",
      topics: ["gaming", "psychology", "design"],
      gradient: "from-purple-600 to-fuchsia-600",
      annotation: "Philosophy disguised as gaming"
    },
    {
      number: 43,
      title: "Why Do Ghosts Need Houses?",
      date: "2025-12-17",
      duration: "44:29",
      description: "A conversation about spooky stories becomes an exploration of what makes things scary, why we like being scared, and the psychology of horror.",
      topics: ["storytelling", "psychology", "culture"],
      gradient: "from-indigo-600 to-purple-600",
      annotation: "Surprisingly not scary"
    },
    {
      number: 42,
      title: "The Great Pickle Debate",
      date: "2025-12-10",
      duration: "37:15",
      description: "What started as a food preference discussion evolved into talking about taste, culture, sensory processing, and why AJ's brain works differently with food.",
      topics: ["food", "science", "neurodiversity"],
      gradient: "from-violet-600 to-fuchsia-600",
      annotation: "ADHD & food textures"
    },
    {
      number: 41,
      title: "Building Worlds in Minecraft",
      date: "2025-12-03",
      duration: "56:12",
      description: "From creative mode builds to conversations about architecture, urban planning, how spaces make us feel, and why AJ's builds are always purple.",
      topics: ["minecraft", "design", "creativity"],
      gradient: "from-purple-600 to-pink-600",
      annotation: "Everything is purple (no regrets)"
    },
    {
      number: 40,
      title: "Time Doesn't Feel Linear",
      date: "2025-11-26",
      duration: "41:38",
      description: "Why does time feel weird? We explore time perception, ADHD time blindness, relativity (sort of), and whether time is even real.",
      topics: ["science", "psychology", "ADHD"],
      gradient: "from-indigo-600 to-violet-600",
      annotation: "Time is probably fake"
    },
    {
      number: 39,
      title: "The Art of the Tangent",
      date: "2025-11-19",
      duration: "52:27",
      description: "A meta episode where we talk about how we talk, why tangents are actually the point, and the beauty of non-linear thinking.",
      topics: ["meta", "ADHD", "learning"],
      gradient: "from-violet-600 to-purple-600",
      annotation: "So meta it loops back"
    },
    {
      number: 38,
      title: "Why Are Memes Funny?",
      date: "2025-11-12",
      duration: "38:54",
      description: "Trying to explain meme culture to Dan leads to discussions about internet humor, context, inside jokes, and how communication is evolving.",
      topics: ["culture", "internet", "communication"],
      gradient: "from-purple-600 to-fuchsia-600",
      annotation: "Dan still doesn't get it"
    },
    {
      number: 37,
      title: "Space Is Big (Like, Really Big)",
      date: "2025-11-05",
      duration: "49:18",
      description: "From the solar system to the concept of infinity, this conversation goes big. Really, really big. Existential crisis included.",
      topics: ["space", "science", "philosophy"],
      gradient: "from-indigo-600 to-purple-600",
      annotation: "🌌 Mind = blown"
    },
    {
      number: 1,
      title: "Sims, Spinning Chairs, and the Joy of Randomness",
      date: "2026-01-04",
      duration: "9:43",
      description: "In our inaugural episode, we dive into the world of The Sims 4, exploring its quirky personalities and the chaos of gameplay.",
      topics: ["gaming", "ADHD", "psychology"],
      gradient: "from-violet-600 to-pink-600",
      annotation: "Our first episode! 🎉"
    }
  ];

  // Extract all unique topics
  const allTopics = Array.from(new Set(allEpisodes.flatMap(ep => ep.topics))).sort();

  // Filter and sort episodes
  const filteredEpisodes = allEpisodes
    .filter(episode => {
      const matchesSearch = searchQuery === "" || 
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTopic = selectedTopic === null || episode.topics.includes(selectedTopic);
      
      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const handlePlayEpisode = (episode: Episode) => {
    onPlayEpisode({
      number: episode.number,
      episode: episode.number,
      title: episode.title,
      duration: episode.duration
    });
  };

  return (
    <div className={isDark ? "min-h-screen bg-gradient-to-b from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]" : "min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F3FF] to-[#EDE9FE]"}>
      {/* Atmospheric glow orbs */}
      {isDark && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-[120px]"></div>
          <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-pink-500 opacity-15 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-violet-500 opacity-15 blur-[100px]"></div>
        </div>
      )}

      <div className="relative">
        {/* Navigation */}
        <nav className={isDark ? "border-b border-white/10 bg-white/5 backdrop-blur-xl" : "border-b border-purple-200 bg-white/80 backdrop-blur-xl"}>
          <div className="mx-auto max-w-7xl px-6 py-4">
            <button
              onClick={onNavigateBack}
              className={isDark 
                ? "flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
                : "flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              }
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8">
            <div className={isDark 
              ? "mb-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-400/50 bg-purple-500/20 px-4 py-2 backdrop-blur-sm"
              : "mb-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-4 py-2"
            }>
              <Sparkles className={isDark ? "h-4 w-4 text-purple-200" : "h-4 w-4 text-purple-600"} />
              <span className={isDark ? "font-mono text-xs font-bold uppercase tracking-wider text-purple-100" : "font-mono text-xs font-bold uppercase tracking-wider text-purple-700"}>
                {allEpisodes.length} Episodes & Counting
              </span>
            </div>
            
            <h1 className={isDark ? "mb-4 font-black text-6xl leading-tight text-white" : "mb-4 font-black text-6xl leading-tight text-slate-900"} style={{ fontFamily: 'Outfit, sans-serif' }}>
              All Episodes
            </h1>
            
            <p className={isDark ? "max-w-2xl text-xl text-purple-100" : "max-w-2xl text-xl text-slate-700"}>
              Every conversation, tangent, and aha moment—ready for your ears.
            </p>

            <div className={isDark 
              ? "mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-500/20 px-3 py-1.5 font-mono text-xs font-bold text-purple-200"
              : "mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-3 py-1.5 font-mono text-xs font-bold text-purple-700"
            }>
              probably should have organized these better →
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className={isDark ? "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-300" : "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-600"} />
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isDark 
                  ? "w-full rounded-2xl border-2 border-purple-400/30 bg-white/10 py-4 pl-12 pr-4 font-medium text-white placeholder-purple-300 backdrop-blur-xl transition focus:border-purple-400/60 focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-purple-400/30"
                  : "w-full rounded-2xl border-2 border-purple-300 bg-white py-4 pl-12 pr-4 font-medium text-slate-900 placeholder-purple-400 transition focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-400/30"
                }
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-purple-300" />
                <span className="font-mono text-xs font-bold uppercase text-purple-200">
                  Filter by topic:
                </span>
              </div>
              
              <button
                onClick={() => setSelectedTopic(null)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                  selectedTopic === null
                    ? "border-2 border-purple-400 bg-purple-500/40 text-white"
                    : "border-2 border-purple-400/30 bg-white/10 text-purple-200 hover:bg-white/20"
                }`}
              >
                All
              </button>

              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                    selectedTopic === topic
                      ? "border-2 border-purple-400 bg-purple-500/40 text-white"
                      : "border-2 border-purple-400/30 bg-white/10 text-purple-200 hover:bg-white/20"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase text-purple-200">
                Sort:
              </span>
              <button
                onClick={() => setSortBy("newest")}
                className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                  sortBy === "newest"
                    ? "border-2 border-pink-400 bg-pink-500/40 text-white"
                    : "border-2 border-purple-400/30 bg-white/10 text-purple-200 hover:bg-white/20"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortBy("oldest")}
                className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                  sortBy === "oldest"
                    ? "border-2 border-pink-400 bg-pink-500/40 text-white"
                    : "border-2 border-purple-400/30 bg-white/10 text-purple-200 hover:bg-white/20"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedTopic) && (
            <div className="mb-6 rounded-xl border-2 border-purple-400/30 bg-purple-500/20 p-4 backdrop-blur-xl">
              <p className="font-medium text-purple-100">
                Found <span className="font-mono font-black text-white">{filteredEpisodes.length}</span> episode{filteredEpisodes.length !== 1 ? 's' : ''}
                {selectedTopic && (
                  <span> in <span className="font-bold text-purple-200">{selectedTopic}</span></span>
                )}
                {searchQuery && (
                  <span> matching "<span className="font-bold text-purple-200">{searchQuery}</span>"</span>
                )}
              </p>
            </div>
          )}
        </section>

        {/* Episodes Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          {filteredEpisodes.length === 0 ? (
            <div className="rounded-2xl border-2 border-purple-400/30 bg-white/10 p-12 text-center backdrop-blur-xl">
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-purple-300" />
              <h3 className="mb-2 font-black text-2xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                No episodes found
              </h3>
              <p className="text-purple-200">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic(null);
                }}
                className="mt-6 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEpisodes.map((episode) => (
                <article
                  key={episode.number}
                  className="group relative overflow-hidden rounded-2xl border-2 border-purple-400/30 bg-white/10 backdrop-blur-xl transition hover:border-purple-400/60 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Gradient top bar */}
                  <div className={`h-2 bg-gradient-to-r ${episode.gradient}`} />

                  {/* Episode number badge */}
                  <div className="absolute -right-3 -top-3 flex h-14 w-14 rotate-12 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-base font-black text-white shadow-xl">
                    {episode.number.toString().padStart(2, '0')}
                  </div>

                  <div className="p-6">
                    {/* Metadata */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-purple-300">
                        <Calendar className="h-3 w-3" />
                        {new Date(episode.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1 font-mono text-xs text-purple-300">
                        <Clock className="h-3 w-3" />
                        {episode.duration}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-3 font-black text-xl leading-tight text-white transition group-hover:text-purple-200"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {episode.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-purple-100">
                      {episode.description}
                    </p>

                    {/* Topics */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {episode.topics.map((topic, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTopic(topic)}
                          className="rounded-full border border-purple-400/40 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200 transition hover:border-purple-400/60 hover:bg-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>

                    {/* Annotation */}
                    {episode.annotation && (
                      <div className="mb-4 rounded-lg border-2 border-dashed border-pink-400/50 bg-pink-500/10 p-2 backdrop-blur-sm">
                        <p className="font-mono text-xs font-bold text-pink-200">
                          {episode.annotation}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 border-t border-purple-400/30 pt-4">
                      <button
                        onClick={() => handlePlayEpisode(episode)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-4 py-2.5 font-bold text-sm text-white shadow-md transition hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        Play
                      </button>
                      {episode.number === 1 && (
                        <button
                          onClick={onNavigateToEpisode}
                          className="flex items-center gap-1 rounded-full border-2 border-purple-400/40 bg-white/10 px-4 py-2.5 font-bold text-xs text-purple-200 transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                          title="View episode details"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}