export function BrandElements() {
  return (
    <section className="border-t border-gray-800 bg-[#0f0f14] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-gray-500">04_BRAND_ELEMENTS</span>
          <h2 className="mt-2 font-['Nunito'] text-3xl font-bold text-white">Visual Language</h2>
          <p className="mt-2 text-gray-400">Diagrams, labels, and playful annotations</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Neuron - "probably wrong" */}
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-8">
            <div className="mb-6">
              <span className="font-mono text-xs text-cyan-400">ELEMENT_01</span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  {/* Central neuron */}
                  <circle cx="60" cy="60" r="20" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                  <circle cx="60" cy="60" r="10" fill="#00ffff"/>
                  
                  {/* Dendrites */}
                  <line x1="60" y1="40" x2="60" y2="10" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="80" y1="60" x2="110" y2="60" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="60" x2="10" y2="60" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="60" y1="80" x2="60" y2="110" stroke="#00ffff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="75" y1="75" x2="100" y2="100" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="45" y1="45" x2="20" y2="20" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                  
                  {/* Terminal nodes */}
                  <circle cx="60" cy="10" r="5" fill="#ff00ff"/>
                  <circle cx="110" cy="60" r="5" fill="#ffff00"/>
                  <circle cx="10" cy="60" r="5" fill="#ff00ff"/>
                  <circle cx="60" cy="110" r="5" fill="#00ffff"/>
                  <circle cx="100" cy="100" r="5" fill="#ffff00"/>
                  <circle cx="20" cy="20" r="5" fill="#ff00ff"/>
                </svg>
                
                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-1">
                  <span className="font-mono text-xs text-cyan-400">probably wrong</span>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <p className="font-['Nunito'] font-semibold text-white">The Neuron</p>
              <p className="mt-1 text-sm text-gray-400">Ideas firing in all directions</p>
            </div>
          </div>

          {/* Arrow - "wait—go back" */}
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-8">
            <div className="mb-6">
              <span className="font-mono text-xs text-fuchsia-400">ELEMENT_02</span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="relative w-full">
                <svg width="100%" height="80" viewBox="0 0 200 80" fill="none" className="mx-auto">
                  {/* Squiggly arrow */}
                  <path 
                    d="M 20 40 Q 40 20, 60 40 T 100 40 Q 120 40, 140 30 L 170 30" 
                    stroke="#ff00ff" 
                    strokeWidth="3" 
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Arrow head pointing left */}
                  <path d="M 25 30 L 20 40 L 25 50" stroke="#ff00ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  
                  {/* Label */}
                  <rect x="55" y="10" width="90" height="18" rx="4" fill="#1a0a2e" stroke="#ff00ff" strokeWidth="1"/>
                  <text x="100" y="22" fill="#ff00ff" fontSize="11" fontFamily="Space Mono" textAnchor="middle">wait—go back</text>
                </svg>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="font-['Nunito'] font-semibold text-white">The Arrow</p>
              <p className="mt-1 text-sm text-gray-400">Non-linear thinking in action</p>
            </div>
          </div>

          {/* Box - "IMPORTANT (maybe)" */}
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-8">
            <div className="mb-6">
              <span className="font-mono text-xs text-yellow-400">ELEMENT_03</span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="relative">
                <div className="rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-400/10 p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-400"/>
                    <span className="font-mono text-sm font-bold text-yellow-400">IMPORTANT</span>
                  </div>
                  <div className="h-16 w-32 rounded bg-yellow-400/20" />
                  <div className="mt-3 font-mono text-xs text-yellow-400/60">(maybe)</div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="font-['Nunito'] font-semibold text-white">The Box</p>
              <p className="mt-1 text-sm text-gray-400">Imperfect categorization</p>
            </div>
          </div>
        </div>

        {/* Diagram example */}
        <div className="mt-12 rounded-2xl border border-gray-800 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-8">
          <div className="mb-6">
            <span className="font-mono text-xs text-cyan-400">DIAGRAM_EXAMPLE</span>
            <h3 className="mt-2 font-['Nunito'] text-xl font-bold text-white">
              How We Think: A Totally Scientific Diagram™
            </h3>
          </div>

          <div className="relative">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative flex flex-col items-center gap-6 py-8 md:flex-row md:justify-around">
              {/* Idea */}
              <div className="flex flex-col items-center">
                <div className="rounded-full border-2 border-cyan-400 bg-cyan-400/20 p-6">
                  <span className="font-['Nunito'] text-2xl">💡</span>
                </div>
                <div className="mt-2 rounded border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                  <span className="font-mono text-xs text-cyan-400">IDEA</span>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="rotate-90 md:rotate-0">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                  <path d="M 5 20 L 45 20 M 45 20 L 35 10 M 45 20 L 35 30" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Tangent */}
              <div className="flex flex-col items-center">
                <div className="rounded-lg border-2 border-fuchsia-400 bg-fuchsia-400/20 p-6">
                  <span className="font-['Nunito'] text-2xl">🎮</span>
                </div>
                <div className="mt-2 rounded border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1">
                  <span className="font-mono text-xs text-fuchsia-400">TANGENT</span>
                </div>
              </div>

              {/* Arrow 2 (curved back) */}
              <div className="rotate-90 md:rotate-0">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M 5 10 Q 30 5, 45 25 L 40 30" stroke="#ffff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M 45 35 L 40 30 L 35 35" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                  <text x="15" y="0" fill="#ffff00" fontSize="8" fontFamily="Space Mono">OH WAIT</text>
                </svg>
              </div>

              {/* Connection */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border-2 border-yellow-400 bg-yellow-400/20 p-6">
                  <span className="font-['Nunito'] text-2xl">✨</span>
                </div>
                <div className="mt-2 rounded border border-yellow-400/30 bg-yellow-400/10 px-3 py-1">
                  <span className="font-mono text-xs text-yellow-400">CONNECTION!</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 text-center">
              <p className="font-mono text-xs text-gray-500">
                * Results may vary. Side effects include: excitement, rabbit holes, and "one more thing..."
              </p>
            </div>
          </div>
        </div>

        {/* Pattern library */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-6">
            <h4 className="mb-4 font-mono text-sm text-cyan-400">DECORATIVE_ELEMENTS</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 bg-gradient-to-r from-cyan-400 to-transparent"/>
                <span className="font-mono text-xs text-gray-500">gradient_line</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 border-t-2 border-dashed border-fuchsia-400"/>
                <span className="font-mono text-xs text-gray-500">dashed_line</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400"/>
                  <div className="h-2 w-2 rounded-full bg-fuchsia-400"/>
                  <div className="h-2 w-2 rounded-full bg-yellow-400"/>
                </div>
                <span className="font-mono text-xs text-gray-500">color_dots</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-6">
            <h4 className="mb-4 font-mono text-sm text-fuchsia-400">LABEL_STYLES</h4>
            <div className="space-y-3">
              <div className="inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-1">
                <span className="font-mono text-xs text-cyan-400">PRIMARY_LABEL</span>
              </div>
              <br />
              <div className="inline-block rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1">
                <span className="font-mono text-xs text-fuchsia-400">pill_label</span>
              </div>
              <br />
              <div className="inline-block border-b-2 border-yellow-400 px-1">
                <span className="font-mono text-xs text-yellow-400">UNDERLINE_TAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
