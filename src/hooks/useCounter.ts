import { useCallback, useState } from "react";

/**
 * A numeric counter hook.
 *
 * @param initialValue - Starting value (defaults to 0)
 */
export function useCounter(
  initialValue: number = 0,
): {
  count: number;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: () => void;
  set: (value: number) => void;
} {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(
    (step: number = 1) => setCount((current) => current + step),
    [],
  );
  const decrement = useCallback(
    (step: number = 1) => setCount((current) => current - step),
    [],
  );
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback((value: number) => setCount(value), []);

  return { count, increment, decrement, reset, set };
}
