import {
  Play,
  Zap,
  User,
  ArrowUpRight,
  Sparkles,
  Circle,
  ArrowRight,
  HelpCircle,
  Pause,
  X,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import hostPhoto from "figma:asset/ea66e3976104fc3cb8ba2cad5484171143ccdf08.png";

export function TwilightThinkingSiteDark({ 
  onNavigateToBrandGuide, 
  onNavigateToEpisode,
  onNavigateToBrowse,
  onPlayEpisode,
  isPlaying,
  currentEpisode
}: { 
  onNavigateToBrandGuide: () => void;
  onNavigateToEpisode: () => void;
  onNavigateToBrowse: () => void;
  onPlayEpisode: (episode: any) => void;
  isPlaying: boolean;
  currentEpisode: any;
}) {
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for dynamic gradients
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentEpisode) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 0.5;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentEpisode]);

  const togglePlayPause = () => {
    onPlayEpisode(currentEpisode);
  };

  const closePlayer = () => {
    onPlayEpisode(null);
    setProgress(0);
  };

  const playEpisode = (episodeNumber: number, title: string, duration: string) => {
    onPlayEpisode({
      episode: episodeNumber,
      title: title,
      duration: duration,
      number: episodeNumber
    });
  };

  const recentTopics = [
    {
      from: "Rainbow Road",
      to: "Greek Mythology",
      time: "8 min",
    },
    {
      from: "Comic Sans",
      to: "Accessibility Design",
      time: "12 min",
    },
    {
      from: "Redstone Circuits",
      to: "How Learning Works",
      time: "15 min",
    },
  ];

  const latestEpisode = {
    number: 47,
    title: "From Mario Kart to Mythology: The Unexpected Journey",
    description: "What started as AJ explaining Rainbow Road strategy somehow became a deep dive into Greek mythology, the hero's journey, and whether video games are accidentally teaching us narrative structure. This made perfect sense at the time.",
    duration: "48:32",
    topics: ["gaming", "mythology", "narrative design", "patterns"],
  };

  const episodes = [
    {
      number: 46,
      title: "Comic Sans: A Redemption Arc?",
      description: "AJ discovers typography exists. Dan tries to explain the great font wars of the 90s. We end up in a surprisingly deep conversation about accessibility and design prejudice.",
      topics: ["design", "history", "accessibility"],
      duration: "42:18",
      gradient: "from-violet-600 to-purple-600",
    },
    {
      number: 45,
      title: "Redstone = Electronics (An Investigation)",
      description: "Teaching Dan Minecraft circuits turns into a conversation about logic gates, how brains process information, and why learning by doing beats learning by reading.",
      topics: ["minecraft", "logic", "learning"],
      duration: "51:03",
      gradient: "from-indigo-600 to-violet-600",
    },
    {
      number: 44,
      title: "The Sims Are Just... People?",
      description: "Starting with character traits in The Sims, ending with Maslow's hierarchy of needs and game design philosophy. Somehow this tracks.",
      topics: ["gaming", "psychology", "design"],
      duration: "39:47",
      gradient: "from-purple-600 to-fuchsia-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]">
      {/* Atmospheric glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-[120px]"></div>
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-pink-500 opacity-15 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-violet-500 opacity-15 blur-[100px]"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] shadow-lg shadow-purple-500/30">
                  <Zap className="h-6 w-6 text-white" />
                  <div className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-[#F0ABFC] to-[#FBCFE8] px-1.5 py-0.5 font-mono text-[8px] font-black text-[#5B21B6] shadow-md">
                    ⚡
                  </div>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-[#E9D5FF] to-[#F0ABFC] bg-clip-text font-black text-sm uppercase tracking-widest text-transparent">
                    Random Neural Firings
                  </div>
                  <div className="font-mono text-[10px] font-bold text-purple-300">
                    // Making connections
                  </div>
                </div>
              </div>
              <nav className="flex gap-8 text-sm font-bold text-purple-100">
                <a href="#" className="transition hover:text-white">Listen</a>
                <a href="#" className="transition hover:text-white">About</a>
                <a href="#" className="transition hover:text-white">Subscribe</a>
                <button
                  onClick={onNavigateToBrandGuide}
                  className="flex items-center gap-1 rounded px-2 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                >
                  <BookOpen className="h-4 w-4" />
                  Brand Guide
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left - Text */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-purple-400/50 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#F0ABFC]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-purple-200">
                    Episode 47 • New This Week
                  </span>
                </div>

                <h1
                  className="mb-6 font-black text-6xl leading-[1.1] text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  That moment when your brain{" "}
                  <span className="bg-gradient-to-r from-[#F0ABFC] via-[#FBCFE8] to-[#F9A8D4] bg-clip-text italic text-transparent">
                    lights up
                  </span>
                </h1>

                <p className="mb-8 text-xl leading-relaxed text-purple-100">
                  <strong className="font-bold text-purple-200">Dan (dad, 41)</strong> and{" "}
                  <strong className="font-bold text-pink-200">AJ (daughter, 11)</strong> make
                  unexpected connections between completely unrelated topics. Neural pathways firing
                  at random. Ideas branching, connecting, sparking.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => playEpisode(latestEpisode.number, latestEpisode.title, latestEpisode.duration)}
                    className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-black text-[#5B21B6] shadow-2xl shadow-purple-500/50 transition hover:scale-105 hover:shadow-purple-500/70 focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Listen to Latest Episode
                  </button>
                  <button
                    onClick={onNavigateToBrowse}
                    className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    Browse All Episodes
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Right - Host Photo */}
              <div className="relative mx-auto lg:ml-auto lg:mr-0">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#A855F7]/40 to-[#EC4899]/40 blur-2xl" />
                  <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl backdrop-blur-sm">
                    <img
                      src={hostPhoto}
                      alt="Dan and AJ"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-6 z-10 rotate-[-3deg] rounded-xl border-2 border-dashed border-pink-400 bg-pink-500/30 px-4 py-3 shadow-xl backdrop-blur-sm">
                  <p className="font-mono text-sm font-black text-pink-100">
                    👋 Your hosts!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Episode Card */}
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-3xl border-2 border-purple-400/30 bg-white/10 shadow-2xl backdrop-blur-xl">
              <div className="grid lg:grid-cols-[1fr,340px]">
                <div className="p-12">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      Latest
                    </span>
                    <span className="font-mono text-sm font-bold text-purple-200">
                      Episode {latestEpisode.number}
                    </span>
                    <span className="ml-auto font-mono text-sm text-purple-300">
                      {latestEpisode.duration}
                    </span>
                  </div>

                  <h2
                    className="mb-4 font-black text-4xl leading-tight text-white"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {latestEpisode.title}
                  </h2>

                  <p className="mb-6 text-lg leading-relaxed text-purple-100">
                    {latestEpisode.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {latestEpisode.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border-2 border-purple-400/50 bg-purple-500/20 px-4 py-1.5 text-sm font-bold text-purple-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 rounded-xl border-2 border-dashed border-pink-400 bg-pink-500/20 p-4 backdrop-blur-sm">
                    <p className="font-mono text-xs font-black uppercase tracking-wider text-pink-200">
                      📝 Journey Notes
                    </p>
                    <p className="mt-1 text-sm text-pink-100">
                      Contains: 1 "wait, go back" moment, 3 aha moments, and at least 2 tangents that
                      somehow loop back to the main point.
                    </p>
                  </div>

                  <button className="flex items-center gap-3 rounded-full bg-white px-8 py-4 font-black text-[#5B21B6] shadow-xl transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
                    <Play className="h-5 w-5 fill-current" />
                    Play Episode
                  </button>
                  <button
                    onClick={onNavigateToEpisode}
                    className="mt-3 flex items-center gap-2 rounded px-2 font-bold text-sm text-purple-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  >
                    <ArrowRight className="h-4 w-4" />
                    View Episode 1 Details
                  </button>
                </div>

                {/* Side panel */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#A855F7] p-8">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#EC4899]/20 blur-2xl" />

                  <div className="relative flex h-full flex-col justify-center space-y-6">
                    <div>
                      <p className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-purple-200">
                        ⚡ The Journey
                      </p>
                      {recentTopics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="mb-4 rounded-lg border-2 border-dashed border-white/30 bg-white/5 p-3 backdrop-blur-sm"
                        >
                          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-white">
                            <span>{topic.from}</span>
                            <ArrowRight className="h-3 w-3 text-[#F0ABFC]" />
                          </div>
                          <div className="ml-4 border-l-2 border-[#F0ABFC] pl-3 text-sm font-medium text-purple-100">
                            {topic.to}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Circle className="h-2 w-2 fill-current text-[#F0ABFC]" />
                            <span className="font-mono text-xs font-bold text-purple-200">
                              {topic.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Episodes Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2
                className="mb-3 font-black text-5xl text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <span className="bg-gradient-to-r from-[#E9D5FF] via-[#F0ABFC] to-[#FBCFE8] bg-clip-text text-transparent">
                  More Episodes
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#F0ABFC]" />
                <p className="font-mono text-sm font-bold text-purple-300">
                  // Curiosity never stops
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {episodes.map((episode, idx) => (
                <article
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border-2 border-purple-400/30 bg-white/10 backdrop-blur-xl transition hover:border-purple-400/60 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className={`h-2 bg-gradient-to-r ${episode.gradient}`} />

                  <div
                    className={`absolute -right-3 -top-3 flex h-12 w-12 rotate-12 items-center justify-center rounded-full bg-gradient-to-br ${episode.gradient} font-mono text-sm font-black text-white shadow-xl`}
                  >
                    {episode.number}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300">
                        Episode {episode.number}
                      </span>
                      <span className="font-mono text-xs text-purple-400">
                        {episode.duration}
                      </span>
                    </div>

                    <h3
                      className="mb-3 font-bold text-xl leading-tight text-white transition group-hover:text-purple-200"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {episode.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-purple-100">
                      {episode.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {episode.topics.map((topic, topicIdx) => (
                        <span
                          key={topicIdx}
                          className="rounded-full border border-purple-400/40 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="rounded-lg border-2 border-dashed border-pink-400 bg-pink-500/20 p-3 backdrop-blur-sm">
                      <p className="font-mono text-xs font-bold text-pink-200">
                        {idx === 0
                          ? "💡 Contains: Typography deep dive"
                          : idx === 1
                            ? "⚡ Redstone → Philosophy"
                            : "🎮 Gaming meets psychology"}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-purple-400/30 pt-4">
                      <button className="flex items-center gap-2 font-bold text-sm text-purple-200 transition hover:text-white group-hover:gap-3">
                        <Play className="h-4 w-4" />
                        Listen
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Left - Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border-4 border-purple-400/30 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1766932103457-2ee3dc766756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGV2ZW5pbmd8ZW58MXx8fHwxNzY3NjgzNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Creative workspace"
                    className="w-full"
                  />
                </div>
                <div className="absolute -right-6 top-12 rotate-3 rounded-xl border-2 border-dashed border-pink-400 bg-pink-500/30 p-4 shadow-xl backdrop-blur-sm">
                  <p className="font-mono text-xs font-black text-pink-100">
                    ⚡ Connection made!
                  </p>
                  <p className="mt-1 max-w-[180px] text-sm text-pink-100">
                    "Wait—this is just like that thing!"
                  </p>
                </div>
                <div className="absolute -left-4 bottom-12 -rotate-2 rounded-xl border-2 border-[#EC4899] bg-gradient-to-br from-pink-500/40 to-purple-500/40 p-3 shadow-xl backdrop-blur-sm">
                  <p className="font-mono text-xs font-black text-pink-100">
                    💡 Aha moment
                  </p>
                </div>
              </div>

              {/* Right - Text */}
              <div className="flex flex-col justify-center">
                <div className="mb-6 inline-flex items-center gap-2">
                  <Sparkles className="h-10 w-10 text-[#F0ABFC]" />
                  <User className="h-10 w-10 text-[#FBCFE8]" />
                </div>

                <h2
                  className="mb-6 font-black text-5xl leading-tight text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Two minds,
                  <br />
                  infinite
                  <br />
                  <span className="bg-gradient-to-r from-[#F0ABFC] via-[#FBCFE8] to-[#F9A8D4] bg-clip-text text-transparent">
                    connections
                  </span>
                </h2>

                <div className="space-y-4 text-lg leading-relaxed text-purple-100">
                  <p>
                    <strong className="bg-gradient-to-r from-[#E9D5FF] to-[#F0ABFC] bg-clip-text font-black text-transparent">
                      Dan
                    </strong>{" "}
                    is 41, loves asking "but why?" and has a tendency to connect everything back to
                    something he learned in the 90s. Has never met a tangent he didn't like.
                  </p>
                  <p>
                    <strong className="bg-gradient-to-r from-[#F0ABFC] to-[#FBCFE8] bg-clip-text font-black text-transparent">
                      AJ
                    </strong>{" "}
                    is 11, has super-powered curiosity, and makes lightning-fast connections between
                    ideas that seem completely unrelated. The pattern-recognition engine is always
                    running.
                  </p>
                  <p>
                    Together, they explore topics ranging from video game mechanics to Greek
                    mythology, from font design to the nature of learning itself. Sometimes AJ
                    teaches Dan. Sometimes Dan teaches AJ. Always, they're both learning.
                  </p>
                </div>

                <div className="mt-8 space-y-2 rounded-xl border-2 border-dashed border-purple-400 bg-purple-500/20 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono font-bold text-purple-200">Question</span>
                    <ArrowRight className="h-4 w-4 text-purple-300" />
                    <span className="font-mono font-bold text-purple-200">Tangent</span>
                    <ArrowRight className="h-4 w-4 text-purple-300" />
                    <HelpCircle className="h-4 w-4 text-purple-300" />
                  </div>
                  <div className="ml-4 flex items-center gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-pink-300" />
                    <span className="text-purple-100">
                      More questions (somehow better than the answer)
                    </span>
                  </div>
                  <p className="mt-2 border-t border-purple-400/50 pt-2 font-mono text-xs font-bold text-purple-200">
                    ⚠️ This is actually the whole point
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border-2 border-dashed border-pink-400 bg-pink-500/20 p-6 backdrop-blur-sm shadow-lg">
                  <p className="font-mono text-xs font-black uppercase tracking-wider text-pink-200">
                    The Vibe
                  </p>
                  <p className="mt-2 font-medium text-pink-100">
                    That twilight moment when your brain makes an unexpected connection. Like a neural
                    network, but messier and more exciting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-white/5 py-16 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 grid gap-12 lg:grid-cols-3">
              <div>
                <h3
                  className="mb-4 font-black text-xl text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Random Neural Firings
                </h3>
                <p className="text-purple-200">
                  Making unexpected connections between unrelated topics since 2024.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#F0ABFC]" />
                  <span className="font-mono text-xs font-bold text-purple-200">
                    New episodes weekly
                  </span>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-purple-300">
                  Listen
                </h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Spotify
                  </a>
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Apple Podcasts
                  </a>
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Google Podcasts
                  </a>
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    RSS Feed
                  </a>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-purple-300">
                  Connect
                </h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Email Us
                  </a>
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Suggest a Topic
                  </a>
                  <a href="#" className="block text-purple-200 transition hover:text-white">
                    Newsletter
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="font-mono text-sm text-purple-300">
                © 2026 Random Neural Firings • Made with curiosity and sparkle brain energy ⚡
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky Mini Player */}
        {currentEpisode && (
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-300">
            <div className="border-t-2 border-purple-400/30 bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-6 py-4 shadow-2xl backdrop-blur-lg">
              <div className="mx-auto flex max-w-7xl items-center gap-6">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-xs font-black text-white shadow-lg">
                    {currentEpisode.episode}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-sm text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {currentEpisode.title}
                    </p>
                    <p className="font-mono text-xs text-purple-200">
                      Episode {currentEpisode.episode} • {currentEpisode.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayPause}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5B21B6] shadow-lg transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="h-5 w-5 fill-current" />
                    )}
                  </button>
                  <button
                    onClick={closePlayer}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mx-auto mt-3 max-w-7xl">
                <div className="h-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#F0ABFC] to-[#FBCFE8] transition-all duration-500 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
