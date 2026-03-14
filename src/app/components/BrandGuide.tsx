import { Play, Sparkles, ArrowRight, Check, Copy, ArrowLeft, X } from "lucide-react";
import { useState } from "react";

export function BrandGuide({ onNavigateHome }: { onNavigateHome: () => void }) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-purple-200 bg-gradient-to-r from-[#4C1D95] to-[#5B21B6] px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={onNavigateHome}
            className="mb-6 flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </button>
          <h1 className="mb-4 font-black text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Random Neural Firings
          </h1>
          <p className="max-w-2xl text-xl text-purple-100">
            Brand Guide & Component Library
          </p>
          <p className="mt-2 text-sm text-purple-200">
            Visual identity for the Twilight Thinking design concept
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Brand Overview */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Brand Overview
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">Personality</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• Smart but not smug</li>
                <li>• Energetic but not manic</li>
                <li>• Curious but not performative</li>
                <li>• Playful nerd but not gamer bro</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">Energy</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• ADHD / "sparkle brain" vibes</li>
                <li>• Super-powered curiosity</li>
                <li>• Lightning-fast idea connections</li>
                <li>• Excitement of getting a new book</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Color System */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Color System
          </h2>
          
          <div className="mb-8 rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
            <h3 className="mb-3 font-bold text-lg text-purple-900">Design Philosophy</h3>
            <p className="text-sm leading-relaxed text-purple-800">
              The palette expands beyond purple-pink to embrace the full spectrum of neural connections. 
              Think twilight sky meeting electric circuits—deep indigos and purples as the foundation, 
              with sparks of warm amber, cool cyan, and vibrant pink-red representing different types of ideas firing.
            </p>
          </div>
          
          <h3 className="mb-4 font-bold text-xl text-gray-800">Foundation Colors</h3>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#1E1B4B] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#1E1B4B</p>
              <p className="text-xs text-gray-600">Deep Indigo - Deepest backgrounds</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#312E81] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#312E81</p>
              <p className="text-xs text-gray-600">Dark Violet - Secondary dark</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#4C1D95] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#4C1D95</p>
              <p className="text-xs text-gray-600">Deep Purple - Primary dark</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#5B21B6] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#5B21B6</p>
              <p className="text-xs text-gray-600">Violet - Primary brand</p>
            </div>
          </div>

          <h3 className="mb-4 font-bold text-xl text-gray-800">Accent Colors - Neural Spark Palette</h3>
          <p className="mb-4 text-sm text-gray-700">Each color represents a different type of "firing" or connection</p>
          
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Electric Cyan - Logic & Analysis */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#06B6D4] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#06B6D4</p>
              <p className="text-xs font-bold text-cyan-700">Electric Cyan</p>
              <p className="text-xs text-gray-600">Logic circuits • Technical topics</p>
            </div>
            
            {/* Bright Blue - Ideas & Wonder */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#3B82F6] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#3B82F6</p>
              <p className="text-xs font-bold text-blue-700">Bright Blue</p>
              <p className="text-xs text-gray-600">Curiosity • Wonder • Questions</p>
            </div>
            
            {/* Hot Pink - Energy & Excitement */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#EC4899] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#EC4899</p>
              <p className="text-xs font-bold text-pink-700">Hot Pink</p>
              <p className="text-xs text-gray-600">Energy • Aha moments • Excitement</p>
            </div>
            
            {/* Coral Red - Passion & Intensity */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#F43F5E] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#F43F5E</p>
              <p className="text-xs font-bold text-rose-700">Coral Red</p>
              <p className="text-xs text-gray-600">Passion • Intensity • Drama</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Amber - Warmth & Insight */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#F59E0B] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#F59E0B</p>
              <p className="text-xs font-bold text-amber-700">Warm Amber</p>
              <p className="text-xs text-gray-600">Insights • Warmth • Discovery</p>
            </div>
            
            {/* Lime Green - Growth & Learning */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#84CC16] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#84CC16</p>
              <p className="text-xs font-bold text-lime-700">Lime Green</p>
              <p className="text-xs text-gray-600">Growth • Learning • Progress</p>
            </div>
            
            {/* Emerald - Connection Made */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#10B981] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#10B981</p>
              <p className="text-xs font-bold text-emerald-700">Emerald Green</p>
              <p className="text-xs text-gray-600">Connections made • Success</p>
            </div>
            
            {/* Light Purple - Soft highlights */}
            <div className="space-y-2">
              <div className="h-24 rounded-lg border-2 border-gray-200 bg-[#A855F7] shadow-md"></div>
              <p className="font-mono text-sm font-bold text-gray-900">#A855F7</p>
              <p className="text-xs font-bold text-purple-700">Light Purple</p>
              <p className="text-xs text-gray-600">Subtle energy • Highlights</p>
            </div>
          </div>

          <h3 className="mb-4 font-bold text-xl text-gray-800">Usage Guidelines</h3>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#06B6D4]"></div>
                <p className="font-bold text-sm text-cyan-900">Cyan & Blue</p>
              </div>
              <p className="text-xs text-cyan-800">
                Use for technical topics, logic-based segments, coding/Minecraft episodes, analytical content
              </p>
            </div>
            
            <div className="rounded-lg border-2 border-pink-200 bg-pink-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#EC4899]"></div>
                <p className="font-bold text-sm text-pink-900">Pink & Red</p>
              </div>
              <p className="text-xs text-pink-800">
                Use for excitement, aha moments, energy bursts, passionate discussions, dramatic reveals
              </p>
            </div>
            
            <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#F59E0B]"></div>
                <p className="font-bold text-sm text-amber-900">Amber</p>
              </div>
              <p className="text-xs text-amber-800">
                Use for insights, "lightbulb moments", warm observations, comfortable tangents
              </p>
            </div>
            
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#10B981]"></div>
                <p className="font-bold text-sm text-green-900">Green</p>
              </div>
              <p className="text-xs text-green-800">
                Use for learning milestones, connections made, progress indicators, growth themes
              </p>
            </div>
          </div>

          <h3 className="mb-4 font-bold text-xl text-gray-800">Enhanced Gradients</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Primary Purple Gradient</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED]" 
                id="gradient-primary"
              />
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#EC4899] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Purple to Pink - Classic Energy</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#A855F7] to-[#EC4899]" 
                id="gradient-purple-pink"
              />
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Blue to Purple to Pink - Full Spectrum</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899]" 
                id="gradient-spectrum"
              />
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Cyan to Purple - Logic to Creativity</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" 
                id="gradient-cyan-purple"
              />
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F43F5E] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Amber to Red - Warm Intensity</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#F59E0B] to-[#F43F5E]" 
                id="gradient-warm"
              />
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg bg-gradient-to-r from-[#10B981] to-[#06B6D4] shadow-md"></div>
              <p className="text-sm font-medium text-gray-900">Emerald to Cyan - Cool Connection</p>
              <CodeBlock 
                code="bg-gradient-to-r from-[#10B981] to-[#06B6D4]" 
                id="gradient-cool"
              />
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Typography
          </h2>

          <div className="space-y-8">
            {/* Outfit */}
            <div className="rounded-lg border-2 border-purple-200 bg-white p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-bold text-xl text-gray-900">Outfit</h3>
                <p className="font-mono text-sm text-gray-600">Primary Display Font</p>
              </div>
              <div className="space-y-3">
                <p className="font-black text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  The quick brown fox jumps
                </p>
                <p className="font-bold text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  The quick brown fox jumps
                </p>
                <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-2"><strong>Usage:</strong> Headings, titles, hero text, episode titles</p>
                <p><strong>Weights:</strong> 900 (Black), 700 (Bold), 400 (Regular)</p>
              </div>
              <div className="mt-4">
                <CodeBlock 
                  code={`font-family: 'Outfit', sans-serif;\nfont-weight: 900; /* Black for main headings */\nfont-weight: 700; /* Bold for subheadings */`}
                  id="font-outfit"
                />
              </div>
            </div>

            {/* Inter */}
            <div className="rounded-lg border-2 border-purple-200 bg-white p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-bold text-xl text-gray-900">Inter</h3>
                <p className="font-mono text-sm text-gray-600">Body & UI Text</p>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-lg">
                  The quick brown fox jumps
                </p>
                <p className="text-base">
                  The quick brown fox jumps over the lazy dog. This is the primary font for body copy, descriptions, and UI elements.
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-2"><strong>Usage:</strong> Body text, descriptions, navigation, buttons, UI elements</p>
                <p><strong>Weights:</strong> 600 (Semibold), 500 (Medium), 400 (Regular)</p>
              </div>
              <div className="mt-4">
                <CodeBlock 
                  code={`/* Default system font stack includes Inter */\nfont-weight: 600; /* Semibold for emphasis */\nfont-weight: 400; /* Regular for body */`}
                  id="font-inter"
                />
              </div>
            </div>

            {/* SF Mono / Monospace */}
            <div className="rounded-lg border-2 border-purple-200 bg-white p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-bold text-xl text-gray-900">SF Mono / Monospace</h3>
                <p className="font-mono text-sm text-gray-600">Technical & Metadata</p>
              </div>
              <div className="space-y-3">
                <p className="font-mono font-bold text-lg">
                  Episode 047 • 42:18
                </p>
                <p className="font-mono text-sm">
                  Published: 2026-01-13 • Duration: 42:18
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-2"><strong>Usage:</strong> Episode numbers, timestamps, metadata, technical info</p>
                <p><strong>Weights:</strong> 700 (Bold), 400 (Regular)</p>
              </div>
              <div className="mt-4">
                <CodeBlock 
                  code={`font-family: ui-monospace, 'SF Mono', Monaco, monospace;\nfont-weight: 700; /* Bold for episode numbers */`}
                  id="font-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Component Library
          </h2>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="mb-4 font-bold text-xl text-gray-800">Buttons</h3>
            
            <div className="space-y-8">
              {/* Primary Button */}
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
                <p className="mb-4 font-medium text-sm text-gray-700">Primary CTA Button</p>
                <div className="mb-6 flex flex-wrap gap-4">
                  <button className="flex items-center gap-3 rounded-full bg-white px-6 py-3 font-black text-[#5B21B6] shadow-2xl shadow-purple-500/40 transition hover:scale-105 hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50">
                    <Play className="h-5 w-5 fill-current" />
                    Listen to Latest Episode
                  </button>
                </div>
                <CodeBlock 
                  code={`<button className="flex items-center gap-3 rounded-full bg-white px-6 py-3 font-black text-[#5B21B6] shadow-2xl shadow-purple-500/40 transition hover:scale-105 hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50">
  <Play className="h-5 w-5 fill-current" />
  Listen to Latest Episode
</button>`}
                  id="button-primary"
                />
              </div>

              {/* Secondary Button */}
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
                <p className="mb-4 font-medium text-sm text-gray-700">Secondary Button</p>
                <div className="mb-6 flex flex-wrap gap-4">
                  <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-8 py-4 font-black text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/50">
                    <Play className="h-5 w-5 fill-current" />
                    Play Episode
                  </button>
                </div>
                <CodeBlock 
                  code={`<button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-8 py-4 font-black text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/50">
  <Play className="h-5 w-5 fill-current" />
  Play Episode
</button>`}
                  id="button-secondary"
                />
              </div>

              {/* Ghost Button */}
              <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-r from-[#4C1D95] to-[#5B21B6] p-6">
                <p className="mb-4 font-medium text-sm text-purple-100">Ghost Button (on dark)</p>
                <div className="mb-6 flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50">
                    Browse All Episodes
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <CodeBlock 
                  code={`<button className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50">
  Browse All Episodes
  <ArrowRight className="h-5 w-5" />
</button>`}
                  id="button-ghost"
                />
              </div>
            </div>
          </div>

          {/* Episode Number Badge */}
          <div className="mb-12">
            <h3 className="mb-4 font-bold text-xl text-gray-800">Episode Number Badges - Color Variants</h3>
            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
              <p className="mb-4 font-medium text-sm text-gray-700">Episode badges can use different gradient combinations to represent different content types</p>
              <div className="mb-6 flex flex-wrap gap-4">
                <div>
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-lg font-black text-white shadow-lg">
                    47
                  </div>
                  <p className="text-center font-mono text-xs text-gray-600">Purple-Pink</p>
                  <p className="text-center text-xs text-gray-500">Default</p>
                </div>
                <div>
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] font-mono text-lg font-black text-white shadow-lg shadow-cyan-500/30">
                    45
                  </div>
                  <p className="text-center font-mono text-xs text-gray-600">Cyan-Blue</p>
                  <p className="text-center text-xs text-gray-500">Technical</p>
                </div>
                <div>
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F43F5E] font-mono text-lg font-black text-white shadow-lg shadow-amber-500/30">
                    42
                  </div>
                  <p className="text-center font-mono text-xs text-gray-600">Amber-Red</p>
                  <p className="text-center text-xs text-gray-500">Warm/Insight</p>
                </div>
                <div>
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#10B981] to-[#06B6D4] font-mono text-lg font-black text-white shadow-lg shadow-emerald-500/30">
                    38
                  </div>
                  <p className="text-center font-mono text-xs text-gray-600">Green-Cyan</p>
                  <p className="text-center text-xs text-gray-500">Learning</p>
                </div>
                <div>
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#A855F7] font-mono text-lg font-black text-white shadow-lg shadow-blue-500/30">
                    33
                  </div>
                  <p className="text-center font-mono text-xs text-gray-600">Blue-Purple</p>
                  <p className="text-center text-xs text-gray-500">Wonder</p>
                </div>
              </div>
              <CodeBlock 
                code={`<!-- Technical episodes -->\n<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] font-mono text-lg font-black text-white shadow-lg shadow-cyan-500/30">\n  45\n</div>\n\n<!-- Insight episodes -->\n<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F43F5E] font-mono text-lg font-black text-white shadow-lg shadow-amber-500/30">\n  42\n</div>\n\n<!-- Learning episodes -->\n<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#10B981] to-[#06B6D4] font-mono text-lg font-black text-white shadow-lg shadow-emerald-500/30">\n  38\n</div>`}
                id="badge-variants"
              />
            </div>
          </div>

          {/* Annotations */}
          <div className="mb-12">
            <h3 className="mb-4 font-bold text-xl text-gray-800">Quirky Annotations - Color Variants</h3>
            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
              <p className="mb-4 font-medium text-sm text-gray-700">Playful, hand-drawn style annotations with semantic colors</p>
              <div className="mb-6 space-y-3">
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-purple-400 bg-purple-50 px-3 py-1.5 font-mono text-xs font-bold text-purple-700">
                    probably wrong
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Purple - Default/Uncertainty</span>
                </div>
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-pink-400 bg-pink-50 px-3 py-1.5 font-mono text-xs font-bold text-pink-700">
                    wait—go back
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Pink - Excitement/Energy</span>
                </div>
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-cyan-400 bg-cyan-50 px-3 py-1.5 font-mono text-xs font-bold text-cyan-700">
                    logic checkpoint →
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Cyan - Technical/Logic</span>
                </div>
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-amber-400 bg-amber-50 px-3 py-1.5 font-mono text-xs font-bold text-amber-700">
                    💡 aha moment
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Amber - Insights</span>
                </div>
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-emerald-400 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">
                    connection made! ✓
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Green - Success/Learning</span>
                </div>
                <div>
                  <div className="inline-block rounded border-2 border-dashed border-blue-400 bg-blue-50 px-3 py-1.5 font-mono text-xs font-bold text-blue-700">
                    wait, what if...?
                  </div>
                  <span className="ml-2 text-xs text-gray-500">Blue - Questions/Wonder</span>
                </div>
              </div>
              <CodeBlock 
                code={`<!-- Uncertainty/Default -->\n<div className="rounded border-2 border-dashed border-purple-400 bg-purple-50 px-3 py-1.5 font-mono text-xs font-bold text-purple-700">\n  probably wrong\n</div>\n\n<!-- Excitement -->\n<div className="rounded border-2 border-dashed border-pink-400 bg-pink-50 px-3 py-1.5 font-mono text-xs font-bold text-pink-700">\n  wait—go back\n</div>\n\n<!-- Technical -->\n<div className="rounded border-2 border-dashed border-cyan-400 bg-cyan-50 px-3 py-1.5 font-mono text-xs font-bold text-cyan-700">\n  logic checkpoint →\n</div>\n\n<!-- Insights -->\n<div className="rounded border-2 border-dashed border-amber-400 bg-amber-50 px-3 py-1.5 font-mono text-xs font-bold text-amber-700">\n  💡 aha moment\n</div>\n\n<!-- Success/Learning -->\n<div className="rounded border-2 border-dashed border-emerald-400 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">\n  connection made! ✓\n</div>`}
                id="annotation-variants"
              />
            </div>
          </div>

          {/* Glow Effects */}
          <div className="mb-12">
            <h3 className="mb-4 font-bold text-xl text-gray-800">Glow Effects</h3>
            <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-6">
              <p className="mb-4 font-medium text-sm text-purple-100">Used for depth and atmosphere</p>
              <div className="mb-6 flex flex-wrap gap-8">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-3xl"></div>
                  <div className="absolute inset-4 rounded-full bg-purple-400 opacity-40 blur-2xl"></div>
                  <div className="relative flex h-full items-center justify-center font-bold text-white">
                    Glow Orb
                  </div>
                </div>
              </div>
              <CodeBlock 
                code={`<div className="relative h-32 w-32">
  <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-3xl"></div>
  <div className="absolute inset-4 rounded-full bg-purple-400 opacity-40 blur-2xl"></div>
  <div className="relative flex h-full items-center justify-center">
    Content
  </div>
</div>`}
                id="glow-orb"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="mb-12">
            <h3 className="mb-4 font-bold text-xl text-gray-800">Episode Cards</h3>
            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
              <p className="mb-4 font-medium text-sm text-gray-700">Standard episode card with hover effects</p>
              <div className="mb-6">
                <div className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white p-6 transition hover:border-purple-400 hover:shadow-xl focus-within:ring-4 focus-within:ring-purple-300/50">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-sm font-black text-white shadow-lg">
                      47
                    </div>
                    <div className="inline-block rounded border-2 border-dashed border-purple-400 bg-purple-50 px-2 py-1 font-mono text-xs font-bold text-purple-700">
                      32 min
                    </div>
                  </div>
                  <h3 className="mb-3 font-black text-xl text-gray-900 transition group-hover:text-purple-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    From Mythology to Game Design
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    How ancient stories shaped modern video games, plus AJ's thoughts on narrative structure.
                  </p>
                  <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-5 py-2.5 font-bold text-sm text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50">
                    <Play className="h-4 w-4 fill-current" />
                    Listen
                  </button>
                </div>
              </div>
              <CodeBlock 
                code={`<div className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white p-6 transition hover:border-purple-400 hover:shadow-xl focus-within:ring-4 focus-within:ring-purple-300/50">
  <div className="mb-4 flex items-start justify-between">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-[#EC4899] font-mono text-sm font-black text-white shadow-lg">
      47
    </div>
    <div className="inline-block rounded border-2 border-dashed border-purple-400 bg-purple-50 px-2 py-1 font-mono text-xs font-bold text-purple-700">
      32 min
    </div>
  </div>
  <h3 className="mb-3 font-black text-xl text-gray-900">
    Episode Title
  </h3>
  <p className="mb-4 text-sm text-gray-600">
    Description text goes here...
  </p>
  <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-5 py-2.5 font-bold text-sm text-white">
    <Play className="h-4 w-4 fill-current" />
    Listen
  </button>
</div>`}
                id="card-episode"
              />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Accessibility Guidelines
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">Focus States</h3>
              <p className="mb-3 text-sm text-purple-800">
                All interactive elements must have visible focus states for keyboard navigation:
              </p>
              <CodeBlock 
                code={`focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50`}
                id="focus-state"
              />
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">Reduced Motion</h3>
              <p className="mb-3 text-sm text-purple-800">
                Respect user's motion preferences by checking prefers-reduced-motion:
              </p>
              <CodeBlock 
                code={`const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Apply animations conditionally
{!prefersReducedMotion && <AnimatedElement />}`}
                id="reduced-motion"
              />
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">ARIA Labels</h3>
              <p className="mb-3 text-sm text-purple-800">
                Use descriptive ARIA labels for screen readers:
              </p>
              <CodeBlock 
                code={`<button aria-label="Play episode 47">
  <Play />
</button>`}
                id="aria-labels"
              />
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-bold text-lg text-purple-900">Color Contrast</h3>
              <p className="text-sm text-purple-800">
                All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text). 
                White text on purple backgrounds meets contrast requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Elements */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Visual Elements & Patterns
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
              <h3 className="mb-3 font-bold text-lg text-gray-900">Border Radius</h3>
              <p className="mb-4 text-sm text-gray-600">We use generous, friendly border radii:</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="mb-2 h-20 rounded-lg bg-purple-500"></div>
                  <code className="font-mono text-xs">rounded-lg (8px)</code>
                </div>
                <div>
                  <div className="mb-2 h-20 rounded-2xl bg-purple-500"></div>
                  <code className="font-mono text-xs">rounded-2xl (16px)</code>
                </div>
                <div>
                  <div className="mb-2 h-20 rounded-full bg-purple-500"></div>
                  <code className="font-mono text-xs">rounded-full</code>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
              <h3 className="mb-3 font-bold text-lg text-gray-900">Shadows</h3>
              <p className="mb-4 text-sm text-gray-600">Dramatic shadows with color for depth:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 h-20 rounded-lg bg-white shadow-lg shadow-purple-500/30"></div>
                  <code className="font-mono text-xs">shadow-lg shadow-purple-500/30</code>
                </div>
                <div>
                  <div className="mb-2 h-20 rounded-lg bg-white shadow-2xl shadow-purple-500/40"></div>
                  <code className="font-mono text-xs">shadow-2xl shadow-purple-500/40</code>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
              <h3 className="mb-3 font-bold text-lg text-gray-900">Spacing Scale</h3>
              <p className="mb-4 text-sm text-gray-600">Use Tailwind's default spacing scale for consistency:</p>
              <div className="space-y-2 text-sm font-mono">
                <div>4px = <code className="rounded bg-gray-100 px-2 py-1">gap-1</code> or <code className="rounded bg-gray-100 px-2 py-1">p-1</code></div>
                <div>8px = <code className="rounded bg-gray-100 px-2 py-1">gap-2</code> or <code className="rounded bg-gray-100 px-2 py-1">p-2</code></div>
                <div>12px = <code className="rounded bg-gray-100 px-2 py-1">gap-3</code> or <code className="rounded bg-gray-100 px-2 py-1">p-3</code></div>
                <div>16px = <code className="rounded bg-gray-100 px-2 py-1">gap-4</code> or <code className="rounded bg-gray-100 px-2 py-1">p-4</code></div>
                <div>24px = <code className="rounded bg-gray-100 px-2 py-1">gap-6</code> or <code className="rounded bg-gray-100 px-2 py-1">p-6</code></div>
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="mb-16">
          <h2 className="mb-6 font-black text-3xl text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Voice & Tone
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-700" />
                <h3 className="font-bold text-lg text-green-900">Do This</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• "We went down a rabbit hole about..."</li>
                <li>• "This probably doesn't make sense but..."</li>
                <li>• "Wait, let's back up—"</li>
                <li>• "AJ made a connection I never saw"</li>
                <li>• Use em dashes for tangents</li>
                <li>• Embrace incomplete thoughts</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <X className="h-5 w-5 text-red-700" />
                <h3 className="font-bold text-lg text-red-900">Avoid This</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• "Today's episode explores..."</li>
                <li>• "Join us as we dive deep into..."</li>
                <li>• Overly formal language</li>
                <li>• Buzzwords and jargon</li>
                <li>• Perfectly structured thoughts</li>
                <li>• Corporate-sounding copy</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-purple-200 bg-gradient-to-r from-[#4C1D95] to-[#5B21B6] px-6 py-8 text-center text-purple-100">
        <p className="text-sm">
          Random Neural Firings Brand Guide • Last updated January 2026
        </p>
      </footer>
    </div>
  );
}