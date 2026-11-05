/**
 * Shared TypeScript types for the LOGX React Toolkit.
 */

export type Unsubscribe = () => void;

export type SetValue<T> = T | ((prev: T) => T);

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface DebouncedValueOptions {
  /** Delay in milliseconds before the debounced value updates. Default: 300 */
  delay?: number;
  /** Invoke immediately on mount/first change (leading edge). Default: false */
  leading?: boolean;
}

export interface ThrottleOptions {
  /** Delay in milliseconds between invocations. Default: 300 */
  wait?: number;
  /** Invoke on leading edge. Default: true */
  leading?: boolean;
  /** Invoke on trailing edge. Default: true */
  trailing?: boolean;
}

export interface UseLocalStorageOptions<T> {
  /** Custom serializer. Default: JSON.stringify/JSON.parse */
  serializer?: {
    serialize: (value: T) => string;
    deserialize: (raw: string | null) => T | null;
  };
}

export interface CopyButtonProps {
  text: string;
  label?: string;
  copyingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  className?: string;
  onCopy?: (text: string) => void;
  onError?: (error: unknown) => void;
  timeout?: number;
}

export interface PasswordInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  showToggle?: boolean;
  className?: string;
}

export interface DebouncedInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  delay?: number;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export interface ResponsiveProps {
  children: (matches: boolean) => React.ReactNode;
  query: string;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error, info: React.ErrorInfo) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  resetKeys?: unknown[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: React.ErrorInfo | null;
}
