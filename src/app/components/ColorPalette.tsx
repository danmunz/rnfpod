export function ColorPalette() {
  const colors = {
    primary: [
      { name: 'Cyan Spark', hex: '#00ffff', var: 'cyan-400', desc: 'Primary neon accent' },
      { name: 'Fuchsia Fire', hex: '#ff00ff', var: 'fuchsia-400', desc: 'Secondary neon accent' },
      { name: 'Yellow Zap', hex: '#ffff00', var: 'yellow-400', desc: 'Tertiary neon accent' },
    ],
    neutral: [
      { name: 'Deep Space', hex: '#0a0a0f', var: 'bg', desc: 'Primary background' },
      { name: 'Void Gray', hex: '#0f0f14', var: 'bg-alt', desc: 'Secondary background' },
      { name: 'Nebula Purple', hex: '#1a0a2e', var: 'accent-bg', desc: 'Accent background' },
      { name: 'Starlight', hex: '#ffffff', var: 'white', desc: 'Primary text on dark' },
      { name: 'Dim White', hex: '#d1d5db', var: 'gray-300', desc: 'Secondary text' },
      { name: 'Shadow', hex: '#6b7280', var: 'gray-500', desc: 'Tertiary text' },
    ],
  };

  return (
    <section className="border-t border-gray-800 bg-[#0a0a0f] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-gray-500">03_COLOR</span>
          <h2 className="mt-2 font-['Nunito'] text-3xl font-bold text-white">Color Palette</h2>
          <p className="mt-2 text-gray-400">Neon energy meets deep space</p>
        </div>

        {/* Neon Colors */}
        <div className="mb-12">
          <h3 className="mb-6 font-mono text-sm text-cyan-400">NEON_ACCENTS</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {colors.primary.map((color) => (
              <div key={color.hex} className="group">
                <div
                  className="mb-4 h-32 rounded-xl border-2 border-gray-800 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 0 40px ${color.hex}40`,
                  }}
                />
                <div>
                  <h4 className="font-['Nunito'] font-bold text-white">{color.name}</h4>
                  <p className="mt-1 font-mono text-sm text-gray-400">{color.hex}</p>
                  <p className="mt-1 text-sm text-gray-500">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neutral Colors */}
        <div>
          <h3 className="mb-6 font-mono text-sm text-gray-400">NEUTRAL_BASE</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {colors.neutral.map((color) => (
              <div key={color.hex} className="group">
                <div
                  className="mb-3 h-20 rounded-lg border border-gray-700 transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{color.name}</h4>
                  <p className="mt-1 font-mono text-xs text-gray-500">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color usage guide */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-[#0f0f14] p-6">
            <h4 className="mb-4 font-mono text-sm text-cyan-400">DO ✓</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">→</span>
                Use neon colors for highlights, labels, and interactive elements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">→</span>
                Combine neon accents with deep space backgrounds for contrast
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">→</span>
                Use glow effects sparingly to maintain energy without overwhelming
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#0f0f14] p-6">
            <h4 className="mb-4 font-mono text-sm text-fuchsia-400">DON'T ✗</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400">→</span>
                Don't use neon colors for large background areas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400">→</span>
                Don't combine all three neon colors at once without purpose
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400">→</span>
                Don't forget sufficient contrast for accessibility
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
