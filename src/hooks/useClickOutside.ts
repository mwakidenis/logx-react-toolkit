import { useEffect, useRef } from "react";

/**
 * Fire a handler when a click occurs outside a ref'd element.
 *
 * Uses useLatest internally so the handler is always current without
 * re-subscribing the document listeners every render.
 *
 * @param ref - A ref to the element to ignore clicks for
 * @param handler - Callback fired on outside click
 */
export function useClickOutside(
  ref: { current: HTMLElement | null | undefined },
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  const latest = useRef(handler);
  latest.current = handler;

  useEffect(() => {
    const handle = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        latest.current(event);
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handle);
      document.addEventListener("touchstart", handle);
      return () => {
        document.removeEventListener("mousedown", handle);
        document.removeEventListener("touchstart", handle);
      };
    }
    return undefined;
  }, [ref]);
}
