import { ArrowRight, BookOpen, Sparkles, Radio } from 'lucide-react';

export function CoolIntellectualSite() {
  const episodes = [
    {
      number: "Episode 47",
      title: "Why Do Fonts Even Exist? A History",
      description: "AJ discovers typography and Dan tries to explain the 90s font explosion. We debate whether Comic Sans has been unfairly judged by history.",
      topics: ["design", "history", "accessibility"],
      duration: "42 min"
    },
    {
      number: "Episode 46", 
      title: "The Physics of Mario Kart (Probably Wrong)",
      description: "Does Rainbow Road actually follow the laws of physics? Spoiler: No. But the conversation about gravity, momentum, and game design is fascinating.",
      topics: ["gaming", "physics", "design"],
      duration: "38 min"
    },
    {
      number: "Episode 45",
      title: "Teaching Someone Minecraft Teaches You Logic",
      description: "AJ walks Dan through redstone circuits. We discover that explaining something reveals how much you actually understand it.",
      topics: ["minecraft", "logic", "teaching"],
      duration: "51 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0369A1] to-[#6366F1]">
                <Sparkles className="h-5 w-5 text-white" />
                <div className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-1.5 py-0.5 font-mono text-[8px] font-black text-white shadow-md">
                  ⚡
                </div>
              </div>
              <span className="font-mono text-sm font-bold tracking-tight text-slate-900">
                RNF
              </span>
            </div>
            <nav className="flex gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-slate-900">Episodes</a>
              <a href="#" className="hover:text-slate-900">About</a>
              <a href="#" className="hover:text-slate-900">Subscribe</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2">
            {/* Text Side */}
            <div className="relative flex flex-col justify-center px-6 py-20 lg:px-12 lg:py-32">
              {/* Floating annotation */}
              <div className="absolute right-8 top-12 hidden rotate-2 rounded-lg border-2 border-dashed border-[#0891B2] bg-gradient-to-br from-cyan-50 to-blue-50 p-3 shadow-lg lg:block">
                <p className="font-mono text-xs font-bold text-[#0C4A6E]">
                  → Start here
                </p>
              </div>

              <div className="mb-4 inline-block w-fit rounded-full border border-[#0891B2] bg-[#0891B2]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0C4A6E]">
                Weekly Conversations
              </div>
              <h1 className="mb-6 font-black text-5xl leading-[1.1] text-slate-900 lg:text-7xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Random Neural
                <br />
                <span className="bg-gradient-to-r from-[#0369A1] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Firings
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
                Dan (dad, 41) and AJ (daughter, 11) explore nerdy topics, make unexpected
                connections, and ask questions nobody asked for. Like finding margin notes
                in the perfect textbook.
              </p>

              {/* Mini diagram */}
              <div className="mb-8 space-y-2 rounded-xl border-2 border-dashed border-[#6366F1] bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono font-bold text-[#0369A1]">Topic A:</span>
                  <span className="text-slate-700">Minecraft circuits</span>
                  <ArrowRight className="h-4 w-4 text-[#6366F1]" />
                </div>
                <div className="ml-4 flex items-center gap-2 text-sm">
                  <span className="font-mono font-bold text-[#6366F1]">Becomes:</span>
                  <span className="text-slate-700">Philosophy of learning</span>
                </div>
                <p className="mt-2 border-t border-slate-200 pt-2 font-mono text-xs font-bold text-[#5B21B6]">
                  ⚠️ This will make sense. Eventually.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0369A1] to-[#6366F1] px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40">
                  <Radio className="h-5 w-5" />
                  Listen Now
                </button>
                <button className="flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:border-slate-400">
                  Read About Us
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image Side with Gradient Overlay */}
            <div className="relative min-h-[400px] lg:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0369A1]/90 via-[#6366F1]/80 to-transparent mix-blend-multiply" />
              <img
                src="https://images.unsplash.com/photo-1664786200000-b1424aa47dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY3NjgwNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Books and learning"
                className="h-full w-full object-cover"
              />
              {/* Annotation-style overlay */}
              <div className="absolute bottom-8 right-8 rotate-2 rounded-lg border-2 border-white bg-white/95 p-4 shadow-xl backdrop-blur-sm">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                  Curiosity Required →
                </p>
                <p className="mt-1 max-w-[200px] text-sm text-slate-700">
                  "Like annotating in the margins of a really good book"
                </p>
              </div>

              {/* Additional floating note */}
              <div className="absolute left-8 top-12 -rotate-2 rounded-lg border-2 border-dashed border-[#8B5CF6] bg-gradient-to-br from-white to-purple-50 p-3 shadow-lg backdrop-blur-sm">
                <p className="font-mono text-xs font-black text-[#5B21B6]">
                  📚 Brain food
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 font-black text-4xl text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recent Episodes
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0891B2] to-[#6366F1]" />
                <p className="font-mono text-sm font-bold text-[#0369A1]">
                  // New conversations every week
                </p>
              </div>
            </div>
            <button className="text-sm font-bold text-[#6366F1] hover:text-[#8B5CF6]">
              View All Episodes →
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {episodes.map((episode, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#6366F1] hover:shadow-xl"
              >
                {/* Gradient accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#0369A1] via-[#0891B2] to-[#6366F1]" />
                
                {/* Episode number badge */}
                <div className="absolute -right-2 -top-2 flex h-10 w-10 rotate-12 items-center justify-center rounded-full border-2 border-slate-900 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] font-mono text-xs font-black text-white shadow-lg">
                  {47 - idx}
                </div>

                <div className="mb-4 flex items-start justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0891B2]">
                    {episode.number}
                  </span>
                  <span className="text-xs text-slate-500">{episode.duration}</span>
                </div>

                <h3 className="mb-3 font-bold text-xl leading-tight text-slate-900 group-hover:text-[#0369A1]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {episode.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {episode.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {episode.topics.map((topic, topicIdx) => (
                    <span
                      key={topicIdx}
                      className="rounded-full border border-[#0891B2] bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 text-xs font-medium text-[#0C4A6E]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Annotation-style note */}
                <div className="rounded-lg border-l-4 border-[#6366F1] bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                  <p className="font-mono text-xs font-bold text-[#5B21B6]">
                    {idx === 0 ? "→ Contains: font history deep dive" : idx === 1 ? "⚠️ Physics accuracy: questionable" : "💡 Aha moments: 3+"}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <button className="flex items-center gap-2 text-sm font-bold text-[#6366F1] transition group-hover:gap-3">
                    Listen
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C4A6E] to-[#6B21A8] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="relative p-12 lg:p-16">
                {/* Floating annotation inside */}
                <div className="absolute right-8 top-8 rotate-3 rounded-lg border-2 border-dashed border-white/30 bg-white/10 p-2 backdrop-blur-sm">
                  <p className="font-mono text-xs font-black text-white">
                    ✓ START
                  </p>
                </div>

                <div className="mb-6 inline-block">
                  <BookOpen className="h-12 w-12 text-[#0891B2]" />
                </div>
                <h2 className="mb-6 font-black text-4xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  About the Podcast
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-blue-100">
                  Every week, Dan and AJ sit down to talk about whatever's on their
                  minds. Sometimes it's Minecraft redstone circuits. Sometimes it's
                  Greek mythology. Often it starts as one and ends as the other.
                </p>
                <p className="mb-8 leading-relaxed text-blue-200">
                  We're not experts. We're just two curious people who love learning,
                  making connections, and asking "wait, but why?" Think of it like
                  listening in on someone's really good study session.
                </p>

                {/* Connection diagram */}
                <div className="mb-6 space-y-2 rounded-xl border-2 border-dashed border-white/30 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <span className="font-mono font-bold">Dan (41)</span>
                    <span className="text-blue-300">+</span>
                    <span className="font-mono font-bold">AJ (11)</span>
                  </div>
                  <div className="ml-4 text-sm text-blue-200">
                    <ArrowRight className="mr-2 inline h-4 w-4" />
                    Curious conversations
                  </div>
                  <p className="mt-2 border-t border-white/20 pt-2 font-mono text-xs font-bold text-[#0891B2]">
                    // sparkle brain energy
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-mono text-sm font-bold text-white backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#0891B2]" />
                  New episodes weekly
                </div>
              </div>
              <div className="relative min-h-[400px] bg-gradient-to-br from-[#0891B2]/20 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="space-y-4">
                    {/* Diagram-style annotations */}
                    <div className="rotate-[-2deg] rounded-lg border-2 border-dashed border-white/50 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="font-mono text-xs font-bold text-white">
                        → Questions lead to more questions
                      </p>
                    </div>
                    <div className="ml-8 rotate-[1deg] rounded-lg border-2 border-dashed border-white/50 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="font-mono text-xs font-bold text-white">
                        ← Probably going off-topic
                      </p>
                    </div>
                    <div className="ml-4 rotate-[-1deg] rounded-lg border-2 border-dashed border-white/50 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="font-mono text-xs font-bold text-white">
                        ✓ Making unexpected connections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600">
              © 2026 Random Neural Firings • Made with curiosity
            </p>
            <div className="flex gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-[#0369A1]">Spotify</a>
              <a href="#" className="hover:text-[#0369A1]">Apple Podcasts</a>
              <a href="#" className="hover:text-[#0369A1]">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}