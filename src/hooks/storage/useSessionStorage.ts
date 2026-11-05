import { useCallback, useEffect, useState } from "react";
import { sessionStorageHelpers } from "../../internal/logx";
import { jsonSerializer } from "../../internal/storage";
import type { Serializer } from "../../internal/storage";
import type { SetValue } from "../../types";

/**
 * State synchronized with sessionStorage.
 *
 * Same contract as useLocalStorage but backed by sessionStorage (tab-scoped,
 * cleared when the tab/session ends).
 *
 * @param key - Storage key
 * @param initialValue - Fallback value when nothing is stored or on SSR
 * @param options - Optional custom serializer
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: { serializer?: Serializer<T> },
): [T, (value: SetValue<T>) => void, () => void] {
  const serializer = options?.serializer ?? (jsonSerializer as Serializer<T>);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const helpers = sessionStorageHelpers();
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
        const helpers = sessionStorageHelpers();
        if (helpers) {
          try {
            helpers.set(key, serializer.serialize(resolved));
          } catch {
            // Ignore storage write failures.
          }
        }
        return resolved;
      }),
    [key, serializer],
  );

  const remove = useCallback(() => {
    setValue(initialValue);
    const helpers = sessionStorageHelpers();
    if (helpers) {
      try {
        helpers.remove(key);
      } catch {
        // Ignore storage removal failures.
      }
    }
  }, [key, initialValue]);

  return [value, set, remove];
}
