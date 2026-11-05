import { useCallback, useState } from "react";
import {
  compact as logxCompact,
  difference,
  first,
  flatten,
  intersection,
  last,
  partition,
  shuffle as logxShuffle,
  take,
  drop,
  union,
  unique as logxUnique,
} from "../internal/logx";

/**
 * Array state with immutable helpers.
 *
 * Several helpers delegate to @mwakidenis/logx array utilities (unique,
 * compact, first, last, take, drop, shuffle, partition, difference,
 * intersection, union, flatten). React-specific state management is kept in
 * this hook; LOGX provides the pure array transformations.
 *
 * @param initialValue - Initial array (defaults to [])
 */
export function useArray<T>(initialValue: T[] = []): {
  array: T[];
  set: (value: T[] | ((prev: T[]) => T[])) => void;
  push: (...items: T[]) => void;
  unshift: (...items: T[]) => void;
  remove: (index: number) => void;
  removeBy: (predicate: (value: T, index: number) => unknown) => void;
  update: (index: number, value: T) => void;
  clear: () => void;
  reset: () => void;
  unique: () => void;
  compact: () => void;
  shuffle: () => void;
  first: () => T | undefined;
  last: () => T | undefined;
  take: (count: number) => T[];
  drop: (count: number) => T[];
  difference: (...others: T[][]) => T[];
  intersection: (...others: T[][]) => T[];
  union: (...others: T[][]) => T[];
  partition: (predicate: (value: T, index: number) => unknown) => [T[], T[]];
  flatten: () => unknown[];
} {
  const [array, setArray] = useState<T[]>(initialValue);

  const set = useCallback(
    (value: T[] | ((prev: T[]) => T[])) =>
      setArray((prev) =>
        typeof value === "function" ? (value as (prev: T[]) => T[])(prev) : value,
      ),
    [],
  );
  const push = useCallback((...items: T[]) => setArray((prev) => [...prev, ...items]), []);
  const unshift = useCallback((...items: T[]) => setArray((prev) => [...items, ...prev]), []);
  const remove = useCallback((index: number) =>
    setArray((prev) => prev.filter((_, i) => i !== index)),
  []);
  const removeBy = useCallback(
    (predicate: (value: T, index: number) => unknown) =>
      setArray((prev) => prev.filter((v, i) => !predicate(v, i))),
    [],
  );
  const update = useCallback((index: number, value: T) =>
    setArray((prev) => prev.map((v, i) => (i === index ? value : v))),
  []);
  const clear = useCallback(() => setArray([]), []);
  const reset = useCallback(() => setArray(initialValue), [initialValue]);
  const unique = useCallback(() => setArray((prev) => logxUnique(prev)), []);
  const compact = useCallback(() => setArray((prev) => logxCompact(prev)), []);
  const shuffle = useCallback(() => setArray((prev) => logxShuffle(prev)), []);

  const firstValue = useCallback(() => first(array), [array]);
  const lastValue = useCallback(() => last(array), [array]);
  const takeValue = useCallback(
    (count: number) => take(array, count),
    [array],
  );
  const dropValue = useCallback(
    (count: number) => drop(array, count),
    [array],
  );

  return {
    array,
    set,
    push,
    unshift,
    remove,
    removeBy,
    update,
    clear,
    reset,
    unique,
    compact,
    shuffle,
    first: firstValue,
    last: lastValue,
    take: takeValue,
    drop: dropValue,
    // Expose LOGX-derived pure helpers for consumers who need them.
    difference: useCallback(
      (...others: T[][]) => difference(array, ...others),
      [array],
    ),
    intersection: useCallback(
      (...others: T[][]) => intersection(array, ...others),
      [array],
    ),
    union: useCallback(
      (...others: T[][]) => union(array, ...others),
      [array],
    ),
    partition: useCallback(
      (predicate: (value: T, index: number) => unknown) => partition(array, predicate),
      [array],
    ),
    flatten: useCallback(() => flatten(array as unknown[]), [array]),
  };
}
