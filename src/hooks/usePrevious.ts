import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a tracked value.
 *
 * On first render returns undefined (there is no previous value yet).
 * The returned ref updates after each render so the value is always the
 * value from the previous committed render.
 *
 * @param value - The value to track
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
