import { Search, Filter, Sparkles, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFilteredEpisodes, allTopics, useEpisodes } from '../hooks/useEpisodes';
import { EpisodeCard } from '../components/EpisodeCard';

export function BrowseEpisodesPage() {
  const [searchParams] = useSearchParams();
  const allEps = useEpisodes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(
    searchParams.get('topic') || null,
  );
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredEpisodes = useFilteredEpisodes(searchQuery, selectedTopic, sortBy);

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="border-b border-purple-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-purple-100 px-4 py-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-700">
              {allEps.length} Episodes & Counting
            </span>
          </div>

          <h1
            className="mb-4 text-6xl font-black leading-tight text-slate-900"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            All Episodes
          </h1>

          <p className="max-w-2xl text-xl text-slate-700">
            Every conversation, tangent, and aha moment—ready for your ears.
          </p>

          <div className="mt-6 inline-block rounded border-2 border-dashed border-purple-400 bg-purple-100 px-3 py-1.5 font-mono text-xs font-bold text-purple-700">
            probably should have organized these better →
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-600" />
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-purple-300 bg-white py-4 pl-12 pr-4 font-medium text-slate-900 placeholder-purple-400 transition focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-400/30"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="font-mono text-xs font-bold uppercase text-purple-700">
                Filter by topic:
              </span>
            </div>

            <button
              onClick={() => setSelectedTopic(null)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                selectedTopic === null
                  ? 'border-2 border-purple-500 bg-purple-500 text-white'
                  : 'border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              All
            </button>

            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                  selectedTopic === topic
                    ? 'border-2 border-purple-500 bg-purple-500 text-white'
                    : 'border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase text-purple-700">Sort:</span>
            <button
              onClick={() => setSortBy('newest')}
              className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                sortBy === 'newest'
                  ? 'border-2 border-pink-500 bg-pink-500 text-white'
                  : 'border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                sortBy === 'oldest'
                  ? 'border-2 border-pink-500 bg-pink-500 text-white'
                  : 'border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              Oldest First
            </button>
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedTopic) && (
          <div className="mb-6 rounded-xl border-2 border-purple-300 bg-purple-100 p-4">
            <p className="font-medium text-purple-800">
              Found{' '}
              <span className="font-mono font-black text-purple-900">
                {filteredEpisodes.length}
              </span>{' '}
              episode{filteredEpisodes.length !== 1 ? 's' : ''}
              {selectedTopic && (
                <span>
                  {' '}
                  in <span className="font-bold">{selectedTopic}</span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {' '}
                  matching "<span className="font-bold">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>
        )}
      </section>

      {/* Episodes Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {filteredEpisodes.length === 0 ? (
          <div className="rounded-2xl border-2 border-purple-200 bg-white p-12 text-center shadow-lg">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-purple-400" />
            <h3
              className="mb-2 text-2xl font-black text-slate-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              No episodes found
            </h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic(null);
              }}
              className="mt-6 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.slug}
                episode={episode}
                onTopicClick={(topic) => setSelectedTopic(topic)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
