export function LogoSection() {
  return (
    <section className="border-t border-gray-800 bg-[#0a0a0f] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-gray-500">01_LOGO</span>
          <h2 className="mt-2 font-['Nunito'] text-3xl font-bold text-white">Logo & Wordmark</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Primary Logo - Dark Background */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-8">
            <div className="mb-4">
              <span className="font-mono text-xs text-gray-400">PRIMARY / DARK BG</span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  {/* Neuron icon */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="4" fill="#00ffff"/>
                    <line x1="24" y1="16" x2="24" y2="4" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="24" x2="44" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="24" x2="4" y2="24" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="24" y1="32" x2="24" y2="44" stroke="#00ffff" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="24" cy="4" r="3" fill="#ff00ff"/>
                    <circle cx="44" cy="24" r="3" fill="#ffff00"/>
                    <circle cx="4" cy="24" r="3" fill="#ff00ff"/>
                    <circle cx="24" cy="44" r="3" fill="#00ffff"/>
                  </svg>
                </div>
                <h3 className="font-['Nunito'] text-3xl font-extrabold text-white">
                  Random Neural Firings
                </h3>
                <p className="mt-2 font-mono text-xs text-cyan-400">probably_wrong.exe</p>
              </div>
            </div>
          </div>

          {/* Secondary Logo - Light Background */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <div className="mb-4">
              <span className="font-mono text-xs text-gray-600">SECONDARY / LIGHT BG</span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  {/* Neuron icon - dark version */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="8" fill="#0ea5e9" opacity="0.1" stroke="#0ea5e9" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="4" fill="#0ea5e9"/>
                    <line x1="24" y1="16" x2="24" y2="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="24" x2="44" y2="24" stroke="#eab308" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="24" x2="4" y2="24" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="24" y1="32" x2="24" y2="44" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="24" cy="4" r="3" fill="#8b5cf6"/>
                    <circle cx="44" cy="24" r="3" fill="#eab308"/>
                    <circle cx="4" cy="24" r="3" fill="#8b5cf6"/>
                    <circle cx="24" cy="44" r="3" fill="#0ea5e9"/>
                  </svg>
                </div>
                <h3 className="font-['Nunito'] text-3xl font-extrabold text-gray-900">
                  Random Neural Firings
                </h3>
                <p className="mt-2 font-mono text-xs text-blue-600">probably_wrong.exe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Icon variations */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-[#0f0f14] p-8">
          <div className="mb-6">
            <span className="font-mono text-xs text-gray-400">ICON VARIATIONS</span>
          </div>
          <div className="flex flex-wrap items-center justify-around gap-8">
            {/* Large */}
            <div className="text-center">
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                <circle cx="24" cy="24" r="4" fill="#00ffff"/>
                <line x1="24" y1="16" x2="24" y2="4" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="32" y1="24" x2="44" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="24" x2="4" y2="24" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="24" y1="32" x2="24" y2="44" stroke="#00ffff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="4" r="3" fill="#ff00ff"/>
                <circle cx="44" cy="24" r="3" fill="#ffff00"/>
                <circle cx="4" cy="24" r="3" fill="#ff00ff"/>
                <circle cx="24" cy="44" r="3" fill="#00ffff"/>
              </svg>
              <p className="mt-2 font-mono text-xs text-gray-500">64px</p>
            </div>
            {/* Medium */}
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                <circle cx="24" cy="24" r="4" fill="#00ffff"/>
                <line x1="24" y1="16" x2="24" y2="4" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="32" y1="24" x2="44" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="24" x2="4" y2="24" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="24" y1="32" x2="24" y2="44" stroke="#00ffff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="4" r="3" fill="#ff00ff"/>
                <circle cx="44" cy="24" r="3" fill="#ffff00"/>
                <circle cx="4" cy="24" r="3" fill="#ff00ff"/>
                <circle cx="24" cy="44" r="3" fill="#00ffff"/>
              </svg>
              <p className="mt-2 font-mono text-xs text-gray-500">48px</p>
            </div>
            {/* Small */}
            <div className="text-center">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                <circle cx="24" cy="24" r="4" fill="#00ffff"/>
                <line x1="24" y1="16" x2="24" y2="4" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="32" y1="24" x2="44" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="24" x2="4" y2="24" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="24" y1="32" x2="24" y2="44" stroke="#00ffff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="4" r="3" fill="#ff00ff"/>
                <circle cx="44" cy="24" r="3" fill="#ffff00"/>
                <circle cx="4" cy="24" r="3" fill="#ff00ff"/>
                <circle cx="24" cy="44" r="3" fill="#00ffff"/>
              </svg>
              <p className="mt-2 font-mono text-xs text-gray-500">32px</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
