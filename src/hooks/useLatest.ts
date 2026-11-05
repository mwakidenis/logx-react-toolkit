import { useRef } from "react";

/**
 * Returns a ref whose `.current` always holds the latest value without
 * triggering re-renders. Useful for accessing the most recent value inside
 * timers, callbacks or event listeners without stale closures.
 *
 * @param value - The value to track
 */
export function useLatest<T>(value: T): { current: T } {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
