import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCuts, updateCuts, approveCuts, getTranscript, rawAudioUrl, type CutItem, type TranscriptSegment } from '@/lib/api';
import { WaveformViewer, type WaveformViewerRef } from '@/components/WaveformViewer';
import {
  ChevronLeft, Play, Pause, Check, X, CheckCheck,
  XCircle, RotateCcw, Save, Loader2, ChevronUp, ChevronDown
} from 'lucide-react';

export function CutReview() {
  const { ep } = useParams<{ ep: string }>();
  const [cuts, setCuts] = useState<CutItem[]>([]);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const waveformRef = useRef<WaveformViewerRef>(null);
  const cutListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ep) return;
    setLoading(true);
    Promise.all([getCuts(ep), getTranscript(ep).catch(() => ({ segments: [] }))])
      .then(([cutsData, transcriptData]) => {
        setCuts(cutsData.cuts);
        setIsApproved(cutsData.approved);
        setTranscript(transcriptData.segments);
      })
      .finally(() => setLoading(false));
  }, [ep]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (waveformRef.current?.isPlaying()) {
            waveformRef.current.pause();
          } else {
            waveformRef.current?.play();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIdx((i) => Math.max(0, i - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIdx((i) => Math.min(cuts.length - 1, i + 1));
          break;
        case 'Enter':
          e.preventDefault();
          toggleCut(selectedIdx);
          break;
        case 'Escape':
          e.preventDefault();
          rejectCut(selectedIdx);
          break;
        case 'p':
          e.preventDefault();
          playCutContext(selectedIdx);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIdx, cuts]);

  // Scroll selected cut into view
  useEffect(() => {
    const el = document.getElementById(`cut-${selectedIdx}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedIdx]);

  const toggleCut = (idx: number) => {
    setCuts((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, approved: !c.approved } : c)),
    );
  };

  const rejectCut = (idx: number) => {
    setCuts((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, approved: false } : c)),
    );
  };

  const approveAll = () => setCuts((prev) => prev.map((c) => ({ ...c, approved: true })));
  const rejectAll = () => setCuts((prev) => prev.map((c) => ({ ...c, approved: false })));
  const resetAll = () => {
    if (!ep) return;
    getCuts(ep).then((data) => setCuts(data.cuts));
  };

  const playCutContext = (idx: number) => {
    const cut = cuts[idx];
    if (!cut || !waveformRef.current) return;
    const contextBefore = 3;
    const contextAfter = 3;
    const start = Math.max(0, cut.start - contextBefore);
    const end = Math.min(duration, cut.end + contextAfter);
    waveformRef.current.playRegion(start, end);
  };

  const handleSave = async () => {
    if (!ep) return;
    setSaving(true);
    try {
      await updateCuts(ep, cuts);
      await approveCuts(ep);
      setIsApproved(true);
    } finally {
      setSaving(false);
    }
  };

  const seekToCut = (idx: number) => {
    setSelectedIdx(idx);
    const cut = cuts[idx];
    if (cut && waveformRef.current) {
      waveformRef.current.seekTo(Math.max(0, cut.start - 2));
    }
  };

  // Find transcript segment for current playback time
  const activeTranscript = transcript.find(
    (s) => currentTime >= s.start && currentTime <= s.end,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
      </div>
    );
  }

  const approvedCount = cuts.filter((c) => c.approved).length;
  const totalCutTime = cuts
    .filter((c) => c.approved)
    .reduce((sum, c) => sum + c.duration, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/episodes/${ep}`}
          className="flex items-center gap-1 text-text-muted text-sm hover:text-text mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {ep?.toUpperCase()}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Cut Review</h1>
            <p className="text-text-muted text-sm">
              {cuts.length} cuts · {approvedCount} approved · {totalCutTime.toFixed(1)}s to remove
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isApproved && (
              <span className="text-xs text-success flex items-center gap-1">
                <Check className="w-3 h-3" />
                Approved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-accent-cyan text-bg-card px-4 py-2 rounded text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save & Approve
            </button>
          </div>
        </div>
      </div>

      {/* Waveform */}
      {ep && (
        <WaveformViewer
          ref={waveformRef}
          audioUrl={rawAudioUrl(ep)}
          cuts={cuts}
          onReady={setDuration}
          onTimeUpdate={setCurrentTime}
        />
      )}

      {/* Current transcript */}
      <div className="mt-3 h-12 flex items-center px-4 bg-bg-card border border-border rounded-lg text-sm">
        {activeTranscript ? (
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                activeTranscript.speaker_id === '0'
                  ? 'bg-accent-cyan/20 text-accent-cyan'
                  : 'bg-accent-pink/20 text-accent-pink'
              }`}
            >
              {activeTranscript.speaker || `Speaker ${activeTranscript.speaker_id}`}
            </span>
            <span className="text-text-muted">{activeTranscript.text}</span>
          </div>
        ) : (
          <span className="text-text-muted text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        )}
      </div>

      {/* Batch actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={approveAll}
          className="flex items-center gap-1 bg-success/10 text-success px-3 py-1.5 rounded text-xs font-medium hover:bg-success/20"
        >
          <CheckCheck className="w-3 h-3" />
          Approve All
        </button>
        <button
          onClick={rejectAll}
          className="flex items-center gap-1 bg-error/10 text-error px-3 py-1.5 rounded text-xs font-medium hover:bg-error/20"
        >
          <XCircle className="w-3 h-3" />
          Reject All
        </button>
        <button
          onClick={resetAll}
          className="flex items-center gap-1 bg-bg-hover text-text-muted px-3 py-1.5 rounded text-xs font-medium hover:text-text"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <div className="flex-1" />
        <span className="text-xs text-text-muted">
          Keyboard: Space=play/pause · ←/→=prev/next · Enter=toggle · P=play context · Esc=reject
        </span>
      </div>

      {/* Cut list */}
      <div ref={cutListRef} className="mt-4 space-y-1">
        {cuts.map((cut, idx) => (
          <div
            key={idx}
            id={`cut-${idx}`}
            className={`
              border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all
              ${idx === selectedIdx
                ? 'border-accent-cyan bg-bg-card'
                : 'border-border hover:border-border hover:bg-bg-card/50'
              }
              ${!cut.approved ? 'opacity-50' : ''}
            `}
            onClick={() => seekToCut(idx)}
          >
            <span className="text-xs font-mono text-text-muted w-6 text-right shrink-0">
              {idx + 1}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playCutContext(idx);
              }}
              className="text-text-muted hover:text-accent-cyan shrink-0"
              title="Play context"
            >
              <Play className="w-4 h-4" />
            </button>

            <div className="flex-1 min-w-0 grid grid-cols-3 gap-4 text-xs">
              <div className="text-text-muted truncate" title={cut.before_text}>
                {cut.before_text || '...'}
              </div>
              <div className="text-center">
                <span className="font-mono text-accent-pink">
                  {formatTime(cut.start)} → {formatTime(cut.end)}
                </span>
                <span className="text-text-muted ml-2">({cut.duration.toFixed(1)}s)</span>
              </div>
              <div className="text-text-muted truncate text-right" title={cut.after_text}>
                {cut.after_text || '...'}
              </div>
            </div>

            <span className="text-xs text-text-muted shrink-0 w-20 text-center">
              {cut.reason}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCut(idx);
              }}
              className={`
                shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${cut.approved
                  ? 'bg-error/20 text-error hover:bg-error/30'
                  : 'bg-success/20 text-success hover:bg-success/30'
                }
              `}
              title={cut.approved ? 'Click to keep (reject cut)' : 'Click to cut (approve cut)'}
            >
              {cut.approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      {cuts.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <p>No cuts found. Run the "Build Cut List" step first.</p>
        </div>
      )}
    </div>
  );
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
