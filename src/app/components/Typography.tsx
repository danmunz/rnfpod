export function Typography() {
  return (
    <section className="border-t border-gray-800 bg-[#0f0f14] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-gray-500">02_TYPOGRAPHY</span>
          <h2 className="mt-2 font-['Nunito'] text-3xl font-bold text-white">Type System</h2>
          <p className="mt-2 text-gray-400">Playful meets systematic</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Primary Font */}
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-8">
            <div className="mb-6">
              <span className="font-mono text-xs text-cyan-400">PRIMARY_FONT</span>
              <h3 className="mt-2 font-['Nunito'] text-2xl font-bold text-white">Nunito</h3>
              <p className="mt-1 text-sm text-gray-400">Rounded geometric sans-serif</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-['Nunito'] text-5xl font-extrabold text-white">Aa</p>
                <p className="mt-2 font-mono text-xs text-gray-500">EXTRABOLD / 800</p>
              </div>
              <div>
                <p className="font-['Nunito'] text-3xl font-bold text-white">The quick brown fox</p>
                <p className="mt-1 font-mono text-xs text-gray-500">BOLD / 700</p>
              </div>
              <div>
                <p className="font-['Nunito'] text-xl font-semibold text-white">jumps over the lazy dog</p>
                <p className="mt-1 font-mono text-xs text-gray-500">SEMIBOLD / 600</p>
              </div>
              <div>
                <p className="font-['Nunito'] text-base text-gray-300">Perfect for body text, headings, and anything that needs warmth and approachability.</p>
                <p className="mt-1 font-mono text-xs text-gray-500">REGULAR / 400</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="font-mono text-xs text-cyan-400">USE_CASE:</p>
              <p className="mt-1 text-sm text-gray-300">Headlines, body copy, episode titles, friendly messaging</p>
            </div>
          </div>

          {/* Secondary Font */}
          <div className="rounded-2xl border border-gray-800 bg-[#0a0a0f] p-8">
            <div className="mb-6">
              <span className="font-mono text-xs text-fuchsia-400">SECONDARY_FONT</span>
              <h3 className="mt-2 font-['Nunito'] text-2xl font-bold text-white">Space Mono</h3>
              <p className="mt-1 text-sm text-gray-400">Monospace technical</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-5xl font-bold text-white">Aa</p>
                <p className="mt-2 font-mono text-xs text-gray-500">BOLD / 700</p>
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-white">EP_001</p>
                <p className="mt-1 font-mono text-xs text-gray-500">BOLD / 700</p>
              </div>
              <div>
                <p className="font-mono text-base text-white">probably_wrong.exe</p>
                <p className="mt-1 font-mono text-xs text-gray-500">REGULAR / 400</p>
              </div>
              <div>
                <p className="font-mono text-sm text-gray-300">CATEGORY: Gaming // STATUS: Active</p>
                <p className="mt-1 font-mono text-xs text-gray-500">REGULAR / 400</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
              <p className="font-mono text-xs text-fuchsia-400">USE_CASE:</p>
              <p className="mt-1 text-sm text-gray-300">Episode numbers, labels, timestamps, diagrams, technical annotations</p>
            </div>
          </div>
        </div>

        {/* Type pairing example */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-8">
          <div className="mb-4">
            <span className="font-mono text-xs text-yellow-400">TYPE_PAIRING_IN_ACTION</span>
          </div>
          <div className="space-y-4">
            <div className="inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-1">
              <span className="font-mono text-xs text-cyan-400">EP_001</span>
            </div>
            <h3 className="font-['Nunito'] text-3xl font-bold text-white">
              Sims, Spinning Chairs, and the Joy of Randomness
            </h3>
            <p className="font-['Nunito'] text-gray-300">
              In our inaugural episode, we dive into the world of The Sims 4, exploring its quirky personalities and the chaos of gameplay.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="font-mono text-sm text-gray-400">DURATION: 32:15</span>
              <span className="font-mono text-sm text-gray-400">TAGS: gaming, sims, adhd</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
