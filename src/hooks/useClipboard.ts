import { useCallback } from "react";

/**
 * Copy text to the clipboard.
 *
 * Uses the Clipboard API when available, with a textarea fallback for older
 * browsers. Never throws; returns false on failure.
 */
export function useClipboard(): {
  copy: (text: string) => Promise<boolean>;
  isSupported: boolean;
} {
  const isSupported =
    typeof navigator !== "undefined" && !!navigator.clipboard && !!navigator.clipboard.writeText;

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (isSupported && typeof navigator !== "undefined") {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback for environments without the Clipboard API.
      if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } finally {
          document.body.removeChild(textarea);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [isSupported]);

  return { copy, isSupported };
}
