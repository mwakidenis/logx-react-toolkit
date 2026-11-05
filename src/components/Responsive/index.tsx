import { useCallback } from "react";
import { useMediaQuery } from "../../hooks";
import type { ResponsiveProps } from "../../types";

/**
 * Conditionally render content based on a media query.
 *
 * SSR-safe: on the server and before mount, renders `fallback` (or null),
 * avoiding hydration mismatches. After mount, renders `children(matches)` when
 * the query matches, otherwise `fallback`.
 *
 * @param props - Component props
 */
export function Responsive({ children, query, fallback }: ResponsiveProps): JSX.Element {
  const matches = useMediaQuery(query);
  const renderChildren = useCallback(
    (m: boolean) => (m ? children(m) : fallback ?? null),
    [children, fallback],
  );
  return <>{renderChildren(matches)}</>;
}
