import { act, renderHook } from "@testing-library/react";
import {
  useDebouncedCallback,
  useDebouncedValue,
  useThrottle,
} from "../../src/hooks";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces the value after the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { delay: 100 }), {
      initialProps: { value: "a" },
    });
    expect(result.current).toBe("a");
    rerender({ value: "b" });
    expect(result.current).toBe("a"); // not yet
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("b");
  });

  it("cancels and restarts the timer on each change", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { delay: 100 }), {
      initialProps: { value: "a" },
    });
    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(50));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(50));
    expect(result.current).toBe("a"); // still a, timer restarted
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("c");
  });

  it("supports leading edge", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { delay: 100, leading: true }), {
      initialProps: { value: "a" },
    });
    expect(result.current).toBe("a");
    rerender({ value: "b" });
    expect(result.current).toBe("b"); // leading sets immediately
  });
});

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes the callback after the delay with the latest args", () => {
    const fn = vi.fn();
    const { result } = renderHook(({ cb }) => useDebouncedCallback(cb, 100), {
      initialProps: { cb: fn },
    });
    act(() => result.current("hello"));
    expect(fn).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("uses the latest callback reference (no stale closure)", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const { result, rerender } = renderHook(({ cb }) => useDebouncedCallback(cb, 100), {
      initialProps: { cb: fn1 },
    });
    act(() => result.current(1));
    rerender({ cb: fn2 });
    act(() => result.current(2));
    act(() => vi.advanceTimersByTime(100));
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(2);
  });

  it("cancel / flush / pending work", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 100));
    expect(result.current.pending()).toBe(false);
    act(() => result.current("x"));
    expect(result.current.pending()).toBe(true);
    act(() => result.current.cancel());
    expect(result.current.pending()).toBe(false);
    act(() => vi.advanceTimersByTime(1000));
    expect(fn).not.toHaveBeenCalled();

    act(() => result.current("y"));
    act(() => result.current.flush());
    expect(fn).toHaveBeenCalledWith("y");
    expect(result.current.pending()).toBe(false);
  });
});

describe("useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes on leading edge and trailing edge", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottle(fn, 100));
    act(() => result.current(1));
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => result.current(2));
    expect(fn).toHaveBeenCalledTimes(1); // within wait, ignored
    act(() => vi.advanceTimersByTime(100));
    expect(fn).toHaveBeenCalledTimes(2); // trailing flush
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  it("cancel / flush / pending work", () => {
    vi.setSystemTime(0);
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottle(fn, 100));
    act(() => result.current(1));
    expect(fn).not.toHaveBeenCalled();
    expect(result.current.pending()).toBe(true);
    act(() => result.current.flush());
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => result.current.cancel());
    act(() => vi.advanceTimersByTime(1000));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
