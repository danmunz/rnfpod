import {
  Play,
  Sparkles,
  Circle,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import hostPhoto from '@/assets/ea66e3976104fc3cb8ba2cad5484171143ccdf08.png';
import { useEpisodes, useLatestEpisode } from '../hooks/useEpisodes';
import { usePlayer } from '../contexts/PlayerContext';
import { EpisodeCard } from '../components/EpisodeCard';

export function HomePage() {
  const episodes = useEpisodes();
  const latestEpisode = useLatestEpisode();
  const { play } = usePlayer();

  // Show 3 most recent after the latest
  const recentEpisodes = episodes.slice(1, 4);

  // Journey topics derived from latest episode
  const recentTopics = [
    { from: 'Rainbow Road', to: 'Greek Mythology', time: '8 min' },
    { from: 'Comic Sans', to: 'Accessibility Design', time: '12 min' },
    { from: 'Redstone Circuits', to: 'How Learning Works', time: '15 min' },
  ];

  return (
    <>
      {/* Hero - Full Width Image with Overlay */}
      <section className="relative overflow-hidden pb-8 pt-2">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1612174194998-7a47c3b2fbb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwcHVycGxlfGVufDF8fHx8MTc2NzY4MzQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Twilight sky"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/95 via-[#5B21B6]/85 to-[#7C3AED]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95] via-transparent to-transparent" />

        {/* Animated glow orbs */}
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-[#A855F7]/30 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-[#EC4899]/20 to-transparent blur-3xl" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left - Text */}
            <div className="max-w-2xl">
              {latestEpisode && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[#A855F7]/50 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#A855F7]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E9D5FF]">
                    Episode {latestEpisode.number} • New This Week
                  </span>
                </div>
              )}

              <h1
                className="mb-4 text-4xl font-black leading-[1.1] text-white lg:text-5xl"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                That moment when your brain{' '}
                <span className="bg-gradient-to-r from-[#E9D5FF] via-[#F0ABFC] to-[#FBCFE8] bg-clip-text italic text-transparent">
                  lights up
                </span>
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-purple-100">
                <strong className="font-bold text-[#E9D5FF]">Dan (dad, 41)</strong> and{' '}
                <strong className="font-bold text-[#F0ABFC]">AJ (daughter, 11)</strong> make
                unexpected connections between completely unrelated topics. Neural pathways
                firing at random. Ideas branching, connecting, sparking.
              </p>

              <div className="flex flex-wrap gap-3">
                {latestEpisode && (
                  <button
                    onClick={() => play(latestEpisode)}
                    className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 font-black text-[#5B21B6] shadow-2xl shadow-purple-500/40 transition hover:scale-105 hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Listen to Latest Episode
                  </button>
                )}
                <Link
                  to="/episodes"
                  className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  Browse All Episodes
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right - Host Photo */}
            <div className="relative mx-auto lg:ml-auto lg:mr-0">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#A855F7]/40 to-[#EC4899]/40 blur-2xl" />
                <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl backdrop-blur-sm lg:h-64 lg:w-64">
                  <img src={hostPhoto} alt="Dan and AJ" className="h-full w-full object-cover object-top" />
                </div>
              </div>
              <div className="absolute -bottom-3 -left-4 z-10 rotate-[-3deg] rounded-xl border-2 border-dashed border-[#F0ABFC] bg-gradient-to-br from-white to-pink-50 px-3 py-2 shadow-xl backdrop-blur-sm">
                <p className="font-mono text-xs font-black text-[#A855F7]">👋 Your hosts!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episode - Card Feature */}
      {latestEpisode && (
        <section className="relative z-30 pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-2xl shadow-purple-500/20">
              <div className="grid lg:grid-cols-[1fr,340px]">
                <div className="p-12">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#A855F7] px-4 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      Latest
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-500">
                      Episode {latestEpisode.number}
                    </span>
                    <span className="ml-auto font-mono text-sm text-slate-400">
                      {latestEpisode.duration}
                    </span>
                  </div>

                  <h2
                    className="mb-4 text-4xl font-black leading-tight text-slate-900"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {latestEpisode.title}
                  </h2>

                  <p className="mb-6 text-lg leading-relaxed text-slate-600">
                    {latestEpisode.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {latestEpisode.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border-2 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-1.5 text-sm font-bold text-[#5B21B6]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Annotation box */}
                  <div className="mb-6 rounded-xl border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-4 shadow-sm">
                    <p className="font-mono text-xs font-black uppercase tracking-wider text-[#5B21B6]">
                      📝 Journey Notes
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Contains: 1 "wait, go back" moment, 3 aha moments, and at least 2 tangents
                      that somehow loop back to the main point.
                    </p>
                  </div>

                  <button
                    onClick={() => play(latestEpisode)}
                    className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-8 py-4 font-black text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Play Episode
                  </button>
                  <Link
                    to={`/episodes/${latestEpisode.slug}`}
                    className="mt-2 flex items-center gap-2 rounded px-2 text-sm font-bold text-[#7C3AED] transition hover:text-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#5B21B6]/50"
                  >
                    <ArrowRight className="h-4 w-4" />
                    View Episode Details
                  </Link>
                </div>

                {/* Side accent panel */}
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
                            <Circle className="h-2 w-2 fill-current text-[#A855F7]" />
                            <span className="font-mono text-xs font-bold text-purple-300">
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
      )}

      {/* Recent Episodes Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2
              className="mb-2 text-5xl font-black text-slate-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
                More Episodes
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7]" />
              <p className="font-mono text-sm font-bold text-purple-600">// Curiosity never stops</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {recentEpisodes.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>

          {episodes.length > 4 && (
            <div className="mt-12 text-center">
              <Link
                to="/episodes"
                className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-8 py-3 font-bold text-purple-700 transition hover:bg-purple-50 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50"
              >
                Browse All {episodes.length} Episodes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left - Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border-4 border-purple-200 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1766932103457-2ee3dc766756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGV2ZW5pbmd8ZW58MXx8fHwxNzY3NjgzNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Creative workspace"
                  className="w-full"
                />
              </div>
              <div className="absolute -right-6 top-12 rotate-3 rounded-xl border-2 border-dashed border-[#A855F7] bg-gradient-to-br from-white to-purple-50 p-4 shadow-xl">
                <p className="font-mono text-xs font-black text-[#5B21B6]">⚡ Connection made!</p>
                <p className="mt-1 max-w-[180px] text-sm text-slate-700">
                  "Wait—this is just like that thing!"
                </p>
              </div>
              <div className="absolute -left-4 bottom-12 -rotate-2 rounded-xl border-2 border-[#EC4899] bg-gradient-to-br from-white to-pink-50 p-3 shadow-xl">
                <p className="font-mono text-xs font-black text-[#A855F7]">💡 Aha moment</p>
              </div>
            </div>

            {/* Right - Text */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2">
                <Sparkles className="h-10 w-10 text-[#7C3AED]" />
                <User className="h-10 w-10 text-[#A855F7]" />
              </div>

              <h2
                className="mb-6 text-5xl font-black leading-tight text-slate-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Two minds,
                <br />
                infinite
                <br />
                <span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
                  connections
                </span>
              </h2>

              <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                <p>
                  <strong className="bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] bg-clip-text font-black text-transparent">
                    Dan
                  </strong>{' '}
                  is 41, loves asking "but why?" and has a tendency to connect everything back
                  to something he learned in the 90s. Has never met a tangent he didn't like.
                </p>
                <p>
                  <strong className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] bg-clip-text font-black text-transparent">
                    AJ
                  </strong>{' '}
                  is 11, has super-powered curiosity, and makes lightning-fast connections
                  between ideas that seem completely unrelated. The pattern-recognition engine
                  is always running.
                </p>
                <p>
                  Together, they explore topics ranging from video game mechanics to Greek
                  mythology, from font design to the nature of learning itself. Sometimes AJ
                  teaches Dan. Sometimes Dan teaches AJ. Always, they're both learning.
                </p>
              </div>

              {/* Mini diagram */}
              <div className="mt-8 space-y-2 rounded-xl border-2 border-dashed border-[#7C3AED] bg-gradient-to-br from-purple-50 to-indigo-50 p-4 shadow-md">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono font-bold text-[#5B21B6]">Question</span>
                  <ArrowRight className="h-4 w-4 text-[#7C3AED]" />
                  <span className="font-mono font-bold text-[#7C3AED]">Tangent</span>
                  <ArrowRight className="h-4 w-4 text-[#A855F7]" />
                  <HelpCircle className="h-4 w-4 text-[#A855F7]" />
                </div>
                <div className="ml-4 flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-[#EC4899]" />
                  <span className="text-slate-700">
                    More questions (somehow better than the answer)
                  </span>
                </div>
                <p className="mt-2 border-t border-purple-200 pt-2 font-mono text-xs font-bold text-[#5B21B6]">
                  ⚠️ This is actually the whole point
                </p>
              </div>

              <div className="mt-8 rounded-2xl border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-6 shadow-lg">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-[#5B21B6]">
                  The Vibe
                </p>
                <p className="mt-2 font-medium text-slate-700">
                  That twilight moment when your brain makes an unexpected connection. Like a
                  neural network, but messier and more exciting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
