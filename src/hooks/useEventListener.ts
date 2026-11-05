import { useEffect, useRef } from "react";

/**
 * Attach an event listener with automatic cleanup on unmount.
 *
 * Supports window, document, element, or Document/Window targets. The listener
 * is captured via a ref so it stays current without re-attaching.
 *
 * @param target - EventTarget (window, document, element) or null/undefined
 * @param type - Event type
 * @param listener - Event listener
 * @param options - AddEventListenerOptions or capture boolean
 */
export function useEventListener(
  target: EventTarget | null | undefined,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
): void {
  const latest = useRef(listener);
  latest.current = listener;

  useEffect(() => {
    if (!target) return undefined;
    const handle = (event: Event) => latest.current(event);
    target.addEventListener(type, handle, options);
    return () => {
      target.removeEventListener(type, handle, options);
    };
  }, [target, type, options]);
}
