import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEpisode } from '@/hooks/useEpisodes';
import { usePipelineStep } from '@/hooks/usePipelineStep';
import { uploadAudio, updateEpisode, coverUrl } from '@/lib/api';
import {
  Play, CheckCircle2, Circle, Loader2, AlertCircle,
  ChevronLeft, Upload, Scissors, Eye
} from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'init',         label: 'Initialize',         icon: '📁', description: 'Create episode structure' },
  { id: 'upload-audio', label: 'Upload Audio',       icon: '🎙️', description: 'Import raw WAV recording' },
  { id: 'transcribe',   label: 'Transcribe',         icon: '📝', description: 'Deepgram speech-to-text' },
  { id: 'cutlist',      label: 'Build Cut List',     icon: '✂️', description: 'Detect silence gaps to remove' },
  { id: 'review',       label: 'Review Cuts',        icon: '👀', description: 'Approve/reject cuts', link: 'cuts' },
  { id: 'apply-cuts',   label: 'Apply Cuts',         icon: '🔧', description: 'Generate time map & keep list' },
  { id: 'render',       label: 'Render Audio',       icon: '🎵', description: 'FFmpeg render final MP3' },
  { id: 'remap',        label: 'Remap Transcript',   icon: '🗺️', description: 'Adjust timestamps post-cuts' },
  { id: 'notes',        label: 'Generate Notes',     icon: '📋', description: 'LLM-generated show notes' },
  { id: 'links',        label: 'Resolve Links',      icon: '🔗', description: 'Wikipedia + official site lookup' },
  { id: 'show-notes',   label: 'Build Show Notes',   icon: '📄', description: 'Generate episode markdown' },
  { id: 'cover',        label: 'Generate Cover',     icon: '🎨', description: 'Cover art with episode title' },
  { id: 'publish',      label: 'Publish',            icon: '🚀', description: 'Upload to R2 + generate site page' },
];

