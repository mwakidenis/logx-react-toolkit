import { act, renderHook } from "@testing-library/react";
import { useInterval, useTimeout } from "../../src/hooks";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes callback after delay and cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(({ delay }) => useTimeout(fn, delay), {
      initialProps: { delay: 100 },
    });
    expect(result.current.active).toBe(true);
    act(() => vi.advanceTimersByTime(100));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.active).toBe(false);

    unmount();
    expect(result.current.active).toBe(false);
  });

  it("start / stop / reset control the timer", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useTimeout(fn, 1000));
    expect(result.current.active).toBe(true);
    act(() => result.current.stop());
    expect(result.current.active).toBe(false);
    act(() => result.current.start());
    expect(result.current.active).toBe(true);
    act(() => result.current.reset());
    expect(result.current.active).toBe(true);
    // Does not fire until the delay elapses.
    act(() => vi.advanceTimersByTime(999));
    expect(fn).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.active).toBe(false);
  });

  it("does not fire when delay is null", () => {
    const fn = vi.fn();
    renderHook(() => useTimeout(fn, null));
    act(() => vi.advanceTimersByTime(10000));
    expect(fn).not.toHaveBeenCalled();
  });
});

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes callback every delay and cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() => useInterval(fn, 50));
    expect(result.current.active).toBe(true);
    act(() => vi.advanceTimersByTime(50));
    expect(fn).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(100));
    expect(fn).toHaveBeenCalledTimes(3);
    unmount();
    act(() => vi.advanceTimersByTime(1000));
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("start / stop control the interval", () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useInterval(fn, null));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(1000));
    expect(fn).not.toHaveBeenCalled();
    act(() => result.current.stop());
  });
});
