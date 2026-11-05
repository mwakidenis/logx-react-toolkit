import { useEffect, useState } from "react";

/**
 * Track whether a media query matches.
 *
 * SSR-safe: returns `false` on the server and before mount, then reflects the
 * real match status after mount. Listens for `change` events and cleans up on
 * unmount.
 *
 * @param query - A CSS media query string
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
