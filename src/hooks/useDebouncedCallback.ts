import { useCallback, useEffect, useRef } from "react";
import { debounce as logxDebounce, type Cancelable } from "../internal/logx";
import { useLatest } from "./useLatest";

/**
 * Debounce a callback using LOGX's `debounce` (@mwakidenis/logx/function).
 *
 * LOGX debounce is trailing-edge only: the function is invoked after `delay`
 * milliseconds of inactivity. It exposes `cancel`, `flush` and `pending`.
 *
 * The latest callback reference is captured internally so the debounced
 * function never holds a stale closure, even if `callback` changes every render.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 */
export function useDebouncedCallback<
  F extends (...args: unknown[]) => unknown,
>(
  callback: F,
  delay: number,
): {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
} {
  const latest = useLatest(callback);
  const debouncedRef = useRef<((...args: Parameters<F>) => void) & Cancelable | null>(null);

  useEffect(() => {
    const debounced = logxDebounce(
      (...args: unknown[]) => {
        latest.current(...(args as Parameters<F>));
      },
      delay,
    );
    debouncedRef.current = debounced as ((...args: Parameters<F>) => void) & Cancelable;
    return () => {
      debounced.cancel();
    };
  }, [delay]);

  const invoke = useCallback((...args: Parameters<F>) => {
    debouncedRef.current?.(...args);
  }, []);

  const cancel = useCallback(() => {
    debouncedRef.current?.cancel();
  }, []);
  const flush = useCallback(() => {
    debouncedRef.current?.flush();
  }, []);
  const pending = useCallback(() => debouncedRef.current?.pending() ?? false, []);

  return Object.assign(invoke, { cancel, flush, pending });
}
