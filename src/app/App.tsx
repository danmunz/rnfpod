import { HashRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { SiteLayout } from './layouts/SiteLayout';
import { HomePage } from './pages/HomePage';
import { EpisodePage } from './pages/EpisodePage';
import { BrowseEpisodesPage } from './pages/BrowseEpisodesPage';
import { StyleGuidePage } from './components/StyleGuidePage';
import { BrandGuide } from './components/BrandGuide';

export default function App() {
  return (
    <HashRouter>
      <PlayerProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/episodes" element={<BrowseEpisodesPage />} />
            <Route path="/episodes/:slug" element={<EpisodePage />} />
            <Route path="/styleguide" element={<StyleGuidePage />} />
            <Route path="/brand" element={<BrandGuide />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </HashRouter>
  );
}