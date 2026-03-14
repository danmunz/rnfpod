import { Zap, Play, TrendingUp, Sparkles, ArrowRight, Radio } from 'lucide-react';

export function KineticEnergySite() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Sticky header with energy */}
      <header className="sticky top-0 z-50 border-b-4 border-[#DC2626] bg-white shadow-lg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DC2626] via-[#EA580C] to-[#F59E0B] shadow-lg shadow-orange-500/50">
                  <Zap className="h-7 w-7 fill-white text-white" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#F59E0B]"></span>
                </div>
              </div>
              <div>
                <h1 className="font-black text-xl tracking-tight text-slate-900">
                  RANDOM NEURAL FIRINGS
                </h1>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#DC2626]">
                  ⚡ Live Every Week
                </p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#" className="font-bold text-sm text-slate-700 transition hover:text-[#DC2626]">
                LISTEN
              </a>
              <a href="#" className="font-bold text-sm text-slate-700 transition hover:text-[#DC2626]">
                EPISODES
              </a>
              <a href="#" className="font-bold text-sm text-slate-700 transition hover:text-[#DC2626]">
                ABOUT
              </a>
              <button className="rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EA580C] px-5 py-2.5 font-black text-sm text-white shadow-lg shadow-red-500/30 transition hover:shadow-xl hover:shadow-red-500/40">
                SUBSCRIBE
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Big energy, diagonal split */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#DC2626] via-[#EA580C] to-[#F59E0B]">
        {/* Diagonal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-40 w-40 animate-pulse rounded-full bg-white/10 blur-3xl delay-700" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.3fr,1fr] lg:gap-20">
            {/* Left - Text */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm w-fit">
                <div className="flex h-2 w-2 animate-pulse rounded-full bg-[#FCD34D]" />
                <span className="font-black text-xs uppercase tracking-widest text-white">
                  New Episode Every Tuesday
                </span>
              </div>

              <h1 className="mb-8 font-black text-7xl leading-[0.85] text-white lg:text-8xl">
                BRAIN
                <br />
                <span className="italic text-[#FCD34D]">SPARKS</span>
                <br />
                FLYING
              </h1>

              <p className="mb-10 max-w-xl text-2xl font-bold leading-snug text-orange-100">
                Dan (dad) + AJ (11-year-old genius) making lightning-fast connections
                between totally random topics.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 font-black text-lg text-[#DC2626] shadow-2xl transition hover:scale-105">
                  <Play className="h-6 w-6 fill-current transition group-hover:scale-110" />
                  LISTEN NOW
                </button>
                <button className="flex items-center gap-2 rounded-2xl border-3 border-white bg-transparent px-8 py-5 font-black text-lg text-white backdrop-blur-sm transition hover:bg-white/10">
                  SEE ALL EPISODES
                  <TrendingUp className="h-5 w-5" />
                </button>
              </div>

              {/* Quick stats */}
              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <div className="font-black text-4xl text-white">47</div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-orange-200">
                    Episodes
                  </div>
                </div>
                <div>
                  <div className="font-black text-4xl text-white">∞</div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-orange-200">
                    Tangents
                  </div>
                </div>
                <div>
                  <div className="font-black text-4xl text-white">2</div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-orange-200">
                    Curious Minds
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Image card with tilt */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md rotate-3 transition hover:rotate-0">
                <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1605185702350-e5e02808da0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwZGVzayUyMHdvcmtzcGFjZSUyMG92ZXJoZWFkfGVufDF8fHx8MTc2NzY4MTE0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Workspace"
                    className="w-full"
                  />
                  <div className="bg-white p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                        ⚡ Latest Episode
                      </span>
                      <span className="font-mono text-xs text-slate-500">EP 47</span>
                    </div>
                    <h3 className="font-black text-xl text-slate-900">
                      "Comic Sans: Hero or Villain?"
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      A surprisingly passionate debate about typography.
                    </p>
                  </div>
                </div>
                {/* Sticker-style badge */}
                <div className="absolute -right-6 -top-6 rotate-12 rounded-2xl bg-[#FCD34D] px-4 py-3 font-black text-sm text-slate-900 shadow-xl">
                  HOT!
                  <br />
                  🔥
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connection Showcase - Dynamic cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-black text-6xl text-slate-900">
              Making Weird Connections
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Watch us jump from topic to topic like our brains are playing hopscotch
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                start: "Minecraft Redstone",
                end: "How Brains Learn",
                color: "from-[#DC2626] to-[#BE123C]",
                time: "15 min",
                ep: 46
              },
              {
                start: "Rainbow Road",
                end: "Greek Mythology",
                color: "from-[#EA580C] to-[#DC2626]",
                time: "8 min",
                ep: 44
              },
              {
                start: "The Sims",
                end: "Maslow's Hierarchy",
                color: "from-[#F59E0B] to-[#EA580C]",
                time: "12 min",
                ep: 45
              }
            ].map((connection, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-2xl"
              >
                <div className={`h-2 bg-gradient-to-r ${connection.color}`} />
                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-600">
                      EP {connection.ep}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#DC2626]">
                      {connection.time} ⚡
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                        Started with
                      </p>
                      <p className="mt-1 font-black text-lg text-slate-900">
                        {connection.start}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="rounded-full bg-gradient-to-br from-[#DC2626] to-[#F59E0B] p-3">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                        Ended with
                      </p>
                      <p className="mt-1 font-black text-lg text-slate-900">
                        {connection.end}
                      </p>
                    </div>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-slate-800">
                    Listen to Journey
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Energetic cards */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-black text-6xl">
              Meet the
              <br />
              <span className="bg-gradient-to-r from-[#DC2626] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent">
                Neural Firers
              </span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Dan */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-8 transition hover:border-[#DC2626]">
              <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DC2626] to-[#EA580C] font-black text-3xl text-white shadow-lg">
                D
              </div>
              
              <h3 className="mb-2 font-black text-4xl">Dan</h3>
              <p className="mb-6 font-mono text-sm font-bold uppercase tracking-wider text-slate-400">
                Dad • 41 • "But actually..."
              </p>

              <p className="mb-6 text-lg leading-relaxed text-slate-300">
                Never met a topic he couldn't connect back to the 90s. Asks "but why?"
                way too often. Loves learning from his daughter.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Curiosity", "90s Kid", "Question Asker"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AJ */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-8 transition hover:border-[#F59E0B]">
              <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#F59E0B] font-black text-3xl text-slate-900 shadow-lg">
                AJ
              </div>
              
              <h3 className="mb-2 font-black text-4xl">AJ</h3>
              <p className="mb-6 font-mono text-sm font-bold uppercase tracking-wider text-slate-400">
                Daughter • 11 • Sparkle Brain ⚡
              </p>

              <p className="mb-6 text-lg leading-relaxed text-slate-300">
                Makes connections faster than you can keep up. Super-powered curiosity
                meets lightning-fast thinking. Frequently the teacher.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Pattern Finder", "Quick Thinker", "Game Expert"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* The Vibe */}
          <div className="mt-12 overflow-hidden rounded-3xl border-2 border-[#F59E0B] bg-gradient-to-br from-[#DC2626] via-[#EA580C] to-[#F59E0B] p-12 text-center shadow-2xl">
            <Sparkles className="mx-auto mb-6 h-16 w-16 text-white" />
            <h3 className="mb-4 font-black text-4xl text-white">The Vibe</h3>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-orange-100">
              That feeling when you get a new book you've been excited about. Not an
              energy drink – the good kind of energy. Curious, fast, warm, and a little
              chaotic (in the best way).
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Radio className="mx-auto mb-6 h-20 w-20 text-[#DC2626]" />
          <h2 className="mb-6 font-black text-6xl text-slate-900">
            Ready to Listen?
          </h2>
          <p className="mb-10 text-xl text-slate-600">
            New episodes every Tuesday. Subscribe on your favorite platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Spotify", "Apple Podcasts", "Google Podcasts", "RSS"].map((platform, idx) => (
              <button
                key={idx}
                className="rounded-xl border-2 border-slate-900 bg-white px-8 py-4 font-black text-slate-900 shadow-lg transition hover:bg-slate-900 hover:text-white"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 font-black text-xl">RANDOM NEURAL FIRINGS</h3>
              <p className="font-mono text-sm text-slate-400">
                © 2026 • Made with ⚡ and curiosity
              </p>
            </div>
            <div className="flex gap-6 font-mono text-sm font-bold">
              <a href="#" className="text-[#F59E0B] transition hover:text-[#DC2626]">SPOTIFY</a>
              <a href="#" className="text-[#F59E0B] transition hover:text-[#DC2626]">APPLE</a>
              <a href="#" className="text-[#F59E0B] transition hover:text-[#DC2626]">GOOGLE</a>
              <a href="#" className="text-[#F59E0B] transition hover:text-[#DC2626]">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
