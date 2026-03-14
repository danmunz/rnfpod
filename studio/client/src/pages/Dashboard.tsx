import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEpisodes } from '@/hooks/useEpisodes';
import { createEpisode, type EpisodeSummary } from '@/lib/api';
import { Plus, Mic, CheckCircle2, Circle, Loader2 } from 'lucide-react';

export function Dashboard() {
  const { episodes, loading, error, refresh } = useEpisodes();
  const [creating, setCreating] = useState(false);
  const [newId, setNewId] = useState('');

  const handleCreate = async () => {
    if (!newId) return;
    try {
      await createEpisode(newId);
      setNewId('');
      setCreating(false);
      refresh();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const nextEpId = () => {
    const nums = episodes.map((e) => parseInt(e.episode_id.replace('ep', ''), 10));
    const next = Math.max(0, ...nums) + 1;
    return `ep${String(next).padStart(3, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Episodes</h1>
          <p className="text-text-muted text-sm mt-1">
            {episodes.length} episode{episodes.length !== 1 ? 's' : ''}
          </p>
        </div>
        {creating ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="ep003"
              className="bg-bg-card border border-border rounded px-3 py-2 text-sm w-28 focus:outline-none focus:border-accent-cyan"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button
              onClick={handleCreate}
              className="bg-accent-cyan text-bg-card px-4 py-2 rounded text-sm font-medium hover:opacity-90"
            >
              Create
            </button>
            <button
              onClick={() => setCreating(false)}
              className="text-text-muted px-3 py-2 text-sm hover:text-text"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setNewId(nextEpId());
              setCreating(true);
            }}
            className="flex items-center gap-2 bg-accent-cyan text-bg-card px-4 py-2 rounded text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            New Episode
          </button>
        )}
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-4 mb-6 text-sm text-error">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {episodes.map((ep) => (
          <EpisodeCard key={ep.episode_id} episode={ep} />
        ))}
        {episodes.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <Mic className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No episodes yet. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ episode }: { episode: EpisodeSummary }) {
  const steps = Object.entries(episode.steps);
  const doneCount = steps.filter(([, v]) => v === 'done').length;
  const totalSteps = steps.length;
  const pct = Math.round((doneCount / totalSteps) * 100);

  const title =
    episode.package?.episode_title ||
    episode.meta?.title ||
    episode.episode_id;
  const date = episode.meta?.recorded_date || '';

  return (
    <Link
      to={`/episodes/${episode.episode_id}`}
      className="bg-bg-card border border-border rounded-lg p-5 hover:border-accent-cyan/50 transition-colors group block"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-accent-cyan">
              {episode.episode_id.toUpperCase()}
            </span>
            {date && <span className="text-xs text-text-muted">{date}</span>}
          </div>
          <h3 className="font-semibold text-lg truncate group-hover:text-accent-cyan transition-colors">
            {title || <span className="italic text-text-muted">Untitled</span>}
          </h3>
          {episode.package?.summary && (
            <p className="text-sm text-text-muted mt-1 line-clamp-2">
              {episode.package.summary.split('\n')[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-xs text-text-muted">{episode.progress}</span>
          <div className="flex gap-0.5">
            {steps.map(([name, status]) => (
              <div
                key={name}
                title={`${name}: ${status}`}
                className={`w-2 h-2 rounded-full ${
                  status === 'done' ? 'bg-success' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-cyan rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}
