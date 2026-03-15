import { HashRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { SiteLayout } from './layouts/SiteLayout';
import { HomePage } from './pages/HomePage';
import { EpisodePage } from './pages/EpisodePage';
import { BrowseEpisodesPage } from './pages/BrowseEpisodesPage';

export default function App() {
  return (
    <HashRouter>
      <PlayerProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/episodes" element={<BrowseEpisodesPage />} />
            <Route path="/episodes/:slug" element={<EpisodePage />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </HashRouter>
  );
}