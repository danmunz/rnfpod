export function BrandShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] px-6 py-20 md:py-32">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Label */}
        <div className="mb-6 inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
          <span className="font-mono text-sm text-cyan-400">BRAND_IDENTITY.v1</span>
        </div>

        {/* Main title */}
        <h1 className="mb-6 font-['Nunito'] text-5xl font-extrabold leading-tight text-white md:text-7xl lg:text-8xl">
          Random Neural
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">
            Firings
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-2xl font-['Nunito'] text-xl text-gray-300 md:text-2xl">
          A podcast about everything and nothing, where a dad and daughter explore
          ideas with <span className="text-cyan-400">sparkle brain</span> energy
        </p>

        {/* Quick facts */}
        <div className="flex flex-wrap gap-4">
          <div className="rounded-lg border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2">
            <div className="font-mono text-xs text-fuchsia-300">HOST_1</div>
            <div className="font-['Nunito'] font-bold text-white">Dan, 41</div>
          </div>
          <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-2">
            <div className="font-mono text-xs text-yellow-300">HOST_2</div>
            <div className="font-['Nunito'] font-bold text-white">AJ, 11</div>
          </div>
          <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2">
            <div className="font-mono text-xs text-cyan-300">VIBE</div>
            <div className="font-['Nunito'] font-bold text-white">Playful Nerd</div>
          </div>
        </div>

        {/* Decorative arrows */}
        <div className="absolute right-0 top-40 hidden opacity-40 md:block">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path d="M10 30 L90 30 M90 30 L75 15 M90 30 L75 45" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="35" y="20" fill="#00ffff" fontSize="10" fontFamily="Space Mono">wait—go back</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
