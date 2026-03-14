import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border sticky top-0 z-50 bg-bg/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-accent-cyan">⚡</span>
            <span>RNF Studio</span>
          </Link>
          <div className="flex-1" />
          <span className="text-xs text-text-muted">Podcast Production</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
