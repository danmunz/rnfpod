import { Link } from 'react-router-dom';
import { Zap, BookOpen, Palette } from 'lucide-react';

export function Header() {
  return (
    <header className="relative left-0 right-0 top-0 z-50 py-3">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#5B21B6] to-[#A855F7] shadow-lg shadow-purple-500/30">
              <Zap className="h-6 w-6 text-white" />
              <div className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] px-1.5 py-0.5 font-mono text-[8px] font-black text-white shadow-md">
                ⚡
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] bg-clip-text font-black text-sm uppercase tracking-widest text-transparent">
                Random Neural Firings
              </div>
              <div className="font-mono text-[10px] font-bold text-purple-500">
                // Making connections
              </div>
            </div>
          </Link>
          <nav className="flex gap-8 text-sm font-bold text-slate-700">
            <Link to="/episodes" className="transition hover:text-[#5B21B6]">
              Listen
            </Link>
            <a href="#about" className="transition hover:text-[#5B21B6]">
              About
            </a>
            <a href="#subscribe" className="transition hover:text-[#5B21B6]">
              Subscribe
            </a>
            <Link
              to="/brand"
              className="flex items-center gap-1 rounded px-2 transition hover:text-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#5B21B6]/50"
            >
              <BookOpen className="h-4 w-4" />
              Brand Guide
            </Link>
            <Link
              to="/styleguide"
              className="flex items-center gap-1 rounded px-2 transition hover:text-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#5B21B6]/50"
            >
              <Palette className="h-4 w-4" />
              Style Guide
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
