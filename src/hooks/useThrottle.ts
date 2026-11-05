import { useCallback, useEffect, useRef } from "react";
import { throttle as logxThrottle, type Cancelable } from "../internal/logx";
import { useLatest } from "./useLatest";

/**
 * Throttle a callback using LOGX's `throttle` (@mwakidenis/logx/function).
 *
 * LOGX throttle invokes on the leading edge and flushes the trailing edge at
 * the end of the wait period. It exposes `cancel`, `flush` and `pending`.
 *
 * @param callback - Function to throttle
 * @param wait - Wait period in milliseconds
 */
export function useThrottle<F extends (...args: unknown[]) => unknown>(
  callback: F,
  wait: number,
): {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
} {
  const latest = useLatest(callback);
  const throttledRef = useRef<((...args: Parameters<F>) => void) & Cancelable | null>(null);

  useEffect(() => {
    const throttled = logxThrottle(
      (...args: unknown[]) => {
        latest.current(...(args as Parameters<F>));
      },
      wait,
    );
    throttledRef.current = throttled as ((...args: Parameters<F>) => void) & Cancelable;
    return () => {
      throttled.cancel();
    };
  }, [wait]);

  const invoke = useCallback((...args: Parameters<F>) => {
    throttledRef.current?.(...args);
  }, []);

  const cancel = useCallback(() => {
    throttledRef.current?.cancel();
  }, []);
  const flush = useCallback(() => {
    throttledRef.current?.flush();
  }, []);
  const pending = useCallback(() => throttledRef.current?.pending() ?? false, []);

  return Object.assign(invoke, { cancel, flush, pending });
}
