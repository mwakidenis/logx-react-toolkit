import { useCallback, useState } from "react";

/**
 * A boolean state hook with explicit setTrue/setFalse/toggle actions.
 *
 * Alias of useToggle with a more descriptive name. Provides stable callbacks.
 *
 * @param initialValue - Initial boolean value (defaults to false)
 */
export function useBoolean(
  initialValue: boolean = false,
): [
  boolean,
  {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    set: (next?: boolean) => void;
  },
] {
  const [value, setValue] = useState(!!initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((current) => !current), []);
  const set = useCallback(
    (next?: boolean) =>
      setValue((current) => (typeof next === "boolean" ? next : !current)),
    [],
  );

  return [value, { setTrue, setFalse, toggle, set }];
}
