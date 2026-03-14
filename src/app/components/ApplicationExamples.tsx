export function ApplicationExamples() {
  return (
    <section className="border-t border-gray-800 bg-[#0a0a0f] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-gray-500">05_APPLICATIONS</span>
          <h2 className="mt-2 font-['Nunito'] text-3xl font-bold text-white">Brand in Action</h2>
          <p className="mt-2 text-gray-400">How the identity comes to life</p>
        </div>

        {/* Podcast Cover */}
        <div className="mb-12 rounded-2xl border border-gray-800 bg-[#0f0f14] p-8">
          <div className="mb-6">
            <span className="font-mono text-xs text-cyan-400">PODCAST_COVER</span>
          </div>
          <div className="mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-2xl border-2 border-gray-700 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e]">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                  backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative p-8">
                {/* Neuron graphic */}
                <div className="mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 48 48" fill="none">
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

                {/* Title */}
                <h3 className="mb-2 text-center font-['Nunito'] text-3xl font-extrabold leading-tight text-white">
                  Random Neural Firings
                </h3>

                {/* Subtitle */}
                <p className="mb-4 text-center font-['Nunito'] text-sm text-gray-300">
                  with Dan & AJ
                </p>

                {/* Label */}
                <div className="flex justify-center">
                  <div className="inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                    <span className="font-mono text-xs text-cyan-400">probably_wrong.exe</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-400">Square format for podcast platforms</p>
          </div>
        </div>

        {/* Episode Card */}
        <div className="mb-12 rounded-2xl border border-gray-800 bg-[#0f0f14] p-8">
          <div className="mb-6">
            <span className="font-mono text-xs text-fuchsia-400">EPISODE_CARD</span>
          </div>
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-[#0a0a0f] to-[#1a0a2e]">
            <div className="border-b border-gray-800 bg-[#0a0a0f]/50 p-4">
              <div className="flex items-center gap-3">
                <div className="inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-1">
                  <span className="font-mono text-xs text-cyan-400">EP_001</span>
                </div>
                <span className="font-mono text-xs text-gray-500">32:15</span>
                <div className="flex-1"/>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400"/>
                  <div className="h-2 w-2 rounded-full bg-fuchsia-400"/>
                  <div className="h-2 w-2 rounded-full bg-yellow-400"/>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="mb-3 font-['Nunito'] text-2xl font-bold text-white">
                Sims, Spinning Chairs, and the Joy of Randomness
              </h4>
              <p className="mb-4 font-['Nunito'] text-gray-300">
                In our inaugural episode, we dive into the world of The Sims 4, exploring its quirky personalities and the chaos of gameplay. AJ shares her insights on character traits, from the whimsical to the downright bizarre.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 font-mono text-xs text-fuchsia-400">gaming</span>
                <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 font-mono text-xs text-yellow-400">sims</span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-400">adhd</span>
              </div>
            </div>

            <div className="border-t border-gray-800 bg-[#0a0a0f]/30 p-4">
              <div className="flex items-center gap-4">
                <button className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-['Nunito'] font-semibold text-cyan-400 transition-all hover:bg-cyan-400/20">
                  Play Episode
                </button>
                <span className="font-mono text-xs text-gray-500">Released: Dec 15, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Instagram Story */}
          <div className="rounded-2xl border border-gray-800 bg-[#0f0f14] p-6">
            <div className="mb-4">
              <span className="font-mono text-xs text-yellow-400">SOCIAL_MEDIA / IG_STORY</span>
            </div>
            <div className="mx-auto max-w-[250px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border-2 border-gray-700 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f]">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  {/* Small neuron */}
                  <svg width="60" height="60" viewBox="0 0 48 48" fill="none" className="mb-4">
                    <circle cx="24" cy="24" r="6" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="3" fill="#00ffff"/>
                    <line x1="24" y1="18" x2="24" y2="8" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="30" y1="24" x2="40" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="24" cy="8" r="2" fill="#ff00ff"/>
                    <circle cx="40" cy="24" r="2" fill="#ffff00"/>
                  </svg>
                  
                  <div className="mb-2 inline-block rounded border border-yellow-400/30 bg-yellow-400/10 px-2 py-1">
                    <span className="font-mono text-xs text-yellow-400">NEW_EPISODE</span>
                  </div>
                  
                  <h5 className="mb-3 font-['Nunito'] text-xl font-bold text-white">
                    Sims & Spinning Chairs
                  </h5>
                  
                  <p className="mb-4 font-['Nunito'] text-sm text-gray-300">
                    EP_001 out now!
                  </p>

                  <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className="flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2">
                      <span className="font-['Nunito'] text-sm font-semibold text-cyan-400">Listen now</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4 L10 8 L6 12" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Twitter/X Post */}
          <div className="rounded-2xl border border-gray-800 bg-[#0f0f14] p-6">
            <div className="mb-4">
              <span className="font-mono text-xs text-cyan-400">SOCIAL_MEDIA / X_POST</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#0a0a0f]">
              <div className="border-b border-gray-800 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400">
                    <span className="font-['Nunito'] font-bold text-white">RNF</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Nunito'] font-bold text-white">Random Neural Firings</span>
                      <span className="font-mono text-xs text-gray-500">@RandomNeuralPod</span>
                    </div>
                    <p className="mt-2 font-['Nunito'] text-white">
                      🎮 New episode! We talk Sims, ADHD, and why spinning chairs are the best podcast furniture
                      <br/><br/>
                      <span className="text-cyan-400">#podcast</span> <span className="text-fuchsia-400">#gaming</span> <span className="text-yellow-400">#sparklebrain</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-800 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-8 text-center">
                <svg width="60" height="60" viewBox="0 0 48 48" fill="none" className="mx-auto">
                  <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.2" stroke="#00ffff" strokeWidth="2"/>
                  <circle cx="24" cy="24" r="4" fill="#00ffff"/>
                  <line x1="24" y1="16" x2="24" y2="4" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="32" y1="24" x2="44" y2="24" stroke="#ffff00" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="4" r="3" fill="#ff00ff"/>
                  <circle cx="44" cy="24" r="3" fill="#ffff00"/>
                </svg>
                <p className="mt-2 font-mono text-xs text-cyan-400">EP_001 // 32:15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personality summary */}
        <div className="mt-12 rounded-2xl border border-gray-800 bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-8">
          <h3 className="mb-6 text-center font-['Nunito'] text-2xl font-bold text-white">
            Brand Personality in Every Detail
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-3 text-3xl">🧠</div>
              <p className="font-['Nunito'] font-semibold text-white">Smart, not smug</p>
              <p className="mt-1 text-sm text-gray-400">Accessible intelligence</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-3xl">⚡</div>
              <p className="font-['Nunito'] font-semibold text-white">Energetic, not manic</p>
              <p className="mt-1 text-sm text-gray-400">Controlled enthusiasm</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-3xl">🔍</div>
              <p className="font-['Nunito'] font-semibold text-white">Curious, not performative</p>
              <p className="mt-1 text-sm text-gray-400">Genuine exploration</p>
            </div>
            <div className="text-center">
              <div className="mb-3 text-3xl">✨</div>
              <p className="font-['Nunito'] font-semibold text-white">Playful nerd</p>
              <p className="mt-1 text-sm text-gray-400">Joy in systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-20 max-w-6xl border-t border-gray-800 pt-12 text-center">
        <div className="mb-4 inline-block rounded border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
          <span className="font-mono text-xs text-cyan-400">END_OF_TRANSMISSION</span>
        </div>
        <p className="font-['Nunito'] text-gray-400">
          "We think fast, we think weird, and we're excited to think together."
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400"/>
          <div className="h-2 w-2 rounded-full bg-fuchsia-400"/>
          <div className="h-2 w-2 rounded-full bg-yellow-400"/>
        </div>
      </div>
    </section>
  );
}
