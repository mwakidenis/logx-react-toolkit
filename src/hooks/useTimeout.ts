import { useCallback, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";

/**
 * A controllable timeout hook.
 *
 * Provides start/stop/reset and clears the timer on unmount. The callback is
 * captured via useLatest so it never goes stale. `active` reflects whether a
 * timeout is currently scheduled.
 *
 * @param callback - Function to invoke after the delay
 * @param delay - Delay in milliseconds, or null to disable
 */
export function useTimeout(
  callback: () => void,
  delay: number | null,
): {
  start: () => void;
  stop: () => void;
  reset: () => void;
  active: boolean;
} {
  const latest = useLatest(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(false);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setActive(false);
  }, []);

  const start = useCallback(() => {
    stop();
    if (delay !== null && delay >= 0) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setActive(false);
        latest.current();
      }, delay);
      setActive(true);
    }
  }, [delay]);

  const reset = useCallback(() => {
    start();
  }, [start]);

  useEffect(() => {
    start();
    return () => stop();
  }, [delay, start, stop]);

  return { start, stop, reset, active };
}
