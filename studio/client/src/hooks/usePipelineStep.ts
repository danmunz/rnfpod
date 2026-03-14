import { useState, useCallback, useRef } from 'react';
import { runStep, type SSEMessage } from '@/lib/api';

export function usePipelineStep(ep: string) {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    (step: string) => {
      setLogs([]);
      setRunning(true);
      setResult(null);

      controllerRef.current = runStep(ep, step, (msg: SSEMessage) => {
        if (msg.type === 'log' && msg.text) {
          setLogs((prev) => [...prev, msg.text!]);
        } else if (msg.type === 'done') {
          setRunning(false);
          setResult(msg.status === 'success' ? 'success' : 'error');
          if (msg.status === 'error' && msg.text) {
            setLogs((prev) => [...prev, `ERROR: ${msg.text}`]);
          }
        }
      });
    },
    [ep],
  );

  const abort = useCallback(() => {
    controllerRef.current?.abort();
    setRunning(false);
    setResult(null);
  }, []);

  return { execute, abort, logs, running, result };
}
