import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t-2 border-purple-200 bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#6B21A8] py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-12 lg:grid-cols-3">
          <div>
            <h3
              className="mb-4 font-black text-xl"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Random Neural Firings
            </h3>
            <p className="text-purple-200">
              Making unexpected connections between unrelated topics since 2024.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#A855F7]" />
              <span className="font-mono text-xs font-bold text-purple-200">
                New episodes weekly
              </span>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-purple-300">
              Listen
            </h4>
            <div className="space-y-2 text-sm">
              <Link to="/episodes" className="block text-purple-200 transition hover:text-white">
                Browse Episodes
              </Link>
              <a href="./feed.xml" className="block text-purple-200 transition hover:text-white">
                RSS Feed
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-purple-300">
              Connect
            </h4>
            <div className="space-y-2 text-sm">
              <span className="block cursor-default text-purple-400">
                Email Us <span className="font-mono text-[10px]">· soon</span>
              </span>
              <span className="block cursor-default text-purple-400">
                Suggest a Topic <span className="font-mono text-[10px]">· soon</span>
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-purple-400/30 pt-8 text-center">
          <p className="font-mono text-sm text-purple-300">
            © {new Date().getFullYear()} Random Neural Firings • Made with curiosity and sparkle brain energy ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}
