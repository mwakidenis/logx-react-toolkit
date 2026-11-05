import { useCallback, useEffect, useState } from "react";
import { localStorageHelpers } from "../../internal/logx";
import { jsonSerializer } from "../../internal/storage";
import type { Serializer } from "../../internal/storage";
import type { SetValue } from "../../types";

/**
 * State synchronized with localStorage.
 *
 * Uses @mwakidenis/logx `localStorageHelpers` / `safeStorage` under the hood,
 * so storage access is exception-guarded and returns gracefully when
 * localStorage is unavailable (e.g. private browsing, SSR).
 *
 * Hydration-safe: the initial render returns `initialValue` on both server
 * and client; storage is read in an effect after mount.
 *
 * @param key - Storage key
 * @param initialValue - Fallback value when nothing is stored or on SSR
 * @param options - Optional custom serializer
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: { serializer?: Serializer<T> },
): [T, (value: SetValue<T>) => void, () => void] {
  const serializer = options?.serializer ?? (jsonSerializer as Serializer<T>);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const helpers = localStorageHelpers();
    if (!helpers) return;
    const raw = helpers.get(key);
    if (raw === null) return;
    const parsed = serializer.deserialize(raw);
    if (parsed !== null) setValue(parsed as T);
  }, [key, serializer]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) =>
      setValue((prev) => {
        const resolved = typeof next === "function"
          ? (next as (prev: T) => T)(prev)
          : next;
        const helpers = localStorageHelpers();
        if (helpers) {
          try {
            helpers.set(key, serializer.serialize(resolved));
          } catch {
            // Storage write failed; state is still updated locally.
          }
        }
        return resolved;
      }),
    [key, serializer],
  );

  const remove = useCallback(() => {
    setValue(initialValue);
    const helpers = localStorageHelpers();
    if (helpers) {
      try {
        helpers.remove(key);
      } catch {
        // Ignore storage removal failures.
      }
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handle = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === localStorage) {
        const parsed =
          event.newValue === null
            ? null
            : serializer.deserialize(event.newValue);
        if (parsed !== null) setValue(parsed as T);
      }
    };
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, [key, serializer]);

  return [value, set, remove];
}
