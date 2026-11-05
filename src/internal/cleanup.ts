/**
 * Cleanup helpers for React effects and hooks.
 *
 * Centralises timer and listener teardown so hooks do not leak resources
 * across unmounts or dependency changes.
 */

export type Unsubscribe = () => void;

export function clearTimer(timer: ReturnType<typeof setTimeout> | null): void {
  if (timer !== null) {
    clearTimeout(timer);
  }
}

export function clearIntervalTimer(
  timer: ReturnType<typeof setInterval> | null,
): void {
  if (timer !== null) {
    clearInterval(timer);
  }
}

export function createListenerRemover(
  target: EventTarget | null | undefined,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions | boolean,
): Unsubscribe {
  return () => {
    if (target) {
      target.removeEventListener(event, handler, options);
    }
  };
}

export function registerCleanup<T extends (...args: unknown[]) => unknown>(
  fn: T,
): T {
  return fn;
}
