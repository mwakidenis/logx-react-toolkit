import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import type { PasswordInputProps } from "../../types";

/**
 * Accessible show/hide password input.
 *
 * - Controlled/uncontrolled value.
 * - Accessible toggle button labels.
 * - Keyboard accessible; no external UI framework dependency.
 *
 * @param props - Component props
 */
export function PasswordInput({
  value,
  defaultValue,
  onChange,
  label = "Password",
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
  showToggle = true,
  className,
}: PasswordInputProps): JSX.Element {
  const [show, setShow] = useState(false);
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

  const toggle = useCallback(() => setShow((current) => !current), []);

  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-label={label}
      />
      {showToggle && (
        <button
          type="button"
          onClick={toggle}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
        >
          {show ? "Hide password" : "Show password"}
        </button>
      )}
    </div>
  );
}
