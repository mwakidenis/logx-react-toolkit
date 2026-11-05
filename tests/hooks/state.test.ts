import { act, renderHook } from "@testing-library/react";
import {
  useBoolean,
  useCounter,
  useLatest,
  useMounted,
  usePrevious,
  useToggle,
} from "../../src/hooks";

describe("useToggle", () => {
  it("toggles between true and false with stable callbacks", () => {
    const { result, rerender } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    const { toggle } = result.current[1];
    act(() => toggle());
    expect(result.current[0]).toBe(true);
    act(() => toggle());
    expect(result.current[0]).toBe(false);
    // Callbacks are stable across rerenders
    rerender();
    expect(result.current[1].toggle).toBe(toggle);
    expect(result.current[1].setTrue).toBe(result.current[1].setTrue);
  });

  it("setTrue / setFalse / set work", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1].setTrue());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].setFalse());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].set(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].set(undefined));
    expect(result.current[0]).toBe(false);
  });
});

describe("useBoolean", () => {
  it("provides stable boolean actions", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].setFalse());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].set(true));
    expect(result.current[0]).toBe(true);
  });
});

describe("useCounter", () => {
  it("increments, decrements, resets and sets", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
    act(() => result.current.increment(3));
    expect(result.current.count).toBe(9);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(8);
    act(() => result.current.decrement(2));
    expect(result.current.count).toBe(6);
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
    act(() => result.current.set(100));
    expect(result.current.count).toBe(100);
  });
});

describe("usePrevious", () => {
  it("returns the previous value", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "a" },
    });
    expect(result.current).toBeUndefined();
    rerender({ value: "b" });
    expect(result.current).toBe("a");
    rerender({ value: "c" });
    expect(result.current).toBe("b");
  });
});

describe("useLatest", () => {
  it("always returns the latest value without re-rendering", () => {
    const { result, rerender } = renderHook(({ value }) => useLatest(value), {
      initialProps: { value: 1 },
    });
    expect(result.current.current).toBe(1);
    const ref = result.current;
    rerender({ value: 2 });
    expect(result.current).toBe(ref); // same ref object
    expect(result.current.current).toBe(2);
  });
});

describe("useMounted", () => {
  it("is true after mount", () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });
});
