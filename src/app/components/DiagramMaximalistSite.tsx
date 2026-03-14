import { ArrowRight, ArrowUpRight, ChevronRight, Circle, HelpCircle } from 'lucide-react';

export function DiagramMaximalistSite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F3E8FF]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Header - Hand-drawn style with gradient */}
      <header className="border-b-2 border-dashed border-[#0891B2] bg-gradient-to-r from-white via-blue-50 to-indigo-50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-4 border-[#0369A1] bg-gradient-to-br from-[#0891B2] via-[#6366F1] to-[#8B5CF6] shadow-lg shadow-blue-500/30" />
                <div className="absolute -right-1 -top-1 rotate-12 rounded bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] px-2 py-0.5 font-mono text-[10px] font-black text-white shadow-md">
                  ⚡
                </div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-[#0C4A6E] to-[#6B21A8] bg-clip-text font-black text-2xl text-transparent" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Random Neural Firings
                </h1>
                <p className="font-mono text-xs font-bold text-[#0369A1]">← Probably off-topic already</p>
              </div>
            </div>
            <nav className="flex gap-6 text-sm font-bold text-slate-700">
              <a href="#" className="relative transition hover:text-[#0369A1]">
                Episodes
                <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#0369A1] to-[#6366F1] transition-all hover:w-full" />
              </a>
              <a href="#" className="relative transition hover:text-[#0369A1]">About</a>
              <a href="#" className="relative transition hover:text-[#0369A1]">Subscribe</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Diagram Style Layout with Photography */}
      <section className="relative overflow-hidden py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-purple-100/50" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
            {/* Left - Main Content with Annotations */}
            <div className="relative">
              {/* Annotation above */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-[#6366F1] bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 shadow-md">
                <ArrowUpRight className="h-4 w-4 text-[#6366F1]" />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#5B21B6]">
                  Start Here
                </span>
              </div>

              <h1 className="mb-6 font-black text-7xl leading-[0.9] text-slate-900 lg:text-8xl">
                <span className="bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#0891B2] bg-clip-text text-transparent">
                  Questions
                </span>
                <br />
                lead to
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                    more questions
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="16"
                    viewBox="0 0 300 16"
                    fill="none"
                  >
                    <path
                      d="M2 8 Q 75 2, 150 8 T 298 8"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0369A1" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-xl font-medium leading-relaxed text-slate-700">
                <strong className="font-black text-[#0C4A6E]">Dan (41)</strong> and{" "}
                <strong className="font-black text-[#6B21A8]">AJ (11)</strong> having rambling 
                conversations about nerdy topics, life, and random interesting ideas. Like margin 
                notes in the perfect textbook, but in podcast form.
              </p>

              {/* Arrow diagram - more colorful */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border-2 border-[#0369A1] bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 font-mono text-sm font-black text-[#0C4A6E] shadow-md">
                    Start with: Minecraft
                  </div>
                  <ArrowRight className="h-6 w-6 text-[#0891B2]" />
                  <HelpCircle className="h-5 w-5 text-[#6366F1]" />
                </div>
                <div className="ml-8 flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-[#8B5CF6]" />
                  <div className="rounded-full border-2 border-dashed border-[#8B5CF6] bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 font-mono text-sm font-bold text-[#5B21B6] shadow-sm">
                    somehow end up at: Philosophy of learning
                  </div>
                </div>
                <div className="ml-16 rounded-lg border-l-4 border-[#6366F1] bg-gradient-to-r from-indigo-100 to-purple-100 p-3 shadow-md">
                  <p className="font-mono text-xs font-black uppercase tracking-wide text-[#5B21B6]">
                    ⚠️ NOTE: This made perfect sense at the time
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-gradient-to-r from-[#0369A1] via-[#0891B2] to-[#6366F1] px-8 py-4 font-black text-white shadow-xl shadow-blue-500/40 transition hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                  Listen to Latest Episode
                </button>
                <button className="rounded-full border-2 border-slate-900 bg-white px-8 py-4 font-black text-slate-900 shadow-lg transition hover:bg-slate-900 hover:text-white">
                  Browse Archive
                </button>
              </div>
            </div>

            {/* Right - Annotated Diagram Box with Image */}
            <div className="relative">
              {/* Main box with gradient background */}
              <div className="overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-white to-blue-50 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.4)]">
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1712762056200-50d8f803ba10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBjb2xvcmZ1bCUyMG5vdGVzfGVufDF8fHx8MTc2NzY4MTk1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Study notes"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-black text-2xl text-white">
                        Episode 47
                      </h3>
                      <div className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] px-3 py-1 font-mono text-xs font-black text-white shadow-lg">
                        NEW
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="mb-4 font-black text-xl leading-tight text-[#0C4A6E]">
                    "Wait, so Comic Sans is... Good?"
                    <br />
                    <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                      A Typography Investigation
                    </span>
                  </h4>

                  <p className="mb-6 font-medium text-sm leading-relaxed text-slate-700">
                    AJ discovers fonts exist and Dan tries to explain the 90s. We debate
                    whether Comic Sans deserves its reputation and end up in a surprisingly
                    deep conversation about accessibility.
                  </p>

                  {/* Tags with gradients */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="rounded-full border-2 border-[#0891B2] bg-gradient-to-r from-cyan-100 to-blue-100 px-3 py-1 font-mono text-xs font-black text-[#0C4A6E] shadow-sm">
                      design
                    </span>
                    <span className="rounded-full border-2 border-[#6366F1] bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 font-mono text-xs font-black text-[#5B21B6] shadow-sm">
                      history
                    </span>
                    <span className="rounded-full border-2 border-[#8B5CF6] bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 font-mono text-xs font-black text-[#6B21A8] shadow-sm">
                      hot takes
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 font-mono text-sm font-black text-[#0369A1]">
                      <Circle className="h-3 w-3 fill-current" />
                      PLAY
                    </button>
                    <span className="font-mono text-xs font-bold text-slate-500">42:18</span>
                  </div>
                </div>
              </div>

              {/* Floating annotations - more colorful */}
              <div className="absolute -right-4 top-12 rotate-3 rounded-lg border-2 border-dashed border-[#6366F1] bg-gradient-to-br from-indigo-100 to-purple-100 p-3 shadow-xl">
                <p className="font-mono text-xs font-black text-[#5B21B6]">
                  IMPORTANT<br />(maybe)
                </p>
              </div>

              <div className="absolute -left-6 bottom-20 -rotate-2 rounded-lg border-2 border-[#0891B2] bg-gradient-to-br from-cyan-100 to-blue-100 p-3 shadow-xl">
                <p className="font-mono text-xs font-black text-[#0C4A6E]">
                  ← wait, go back
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative circles - more visible */}
        <div className="absolute left-20 top-40 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-20 right-20 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/40 to-indigo-200/40 blur-3xl" />
      </section>

      {/* Recent Episodes - Card Grid with Photos and Gradients */}
      <section className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#6366F1] bg-clip-text font-black text-5xl text-transparent">
                Recent Episodes
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0891B2] to-[#6366F1]" />
                <span className="font-mono text-sm font-bold text-[#6366F1]">
                  // Scroll for more
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                num: 46,
                title: "Redstone = Electronics? (An Investigation)",
                desc: "AJ teaches Dan about Minecraft circuits. Somehow becomes a conversation about how brains learn.",
                topics: ["minecraft", "logic", "learning"],
                note: "Contains: 3 aha moments",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                num: 45,
                title: "The Sims Are Just... Humans",
                desc: "Starting with Sims traits, ending with Maslow's hierarchy and game design philosophy.",
                topics: ["gaming", "psychology", "design"],
                note: "Probably too philosophical",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                num: 44,
                title: "Rainbow Road → Greek Mythology",
                desc: "This made sense at the time. Really. We promise.",
                topics: ["gaming", "mythology", "narrative"],
                note: "⚡ 8 minute journey",
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((ep, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-xl border-3 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.6)]"
              >
                {/* Gradient top bar */}
                <div className={`h-3 bg-gradient-to-r ${ep.gradient}`} />

                {/* Corner number - more prominent */}
                <div className={`absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-900 bg-gradient-to-br ${ep.gradient} font-black text-2xl text-white shadow-xl`}>
                  {ep.num}
                </div>

                <div className="p-6">
                  <h3 className="mb-3 mt-4 font-black text-xl leading-tight text-slate-900">
                    {ep.title}
                  </h3>

                  <p className="mb-4 font-medium text-sm leading-relaxed text-slate-700">
                    {ep.desc}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {ep.topics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border-2 border-[#0891B2] bg-gradient-to-r from-cyan-100 to-blue-100 px-3 py-1 font-mono text-xs font-bold text-[#0C4A6E] shadow-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Annotation - gradient background */}
                  <div className="rounded-lg border-l-4 border-[#0369A1] bg-gradient-to-r from-blue-100 to-indigo-100 p-3 shadow-sm">
                    <p className="font-mono text-xs font-black text-[#0C4A6E]">
                      📝 {ep.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About - With Photography */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(99,102,241,0.4)]">
                <img
                  src="https://images.unsplash.com/photo-1763306934305-39de4bbf19d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2slMjBvdmVyaGVhZHxlbnwxfHx8fDE3Njc2ODE5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Workspace"
                  className="w-full"
                />
              </div>

              {/* Floating annotations on image */}
              <div className="absolute -right-4 top-12 rotate-3 rounded-lg border-2 border-[#6366F1] bg-gradient-to-br from-white to-indigo-100 p-3 shadow-xl">
                <p className="font-mono text-xs font-black text-[#5B21B6]">
                  📚 Study mode: ON
                </p>
              </div>

              <div className="absolute -left-4 bottom-12 -rotate-2 rounded-lg border-2 border-dashed border-[#0891B2] bg-gradient-to-br from-white to-cyan-100 p-4 shadow-xl">
                <p className="font-mono text-xs font-black text-[#0C4A6E]">
                  "Wait—this connects to..."
                </p>
              </div>
            </div>

            {/* Right - Text with gradients */}
            <div className="relative rounded-3xl border-4 border-dashed border-[#0891B2] bg-gradient-to-br from-white via-blue-50 to-purple-50 p-12 shadow-xl">
              {/* Corner label */}
              <div className="absolute -left-4 -top-4 rotate-[-5deg] rounded-lg border-2 border-[#6366F1] bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 font-mono text-xs font-black text-[#5B21B6] shadow-lg">
                START HERE ↓
              </div>

              <h2 className="mb-6 bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#6B21A8] bg-clip-text font-black text-5xl text-transparent">
                About This Whole Thing
              </h2>

              <div className="space-y-6 text-lg font-medium leading-relaxed text-slate-700">
                <p>
                  <strong className="bg-gradient-to-r from-[#0369A1] to-[#0891B2] bg-clip-text font-black text-transparent">
                    Dan
                  </strong>{" "}
                  is 41, a dad, and has never met a topic he couldn't connect back to 
                  something from the 90s. Has been known to say "but actually..." more 
                  than is socially acceptable.
                </p>

                <div className="relative my-8 rounded-lg border-l-4 border-[#6366F1] bg-gradient-to-r from-indigo-100 to-purple-100 p-4 shadow-md">
                  <p>
                    <strong className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text font-black text-transparent">
                      AJ
                    </strong>{" "}
                    is 11, has super-powered curiosity, and makes connections faster than 
                    most people can keep up with. Frequently teaches Dan things he should 
                    probably already know.
                  </p>
                  <div className="absolute -right-4 top-0 rotate-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] px-3 py-1 font-mono text-xs font-black text-white shadow-lg">
                    ← The smart one
                  </div>
                </div>

                <p>
                  Together, they explore everything from video game mechanics to ancient
                  mythology, from typography to the philosophy of learning. Sometimes the
                  episodes go exactly as planned. Usually they don't. Always they're curious.
                </p>
              </div>

              {/* Bottom annotation with gradient */}
              <div className="mt-8 flex items-center gap-4 rounded-xl border-3 border-slate-900 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 p-6 shadow-lg">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0369A1] via-[#0891B2] to-[#6366F1] font-mono text-3xl text-white shadow-lg">
                  ?
                </div>
                <div>
                  <p className="font-mono text-xs font-black uppercase tracking-wider text-[#6366F1]">
                    The Vibe
                  </p>
                  <p className="mt-1 font-black text-sm text-slate-900">
                    Like finding the perfect study guide where someone already annotated
                    all the interesting connections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background circles - more colorful and visible */}
        <div className="absolute left-10 top-10 -z-10 h-40 w-40 rounded-full border-4 border-dashed border-[#0891B2] bg-gradient-to-br from-cyan-200/30 to-blue-200/30 blur-sm" />
        <div className="absolute bottom-20 right-10 -z-10 h-60 w-60 rounded-full border-4 border-dashed border-[#6366F1] bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-sm" />
      </section>

      {/* Footer with gradient */}
      <footer className="border-t-4 border-dashed border-[#0891B2] bg-gradient-to-br from-[#0C4A6E] via-[#0369A1] to-[#6B21A8] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 font-black text-xl">Random Neural Firings</h3>
              <p className="font-mono text-sm text-blue-200">
                © 2026 • Made with curiosity (and probably too many tangents)
              </p>
            </div>
            <div className="flex gap-6 font-mono text-sm font-bold">
              <a href="#" className="text-[#0891B2] transition hover:text-white hover:underline">Spotify</a>
              <a href="#" className="text-[#0891B2] transition hover:text-white hover:underline">Apple</a>
              <a href="#" className="text-[#0891B2] transition hover:text-white hover:underline">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}