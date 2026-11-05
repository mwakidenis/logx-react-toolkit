import { useCallback, useState } from "react";

/**
 * A boolean toggle hook.
 *
 * Returns the current boolean value and a stable set of actions to mutate it.
 * All callbacks are stable (no unnecessary re-renders of consumers).
 *
 * @param initialValue - Initial boolean value (defaults to false)
 */
export function useToggle(
  initialValue: boolean = false,
): [
  boolean,
  {
    toggle: () => void;
    set: (next?: boolean) => void;
    setTrue: () => void;
    setFalse: () => void;
  },
] {
  const [value, setValue] = useState(!!initialValue);

  const toggle = useCallback(() => setValue((current) => !current), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const set = useCallback(
    (next?: boolean) =>
      setValue((current) => (typeof next === "boolean" ? next : !current)),
    [],
  );

  return [value, { toggle, set, setTrue, setFalse }];
}
