import { useCallback, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";
import type { AsyncState } from "../types";

/**
 * Manage an asynchronous operation with loading, success and error states.
 *
 * Supports cancellation via AbortController, race-condition protection (only
 * the latest invocation updates state), and manual execute / reset.
 *
 * @param asyncFn - Function returning a Promise
 * @param immediate - Whether to invoke immediately on mount (default true)
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  immediate: boolean = true,
): AsyncState<T> & {
  execute: () => Promise<void>;
  setData: (data: T) => void;
  setError: (error: Error) => void;
  reset: () => void;
  cancel: () => void;
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const latest = useLatest(asyncFn);
  const abortRef = useRef<AbortController | null>(null);
  const seqRef = useRef(0);

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setState({ data: null, error: null, isLoading: false, isSuccess: false, isError: false });
    }
  }, []);

  const setData = useCallback((data: T) => {
    setState({ data, error: null, isLoading: false, isSuccess: true, isError: false });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({ data: null, error, isLoading: false, isSuccess: false, isError: true });
  }, []);

  const reset = useCallback(() => {
    cancel();
    setState({ data: null, error: null, isLoading: false, isSuccess: false, isError: false });
  }, [cancel]);

  const execute = useCallback(async () => {
    cancel();
    const controller = new AbortController();
    abortRef.current = controller;
    const seq = ++seqRef.current;
    setState({ data: null, error: null, isLoading: true, isSuccess: false, isError: false });
    try {
      const data = await latest.current();
      if (controller.signal.aborted || seq !== seqRef.current) return;
      setState({ data, error: null, isLoading: false, isSuccess: true, isError: false });
    } catch (err) {
      if (controller.signal.aborted || seq !== seqRef.current) return;
      const error = err instanceof Error ? err : new Error(String(err));
      setState({ data: null, error, isLoading: false, isSuccess: false, isError: true });
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!immediate) return;
    void execute();
    return () => cancel();
  }, [immediate, execute, cancel]);

  return { ...state, execute, setData, setError, reset, cancel };
}
