import { useCallback, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";

/**
 * A controllable interval hook.
 *
 * Provides start/stop and clears the interval on unmount. The callback is
 * captured via useLatest so it never goes stale. `active` reflects whether an
 * interval is currently scheduled.
 *
 * @param callback - Function to invoke every `delay` milliseconds
 * @param delay - Delay in milliseconds, or null to disable
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
): {
  start: () => void;
  stop: () => void;
  active: boolean;
} {
  const latest = useLatest(callback);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [active, setActive] = useState(false);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setActive(false);
  }, []);

  const start = useCallback(() => {
    stop();
    if (delay !== null && delay >= 0) {
      timerRef.current = setInterval(() => latest.current(), delay);
      setActive(true);
    }
  }, [delay]);

  useEffect(() => {
    start();
    return () => stop();
  }, [delay, start, stop]);

  return { start, stop, active };
}