export function EpisodeWorkflow() {
  const { ep } = useParams<{ ep: string }>();
  const { episode, loading, error, refresh } = useEpisode(ep!);
  const { execute, abort, logs, running, result } = usePipelineStep(ep!);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    if (result === 'success') {
      refresh();
    }
  }, [result, refresh]);

  useEffect(() => {
    if (episode?.meta?.title) setTitle(episode.meta.title);
  }, [episode?.meta?.title]);

  const handleRun = (stepId: string) => {
    setActiveStep(stepId);
    execute(stepId);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !ep) return;
    try {
      setActiveStep('upload-audio');
      await uploadAudio(ep, file);
      refresh();
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const handleTitleSave = async () => {
    if (!ep) return;
    await updateEpisode(ep, { title });
    setEditTitle(false);
    refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="text-error text-center py-20">
        <AlertCircle className="w-12 h-12 mx-auto mb-4" />
        <p>{error || 'Episode not found'}</p>
      </div>
    );
  }

  const displayTitle = episode.package?.episode_title || episode.meta?.title || ep;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-1 text-text-muted text-sm hover:text-text mb-4">
          <ChevronLeft className="w-4 h-4" />
          All Episodes
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-accent-cyan mb-1 block">
              {episode.episode_id.toUpperCase()}
            </span>
            {editTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-bg-card border border-border rounded px-3 py-1 text-xl font-bold focus:outline-none focus:border-accent-cyan"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                />
                <button onClick={handleTitleSave} className="text-accent-cyan text-sm">Save</button>
                <button onClick={() => setEditTitle(false)} className="text-text-muted text-sm">Cancel</button>
              </div>
            ) : (
              <h1
                className="text-2xl font-bold cursor-pointer hover:text-accent-cyan"
                onClick={() => setEditTitle(true)}
                title="Click to edit"
              >
                {displayTitle || <span className="italic text-text-muted">Click to set title</span>}
              </h1>
            )}
            <p className="text-text-muted text-sm mt-1">
              {episode.meta?.recorded_date} · {episode.progress} steps complete
            </p>
          </div>
          {episode.steps.cover === 'done' && (
            <img
              src={coverUrl(ep!)}
              alt="Cover"
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline steps */}
        <div className="lg:col-span-2 space-y-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const status = episode.steps[step.id] || 'pending';
            const isActive = activeStep === step.id;
            const isRunning = isActive && running;
            const isDone = status === 'done';
            const prevDone = idx === 0 || episode.steps[PIPELINE_STEPS[idx - 1].id] === 'done';

            return (
              <div
                key={step.id}
                className={`
                  border rounded-lg p-4 transition-all
                  ${isActive ? 'border-accent-cyan bg-bg-card' : 'border-border'}
                  ${isDone ? 'opacity-80' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{step.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{step.label}</h3>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-success" />}
                      {isRunning && <Loader2 className="w-4 h-4 animate-spin text-accent-yellow" />}
                      {isActive && result === 'error' && <AlertCircle className="w-4 h-4 text-error" />}
                    </div>
                    <p className="text-xs text-text-muted">{step.description}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {step.id === 'upload-audio' && (
                      <label className="flex items-center gap-1 bg-bg-hover text-text px-3 py-1.5 rounded text-xs font-medium cursor-pointer hover:bg-border">
                        <Upload className="w-3 h-3" />
                        WAV
                        <input type="file" accept=".wav" className="hidden" onChange={handleUpload} />
                      </label>
                    )}
                    {step.link && (
                      <Link
                        to={`/episodes/${ep}/${step.link}`}
                        className="flex items-center gap-1 bg-bg-hover text-text px-3 py-1.5 rounded text-xs font-medium hover:bg-border"
                      >
                        <Eye className="w-3 h-3" />
                        Open
                      </Link>
                    )}
                    {step.id !== 'upload-audio' && step.id !== 'init' && (
                      <button
                        onClick={() => isRunning ? abort() : handleRun(step.id)}
                        disabled={!prevDone && !isDone}
                        className={`
                          flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium
                          ${isRunning
                            ? 'bg-error/20 text-error hover:bg-error/30'
                            : !prevDone && !isDone
                              ? 'bg-bg-hover text-text-muted cursor-not-allowed opacity-50'
                              : 'bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20'
                          }
                        `}
                      >
                        {isRunning ? (
                          <>Stop</>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            {isDone ? 'Re-run' : 'Run'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Log output */}
                {isActive && logs.length > 0 && (
                  <div className="mt-3 bg-bg rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-xs">
                    {logs.map((line, i) => (
                      <div
                        key={i}
                        className={`${line.startsWith('ERROR') ? 'text-error' : 'text-text-muted'}`}
                      >
                        {line}
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                )}

                {isActive && result === 'success' && (
                  <div className="mt-2 text-xs text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed successfully
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar: Episode info */}
        <div className="space-y-4">
          <div className="bg-bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium text-sm mb-3">Episode Info</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-text-muted text-xs">ID</dt>
                <dd className="font-mono">{episode.episode_id}</dd>
              </div>
              <div>
                <dt className="text-text-muted text-xs">Recorded</dt>
                <dd>{episode.meta?.recorded_date || '—'}</dd>
              </div>
              <div>
                <dt className="text-text-muted text-xs">People</dt>
                <dd>{episode.meta?.people?.map((p) => p.name).join(', ') || '—'}</dd>
              </div>
            </dl>
          </div>

          {episode.package && (
            <div className="bg-bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-sm mb-3">Show Notes Preview</h3>
              <p className="text-sm text-text-muted line-clamp-4">
                {episode.package.summary?.split('\n')[0]}
              </p>
              {episode.package.segments && (
                <div className="mt-3 space-y-1">
                  <h4 className="text-xs text-text-muted font-medium">Segments</h4>
                  {episode.package.segments.map((s, i) => (
                    <div key={i} className="text-xs text-text-muted">
                      {formatTime(s.start)} — {s.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
