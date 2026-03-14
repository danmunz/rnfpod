import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MiniPlayer } from '../components/MiniPlayer';
import { usePlayer } from '../contexts/PlayerContext';

export function SiteLayout() {
  const { currentEpisode } = usePlayer();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F3FF] to-[#EDE9FE]"
      style={{ fontFamily: 'Lexend, sans-serif' }}
    >
      <Header />
      <main className={currentEpisode ? 'pb-24' : ''}>
        <Outlet />
      </main>
      <Footer />
      <MiniPlayer />
    </div>
  );
}
