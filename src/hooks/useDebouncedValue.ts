import { useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";
import type { DebouncedValueOptions } from "../types";

/**
 * Debounce a value.
 *
 * Returns the value after it has stopped changing for `delay` milliseconds.
 * Uses reference equality to detect changes; for objects/arrays pass a new
 * reference only when you want a debounce to restart.
 *
 * LOGX provides function debouncing (@mwakidenis/logx/function). This hook
 * implements value debouncing (a React-specific behaviour) on top of timers;
 * it does not map to an existing LOGX function.
 *
 * @param value - The value to debounce
 * @param options - delay (ms, default 300) and leading (default false)
 */
export function useDebouncedValue<T>(
  value: T,
  options: DebouncedValueOptions = {},
): T {
  const { delay = 300, leading = false } = options;
  const [debounced, setDebounced] = useState(value);
  const latest = useLatest(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadingRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      setDebounced(latest.current);
      timerRef.current = null;
    }, delay);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, delay]);

  useEffect(() => {
    if (!leading) return;
    const current = latest.current;
    if (lastLeadingRef.current !== current) {
      lastLeadingRef.current = current;
      setDebounced(current);
    }
  }, [value, leading]);

  return debounced;
}
