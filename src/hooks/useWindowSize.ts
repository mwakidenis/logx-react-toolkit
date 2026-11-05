import { useEffect, useState } from "react";

/**
 * Track the window size (innerWidth / innerHeight).
 *
 * SSR-safe: returns { width: 0, height: 0 } on the server and first client
 * render, then updates on resize. Cleans up the listener on unmount.
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState<{ width: number; height: number }>(
    () => (typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
}
