import { 
  ArrowLeft, 
  Zap, 
  Sparkles, 
  Check, 
  Copy,
  Circle,
  Play,
  Info,
  AlertCircle,
  Brain,
  Flame,
  Lightbulb,
  MessageCircle,
  HelpCircle,
  Rocket,
  Target,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function StyleGuidePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-purple-200 bg-gray-50 p-4 text-sm">
        <code className="font-mono text-gray-800">{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {copiedCode === id ? (
          <>
            <Check className="h-3 w-3" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> Copy
          </>
        )}
      </button>
    </div>
  );

  // Neural Spark Accent Colors with semantic meanings
  const accentColors = [
    {
      name: "Electric Cyan",
      value: "#06B6D4",
      hex: "#06B6D4",
      gradient: "from-[#06B6D4] to-[#3B82F6]",
      semantic: "Tech & Systems",
      usage: "Use for technical deep-dives, system thinking, infrastructure discussions",
      icon: <Zap className="h-5 w-5" />,
      examples: ["Code architecture", "Network effects", "Platform thinking"]
    },
    {
      name: "Bright Blue",
      value: "#3B82F6",
      hex: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
      semantic: "Big Ideas",
      usage: "Use for ambitious concepts, high-level thinking, visionary moments",
      icon: <Rocket className="h-5 w-5" />,
      examples: ["Future predictions", "What-if scenarios", "Grand theories"]
    },
    {
      name: "Hot Pink",
      value: "#EC4899",
      hex: "#EC4899",
      gradient: "from-[#EC4899] to-[#F43F5E]",
      semantic: "Creative & Playful",
      usage: "Use for creative expression, playful moments, artistic discussions",
      icon: <Sparkles className="h-5 w-5" />,
      examples: ["Art & design", "Creative process", "Playful tangents"]
    },
    {
      name: "Coral Red",
      value: "#F43F5E",
      hex: "#F43F5E",
      gradient: "from-[#F43F5E] to-[#F59E0B]",
      semantic: "Passion & Energy",
      usage: "Use for passionate debates, hot takes, energetic moments",
      icon: <Flame className="h-5 w-5" />,
      examples: ["Strong opinions", "Debates", "Controversial topics"]
    },
    {
      name: "Warm Amber",
      value: "#F59E0B",
      hex: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#F43F5E]",
      semantic: "Wisdom & Insight",
      usage: "Use for life lessons, philosophical moments, wisdom sharing",
      icon: <Lightbulb className="h-5 w-5" />,
      examples: ["Life lessons", "Philosophy", "Reflective moments"]
    },
    {
      name: "Lime Green",
      value: "#84CC16",
      hex: "#84CC16",
      gradient: "from-[#84CC16] to-[#10B981]",
      semantic: "Growth & Learning",
      usage: "Use for learning moments, skill development, growth mindset",
      icon: <Target className="h-5 w-5" />,
      examples: ["Skill building", "Education", "Personal growth"]
    },
    {
      name: "Emerald Green",
      value: "#10B981",
      hex: "#10B981",
      gradient: "from-[#10B981] to-[#06B6D4]",
      semantic: "Nature & Science",
      usage: "Use for science topics, natural world, analytical thinking",
      icon: <Brain className="h-5 w-5" />,
      examples: ["Biology", "Psychology", "Natural phenomena"]
    },
    {
      name: "Light Purple",
      value: "#C084FC",
      hex: "#C084FC",
      gradient: "from-[#C084FC] to-[#A855F7]",
      semantic: "Meta & Reflection",
      usage: "Use for meta-commentary, self-awareness, podcast about the podcast",
      icon: <MessageCircle className="h-5 w-5" />,
      examples: ["Meta discussions", "Self-reflection", "Process talk"]
    },
  ];

  // Foundation colors
  const foundationColors = [
    { name: "Deep Indigo", value: "#4C1D95", usage: "Primary dark backgrounds, headers" },
    { name: "Royal Purple", value: "#5B21B6", usage: "Primary CTAs, major UI elements" },
    { name: "Vibrant Purple", value: "#7C3AED", usage: "Interactive elements, hover states" },
    { name: "Soft Purple", value: "#A855F7", usage: "Accents, highlights, secondary elements" },
    { name: "Light Lavender", value: "#E9D5FF", usage: "Backgrounds, subtle accents" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-purple-100/40">
      {/* Header */}
      <header className="relative overflow-hidden border-b-4 border-purple-300 bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-6 py-12 text-white">
        {/* Animated background effects */}
        <div className="absolute left-1/4 top-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-[#A855F7]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-[#EC4899]/10 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-6 flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-2 border-white/30">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="font-black text-5xl mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Random Neural Firings
              </h1>
              <p className="text-xl text-purple-100">
                Complete Brand Style Guide
              </p>
            </div>
          </div>
          
          <p className="mt-4 max-w-3xl text-lg text-purple-100 leading-relaxed">
            The comprehensive visual identity system for <strong className="text-white">Twilight Thinking</strong> — 
            where deep purple foundations meet electric neural sparks, creating a brand that's smart but not smug, 
            energetic but not manic, and always making unexpected connections.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Table of Contents */}
        <section className="mb-16 rounded-2xl border-2 border-purple-300 bg-white p-8 shadow-lg">
          <h2 className="mb-6 font-black text-2xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            📋 Quick Navigation
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Brand Personality",
              "Color Philosophy",
              "Foundation Colors",
              "Neural Spark Accents",
              "Accent Usage Rules",
              "Typography",
              "Component Examples",
              "Annotations",
              "Do's and Don'ts"
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-900 transition hover:border-purple-400 hover:bg-purple-100"
              >
                <Circle className="h-2 w-2 fill-current text-purple-500" />
                {item}
              </a>
            ))}
          </div>
        </section>

        {/* Brand Personality */}
        <section id="brand-personality" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ✨ Brand Personality
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 shadow-md">
              <h3 className="mb-4 font-bold text-lg text-purple-900">Core Traits</h3>
              <ul className="space-y-3 text-sm text-purple-800">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Smart but not smug</strong>
                    <p className="text-purple-700 mt-1">Intelligent conversations without condescension</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Energetic but not manic</strong>
                    <p className="text-purple-700 mt-1">Vibrant and engaging without overwhelming</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Curious but not performative</strong>
                    <p className="text-purple-700 mt-1">Genuine interest, not trying to impress</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Playful nerd but not gamer bro</strong>
                    <p className="text-purple-700 mt-1">Nerdy enthusiasm that's inclusive</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-md">
              <h3 className="mb-4 font-bold text-lg text-purple-900">Energy & Vibe</h3>
              <ul className="space-y-3 text-sm text-purple-800">
                <li className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>ADHD / "sparkle brain" energy</strong>
                    <p className="text-purple-700 mt-1">Rapid connections, delightful tangents</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Super-powered curiosity</strong>
                    <p className="text-purple-700 mt-1">Always asking "but why?" and "what if?"</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Lightning-fast idea connections</strong>
                    <p className="text-purple-700 mt-1">Neural pathways firing at random</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div>
                    <strong>Excitement of getting a new book</strong>
                    <p className="text-purple-700 mt-1">Pure joy of discovery and learning</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Hosts */}
          <div className="mt-6 rounded-xl border-2 border-purple-300 bg-white p-8 shadow-md">
            <h3 className="mb-4 font-bold text-xl text-purple-900">The Hosts</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#7C3AED]" />
                  <h4 className="font-bold text-lg text-[#5B21B6]">Dan (Dad, 41)</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Loves asking "but why?" and has a tendency to connect everything back to something he learned in the 90s. 
                  Has never met a tangent he didn't like. Brings historical context and dad energy to every conversation.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-[#A855F7]" />
                  <h4 className="font-bold text-lg text-[#7C3AED]">AJ (Daughter, 11)</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  Super-powered curiosity, makes lightning-fast connections between seemingly unrelated ideas. 
                  The pattern-recognition engine is always running. Brings fresh perspective and boundless energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Philosophy */}
        <section id="color-philosophy" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            🎨 Color Philosophy
          </h2>
          
          <div className="mb-6 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 p-8 shadow-md">
            <h3 className="mb-4 font-bold text-xl text-purple-900">Twilight Thinking</h3>
            <p className="mb-4 text-base leading-relaxed text-purple-800">
              The palette expands beyond purple-pink to embrace the full spectrum of neural connections. 
              Think <strong>twilight sky meeting electric circuits</strong> — deep indigos and purples as the foundation, 
              with sparks of warm amber, cool cyan, and vibrant pink-red representing different types of ideas firing.
            </p>
            <div className="rounded-lg border-2 border-dashed border-purple-400 bg-white/60 p-4">
              <p className="font-mono text-sm font-bold text-purple-900">
                💜 Foundation: Purple spectrum (indigo → violet → lavender)
              </p>
              <p className="font-mono text-sm font-bold text-purple-900 mt-2">
                ⚡ Neural Sparks: 8 accent colors representing different idea types
              </p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md">
            <div className="mb-3 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600" />
              <h3 className="font-bold text-lg text-amber-900">The Golden Rule of Accent Colors</h3>
            </div>
            <p className="text-base leading-relaxed text-amber-800">
              <strong>Use accent colors like yelling</strong> — the more you do it, the less people listen. 
              Accent colors should be <strong>rare and intentional</strong>, appearing in only 4-6 strategic moments 
              per page to guide the eye and signal content types without overwhelming the core twilight aesthetic.
            </p>
            <div className="mt-4 rounded-lg border-l-4 border-amber-600 bg-white/80 p-4">
              <p className="text-sm font-bold text-amber-900">
                ✅ Good: 5 accent moments across an entire page<br/>
                ❌ Bad: Every element has a different accent color
              </p>
            </div>
          </div>
        </section>

        {/* Foundation Colors */}
        <section id="foundation-colors" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            🟣 Foundation Colors
          </h2>
          <p className="mb-6 text-base text-gray-700">
            These purple-spectrum colors form the core of every design. Use them extensively — they're the twilight sky that everything else exists within.
          </p>
          
          <div className="grid gap-4">
            {foundationColors.map((color, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border-2 border-purple-200 bg-white shadow-sm">
                <div className="grid md:grid-cols-[200px,1fr]">
                  <div 
                    className="flex items-center justify-center p-8"
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="text-center">
                      <div className="mb-2 font-mono text-sm font-bold text-white">
                        {color.value}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <h3 className="mb-2 font-bold text-lg text-gray-900">{color.name}</h3>
                    <p className="text-sm text-gray-600">{color.usage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Neural Spark Accents */}
        <section id="neural-spark-accents" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ⚡ Neural Spark Accent Colors
          </h2>
          <p className="mb-6 text-base text-gray-700">
            Eight carefully chosen accent colors, each with specific semantic meaning tied to podcast content types. 
            Use sparingly to create visual hierarchy and signal different kinds of intellectual moments.
          </p>
          
          <div className="grid gap-6">
            {accentColors.map((color, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md">
                <div className="grid lg:grid-cols-[240px,1fr]">
                  {/* Color swatch */}
                  <div 
                    className="relative flex flex-col items-center justify-center p-8"
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="mb-3 rounded-full bg-white/20 p-4 backdrop-blur-sm">
                      {color.icon && <div className="text-white">{color.icon}</div>}
                    </div>
                    <h3 className="mb-2 text-center font-bold text-xl text-white">{color.name}</h3>
                    <div className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                      <code className="font-mono text-xs font-bold text-white">{color.hex}</code>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500">Semantic Meaning</span>
                      </div>
                      <h4 className="mb-2 font-bold text-lg" style={{ color: color.value }}>{color.semantic}</h4>
                      <p className="text-sm leading-relaxed text-gray-700">{color.usage}</p>
                    </div>
                    
                    <div className="mb-4">
                      <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-gray-500">
                        Example Uses
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {color.examples.map((example, exIdx) => (
                          <span 
                            key={exIdx}
                            className="rounded-full border-2 px-3 py-1 text-xs font-medium"
                            style={{ 
                              borderColor: color.value,
                              backgroundColor: `${color.value}10`,
                              color: color.value
                            }}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-gray-500">
                        Gradient Class
                      </span>
                      <CodeBlock 
                        code={`bg-gradient-to-r ${color.gradient}`}
                        id={`gradient-${idx}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accent Usage Rules */}
        <section id="accent-usage-rules" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            📏 Accent Color Usage Rules
          </h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* DO */}
            <div className="rounded-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-emerald-500 p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-xl text-emerald-900">DO</h3>
              </div>
              <ul className="space-y-3 text-sm text-emerald-900">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Use <strong>4-6 accent moments</strong> per page maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Match accent colors to <strong>content semantics</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Keep <strong>purple as dominant</strong> (80%+ of color)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Use accents for <strong>annotations, badges, highlights</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Think of accents as <strong>strategic punctuation</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  <span>Reserve accents for <strong>important wayfinding</strong></span>
                </li>
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-xl border-2 border-rose-400 bg-gradient-to-br from-rose-50 to-red-50 p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-rose-500 p-2">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-xl text-rose-900">DON'T</h3>
              </div>
              <ul className="space-y-3 text-sm text-rose-900">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Use <strong>every accent color</strong> on one page</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Let accents <strong>compete with purple</strong> foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Use accents for <strong>decorative purposes only</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Scatter accents <strong>randomly without purpose</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Use accent colors in <strong>large backgrounds</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-600" />
                  <span>Mix multiple accents in <strong>one component</strong></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Strategic Placement Examples */}
          <div className="mt-6 rounded-xl border-2 border-purple-300 bg-white p-6 shadow-md">
            <h3 className="mb-4 font-bold text-lg text-purple-900">✨ Strategic Accent Placement</h3>
            <p className="mb-4 text-sm text-gray-700">Where to use accent colors for maximum impact:</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">Episode Badges</h4>
                <p className="text-xs text-purple-700">Category indicators for content type</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">Annotations</h4>
                <p className="text-xs text-purple-700">Highlight key moments or insights</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">Topic Tags</h4>
                <p className="text-xs text-purple-700">One accent per episode's primary theme</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">CTA Accents</h4>
                <p className="text-xs text-purple-700">Secondary actions needing attention</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">Timeline Markers</h4>
                <p className="text-xs text-purple-700">Segment type indicators</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-bold text-sm text-purple-900">Stat Highlights</h4>
                <p className="text-xs text-purple-700">Draw attention to key numbers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            📝 Typography
          </h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-lg text-purple-900">Display & Headings</h3>
              <div className="space-y-4">
                <div>
                  <span className="mb-2 block font-mono text-xs font-bold uppercase text-gray-500">Outfit</span>
                  <p className="font-black text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Making Connections
                  </p>
                  <p className="mt-1 text-xs text-gray-600">Used for all headings and display text</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-lg text-purple-900">Body & UI</h3>
              <div className="space-y-4">
                <div>
                  <span className="mb-2 block font-mono text-xs font-bold uppercase text-gray-500">Lexend</span>
                  <p className="text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
                    The quick brown fox jumps over the lazy dog. Dan and AJ make unexpected connections between completely unrelated topics.
                  </p>
                  <p className="mt-1 text-xs text-gray-600">Used for body text and UI elements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-lg text-purple-900">Type Scale</h3>
            <div className="space-y-3">
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">Hero</span>
                <p className="font-black text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Hero Text</p>
              </div>
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">H1</span>
                <p className="font-black text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Heading 1</p>
              </div>
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">H2</span>
                <p className="font-black text-3xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Heading 2</p>
              </div>
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">H3</span>
                <p className="font-bold text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Heading 3</p>
              </div>
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">Body</span>
                <p className="text-base">Regular body text for reading</p>
              </div>
              <div className="flex items-baseline gap-4 rounded border-l-4 border-purple-300 bg-purple-50 p-3">
                <span className="w-16 flex-shrink-0 font-mono text-xs font-bold text-gray-500">Small</span>
                <p className="text-sm">Smaller supporting text</p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section id="component-examples" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            🧩 Component Examples
          </h2>

          {/* Buttons */}
          <div className="mb-8 rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-lg text-purple-900">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105">
                <Play className="h-4 w-4 fill-current" />
                Primary CTA
              </button>
              <button className="flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-6 py-3 font-bold text-purple-900 transition hover:bg-purple-50">
                Secondary Action
              </button>
              <button className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-purple-900 backdrop-blur-sm transition hover:bg-white/20">
                Ghost Button
              </button>
            </div>
          </div>

          {/* Badges with Accents */}
          <div className="mb-8 rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-lg text-purple-900">Badges (with Accent Colors)</h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                <Zap className="h-3 w-3" />
                Tech Deep-Dive
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F43F5E] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                <Lightbulb className="h-3 w-3" />
                Life Lesson
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                <Brain className="h-3 w-3" />
                Science Topic
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#A855F7] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                Latest
              </span>
            </div>
          </div>

          {/* Annotations */}
          <div className="mb-8 rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-lg text-purple-900">Annotations (Strategic Accent Use)</h3>
            <div className="space-y-4">
              <div className="rounded-xl border-2 border-cyan-400 bg-cyan-50 p-4 shadow-sm">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-cyan-700">
                  💻 Tech Deep-Dive
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  We go deep into system architecture and how networks actually work.
                </p>
              </div>
              <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-amber-700">
                  💡 Wisdom Moment
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Life lesson alert: Sometimes the journey is more important than the destination.
                </p>
              </div>
              <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-4 shadow-sm">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-emerald-700">
                  🧬 Science Corner
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Breaking down the biology and psychology behind this phenomenon.
                </p>
              </div>
            </div>
          </div>

          {/* Episode Cards */}
          <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-lg text-purple-900">Episode Card Example</h3>
            <div className="rounded-2xl border-2 border-purple-200 bg-white shadow-lg">
              <div className="h-2 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]" />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-600">
                    Episode 47
                  </span>
                  <span className="font-mono text-xs text-slate-400">48:32</span>
                </div>
                <h3 className="mb-3 font-bold text-xl leading-tight text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  From Mario Kart to Mythology: The Unexpected Journey
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  What started as AJ explaining Rainbow Road strategy somehow became a deep dive into Greek mythology.
                </p>
                
                {/* Accent annotation - STRATEGIC USE */}
                <div className="rounded-lg border-l-4 border-[#10B981] bg-emerald-50 p-3 shadow-sm">
                  <p className="font-mono text-xs font-bold text-emerald-700">
                    🧬 Contains mythology & psychology discussion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Annotations Guide */}
        <section id="annotations" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            📌 Annotation System
          </h2>
          
          <div className="mb-6 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 shadow-md">
            <h3 className="mb-3 font-bold text-lg text-purple-900">What are Annotations?</h3>
            <p className="text-sm leading-relaxed text-purple-800">
              Annotations are small callout boxes that add personality, highlight key moments, or provide meta-commentary. 
              They're like sticky notes on the page — informal, playful, and helpful. Think of them as the sparkle brain's 
              way of saying "hey, pay attention to this!"
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-base text-purple-900">Purple Foundation Annotations</h3>
              <p className="mb-4 text-xs text-gray-600">Use for general notes, reminders, and standard callouts</p>
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-3">
                  <p className="font-mono text-xs font-black text-[#5B21B6]">📝 Note</p>
                  <p className="mt-1 text-sm text-slate-700">This is a general annotation</p>
                </div>
                <div className="rotate-[-2deg] rounded-xl border-2 border-dashed border-[#A855F7] bg-gradient-to-br from-white to-purple-50 p-3 shadow-md">
                  <p className="font-mono text-xs font-black text-[#5B21B6]">💡 Fun fact!</p>
                  <p className="mt-1 text-sm text-slate-700">Floating annotation style</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-base text-purple-900">Accent Color Annotations</h3>
              <p className="mb-4 text-xs text-gray-600">Use strategically to signal specific content types</p>
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-cyan-400 bg-cyan-50 p-3">
                  <p className="font-mono text-xs font-black text-cyan-700">💻 Tech Topic</p>
                  <p className="mt-1 text-sm text-slate-700">Systems thinking ahead</p>
                </div>
                <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
                  <p className="font-mono text-xs font-black text-amber-700">💡 Wisdom Drop</p>
                  <p className="mt-1 text-sm text-slate-700">Philosophical moment incoming</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts with Visual Examples */}
        <section id="dos-and-donts" className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ✅ Do's and ❌ Don'ts
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Good Example */}
            <div className="rounded-xl border-4 border-emerald-500 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-emerald-500 p-2">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-emerald-900">Good Example</h3>
              </div>
              <p className="mb-4 text-sm text-emerald-800">
                <strong>Purple dominant, strategic accent use</strong>
              </p>
              
              <div className="space-y-3 rounded-lg border-2 border-emerald-200 bg-emerald-50/30 p-4">
                {/* Simulated good design */}
                <div className="h-2 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5B21B6] to-[#A855F7]" />
                  <div className="h-4 w-32 rounded bg-purple-300" />
                </div>
                <div className="h-3 w-full rounded bg-purple-200" />
                <div className="h-3 w-5/6 rounded bg-purple-200" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-purple-300" />
                  <div className="h-6 w-20 rounded-full bg-purple-300" />
                </div>
                {/* ONE strategic accent */}
                <div className="rounded border-l-4 border-cyan-400 bg-cyan-50 p-2">
                  <div className="h-2 w-24 rounded bg-cyan-400" />
                </div>
              </div>
              
              <ul className="mt-4 space-y-2 text-xs text-emerald-900">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>Purple foundation throughout</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>One accent annotation for emphasis</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>Clear visual hierarchy</span>
                </li>
              </ul>
            </div>

            {/* Bad Example */}
            <div className="rounded-xl border-4 border-rose-500 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-rose-500 p-2">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-rose-900">Bad Example</h3>
              </div>
              <p className="mb-4 text-sm text-rose-800">
                <strong>Too many accents competing</strong>
              </p>
              
              <div className="space-y-3 rounded-lg border-2 border-rose-200 bg-rose-50/30 p-4">
                {/* Simulated bad design - rainbow chaos */}
                <div className="h-2 bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-lime-400" />
                  <div className="h-4 w-32 rounded bg-purple-300" />
                </div>
                <div className="h-3 w-full rounded bg-blue-300" />
                <div className="h-3 w-5/6 rounded bg-pink-300" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-cyan-400" />
                  <div className="h-6 w-20 rounded-full bg-amber-400" />
                  <div className="h-6 w-16 rounded-full bg-rose-400" />
                </div>
                {/* Multiple competing accents */}
                <div className="rounded border-l-4 border-emerald-400 bg-emerald-50 p-2">
                  <div className="h-2 w-24 rounded bg-emerald-400" />
                </div>
                <div className="rounded border-l-4 border-pink-400 bg-pink-50 p-2">
                  <div className="h-2 w-20 rounded bg-pink-400" />
                </div>
              </div>
              
              <ul className="mt-4 space-y-2 text-xs text-rose-900">
                <li className="flex gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span>Too many different colors</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span>Accents competing for attention</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600" />
                  <span>Purple no longer dominant</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Summary */}
        <section className="rounded-2xl border-4 border-purple-400 bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] p-12 text-white shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="mb-4 font-black text-3xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Remember the Core Principle
              </h2>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-purple-100">
                <strong className="text-white">Purple is the twilight sky.</strong> It's always there, always dominant. 
                Accent colors are like stars — beautiful and memorable precisely because there aren't too many. 
                Use them sparingly, intentionally, and with semantic purpose.
              </p>
              <div className="rounded-xl border-2 border-white/30 bg-white/10 p-6 backdrop-blur-sm">
                <p className="font-mono text-sm font-bold text-white">
                  "Use accent colors like yelling — the more you do it, the less people listen."
                </p>
                <p className="mt-2 text-sm text-purple-200">
                  — The Golden Rule of Random Neural Firings Design
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
