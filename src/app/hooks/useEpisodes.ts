import { useMemo } from 'react';
import type { Episode } from '../types/episode';
import episodesData from '../../generated/episodes.json';

const allEpisodes: Episode[] = episodesData as Episode[];

/** All unique topics across all episodes, sorted alphabetically. */
export const allTopics = Array.from(
  new Set(allEpisodes.flatMap(ep => ep.topics)),
).sort();

/** Return all published episodes, newest first. */
export function useEpisodes() {
  return allEpisodes;
}

/** Return a single episode by its slug, or undefined. */
export function useEpisode(slug: string | undefined): Episode | undefined {
  return useMemo(
    () => allEpisodes.find(ep => ep.slug === slug),
    [slug],
  );
}

/** Return the latest (most recent) episode. */
export function useLatestEpisode(): Episode | undefined {
  return allEpisodes[0];
}

/** Filter & sort episodes. */
export function useFilteredEpisodes(
  searchQuery: string,
  selectedTopic: string | null,
  sortBy: 'newest' | 'oldest',
): Episode[] {
  return useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allEpisodes
      .filter(ep => {
        const matchesSearch =
          !q ||
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q);
        const matchesTopic = !selectedTopic || ep.topics.includes(selectedTopic);
        return matchesSearch && matchesTopic;
      })
      .sort((a, b) =>
        sortBy === 'newest'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }, [searchQuery, selectedTopic, sortBy]);
}
