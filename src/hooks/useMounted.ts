import { useEffect, useState } from "react";

/**
 * Returns whether the component is mounted.
 *
 * The value starts false (SSR-safe) and becomes true after mount. It returns
 * to false on unmount. Use sparingly; prefer event-driven logic where possible.
 *
 * NOTE: Reading this during render can cause a flash of unmounted content on
 * the client. Prefer using it inside effects or event handlers.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}
