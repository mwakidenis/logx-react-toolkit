import { useEffect, useState } from "react";

/**
 * Track online/offline status.
 *
 * SSR-safe: assumes `true` on the server, then reads `navigator.onLine` after
 * mount and listens for `online`/`offline` events.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(
    () => (typeof navigator !== "undefined" ? navigator.onLine : true),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return online;
}
