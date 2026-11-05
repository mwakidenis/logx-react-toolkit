import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useDebouncedValue } from "../../hooks";
import type { DebouncedInputProps } from "../../types";

/**
 * Controlled input with a separate debounced value.
 *
 * - `value`/`defaultValue` for controlled/uncontrolled usage.
 * - `delay` controls debounce duration.
 * - `onChange` fires immediately; `onDebouncedChange` fires after debounce.
 * - Accepts standard input attributes for form integration.
 *
 * @param props - Component props
 */
export function DebouncedInput({
  value,
  defaultValue,
  onChange,
  onDebouncedChange,
  delay = 300,
  ...rest
}: DebouncedInputProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value ?? "") : internalValue;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const debounced = useDebouncedValue(currentValue, { delay });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    onDebouncedChange?.(debounced);
  }, [debounced, onDebouncedChange]);

  return <input {...rest} value={currentValue} onChange={handleChange} />;
}
