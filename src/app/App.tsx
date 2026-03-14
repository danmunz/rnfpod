import { TwilightThinkingSite } from './components/TwilightThinkingSite';
import { BrandGuide } from './components/BrandGuide';
import { EpisodePage } from './components/EpisodePage';
import { BrowseEpisodesPage } from './components/BrowseEpisodesPage';
import { useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

type Page = 'home' | 'brand-guide' | 'episode' | 'browse';
type Theme = 'light' | 'dark' | 'hybrid';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState<Theme>('hybrid');

  const handlePlayEpisode = (episode: any) => {
    setCurrentEpisode(episode);
    setIsPlaying(!isPlaying || currentEpisode?.number !== episode.number);
  };

  const handleNavigateToEpisode = () => {
    setCurrentPage('episode');
  };

  const handleNavigateToBrowse = () => {
    setCurrentPage('browse');
  };
  
  return (
    <div className="relative">
      {/* Theme Switcher - Fixed Position */}
      <div className="fixed right-6 top-6 z-[100] flex flex-col gap-2 rounded-2xl border-2 border-purple-400/30 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
        <div className="mb-2 border-b border-purple-200 pb-2">
          <p className="font-mono text-xs font-bold uppercase text-purple-600">
            Theme Preview
          </p>
        </div>
        <button
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <Sun className="h-4 w-4" />
          All Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <Moon className="h-4 w-4" />
          All Dark
        </button>
        <button
          onClick={() => setTheme('hybrid')}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
            theme === 'hybrid'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <Palette className="h-4 w-4" />
          Hybrid
        </button>
        <p className="mt-2 border-t border-purple-200 pt-2 text-center font-mono text-xs text-purple-500">
          {theme === 'light' && 'Light & airy'}
          {theme === 'dark' && 'Twilight vibes'}
          {theme === 'hybrid' && 'Light → Dark'}
        </p>
      </div>

      {currentPage === 'brand-guide' && (
        <BrandGuide onNavigateHome={() => setCurrentPage('home')} />
      )}
      {currentPage === 'episode' && (
        <EpisodePage 
          onNavigateBack={() => setCurrentPage('home')}
          onPlayEpisode={handlePlayEpisode}
          isPlaying={isPlaying}
          currentEpisode={currentEpisode}
          theme={theme}
        />
      )}
      {currentPage === 'browse' && (
        <BrowseEpisodesPage
          onNavigateBack={() => setCurrentPage('home')}
          onNavigateToEpisode={handleNavigateToEpisode}
          onPlayEpisode={handlePlayEpisode}
          isPlaying={isPlaying}
          currentEpisode={currentEpisode}
          theme={theme}
        />
      )}
      {currentPage === 'home' && (
        <TwilightThinkingSite 
          onNavigateToBrandGuide={() => setCurrentPage('brand-guide')}
          onNavigateToEpisode={handleNavigateToEpisode}
          onNavigateToBrowse={handleNavigateToBrowse}
          onPlayEpisode={handlePlayEpisode}
          isPlaying={isPlaying}
          currentEpisode={currentEpisode}
          theme={theme}
        />
      )}
    </div>
  );
}