import { useCallback, useState } from "react";
import { useClipboard } from "../../hooks";
import type { CopyButtonProps } from "../../types";

/**
 * Accessible copy-to-clipboard button.
 *
 * - Copies the supplied `text` to the clipboard.
 * - Shows idle / copying / success / error states.
 * - Supports custom labels per state and a custom className.
 * - Keyboard accessible (native button). No icon library dependency.
 *
 * @param props - Component props
 */
export function CopyButton({
  text,
  label = "Copy",
  copyingLabel = "Copying...",
  successLabel = "Copied!",
  errorLabel = "Error",
  className,
  onCopy,
  onError,
  timeout = 2000,
}: CopyButtonProps): JSX.Element {
  const [status, setStatus] = useState<"idle" | "copying" | "success" | "error">("idle");
  const { copy } = useClipboard();

  const handleCopy = useCallback(async () => {
    setStatus("copying");
    try {
      const ok = await copy(text);
      if (ok) {
        setStatus("success");
        onCopy?.(text);
      } else {
        setStatus("error");
        onError?.(new Error("Failed to copy to clipboard"));
      }
    } catch (err) {
      setStatus("error");
      onError?.(err as Error);
    }
    setTimeout(() => setStatus("idle"), timeout);
  }, [text, copy, onCopy, onError, timeout]);

  const displayLabel =
    status === "copying"
      ? copyingLabel
      : status === "success"
        ? successLabel
        : status === "error"
          ? errorLabel
          : label;

  return (
    <button
      type="button"
      className={className}
      disabled={status === "copying"}
      onClick={handleCopy}
      aria-label={status === "success" ? "Copied to clipboard" : label}
      aria-pressed={status === "success"}
    >
      {displayLabel}
    </button>
  );
}
