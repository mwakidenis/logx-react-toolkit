import { useCallback, useState } from "react";
import {
  clone,
  deepClone,
  entries,
  get,
  keys,
  mapValues,
  merge,
  omit,
  pick,
  values,
} from "../internal/logx";

/**
 * Object state with immutable helpers.
 *
 * Several helpers delegate to @mwakidenis/logx object utilities (get, set,
 * pick, omit, merge, keys, values, entries, clone, deepClone, mapValues).
 * React-specific state management is kept in this hook; LOGX provides the pure
 * object transformations.
 *
 * @param initialValue - Initial object (defaults to {})
 */
export function useObject<T extends Record<string, unknown>>(
  initialValue: T = {} as T,
): {
  object: T;
  set: (value: T | ((prev: T) => T)) => void;
  setKey: (key: string, value: unknown) => void;
  removeKey: (key: string) => void;
  clear: () => void;
  reset: () => void;
  pick: (keys: readonly string[]) => Partial<T>;
  omit: (keys: readonly string[]) => Partial<T>;
  merge: (sources: Partial<T>[]) => T;
  get: (path: string | Array<string | number>) => unknown;
  keys: () => string[];
  values: () => unknown[];
  entries: () => [string, unknown][];
  clone: () => T;
  deepClone: () => T;
  mapValues: <U>(iteratee: (value: unknown, key: string) => U) => Record<string, U>;
} {
  const [object, setObject] = useState<T>(initialValue);

  const set = useCallback(
    (value: T | ((prev: T) => T)) =>
      setObject((prev) =>
        typeof value === "function"
          ? (value as (prev: T) => T)(prev)
          : value,
      ),
    [],
  );
  const setKey = useCallback((key: string, value: unknown) =>
    setObject((prev) => ({ ...prev, [key]: value }) as T),
  []);
  const removeKey = useCallback((key: string) =>
    setObject((prev) => {
      const next = { ...prev };
      delete next[key];
      return next as T;
    }),
  []);
  const clear = useCallback(() => setObject({} as T), []);
  const reset = useCallback(() => setObject(initialValue), [initialValue]);

  const pickValue = useCallback(
    (pickedKeys: readonly string[]) => pick(object, pickedKeys),
    [object],
  );
  const omitValue = useCallback(
    (omittedKeys: readonly string[]) => omit(object, omittedKeys),
    [object],
  );
  const mergeValue = useCallback(
    (sources: Partial<T>[]) => merge(object, ...sources) as T,
    [object],
  );
  const getValue = useCallback(
    (path: string | Array<string | number>) => get(object, path),
    [object],
  );
  const keysValue = useCallback(() => keys(object), [object]);
  const valuesValue = useCallback(() => values(object), [object]);
  const entriesValue = useCallback(() => entries(object), [object]);
  const cloneValue = useCallback(() => clone(object) as T, [object]);
  const deepCloneValue = useCallback(() => deepClone(object) as T, [object]);
  const mapValuesValue = useCallback(
    <U>(iteratee: (value: unknown, key: string) => U) =>
      mapValues(object, iteratee),
    [object],
  );

  return {
    object,
    set,
    setKey,
    removeKey,
    clear,
    reset,
    pick: pickValue,
    omit: omitValue,
    merge: mergeValue,
    get: getValue,
    keys: keysValue,
    values: valuesValue,
    entries: entriesValue,
    clone: cloneValue,
    deepClone: deepCloneValue,
    mapValues: mapValuesValue,
  };
}
