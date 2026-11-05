import { act, renderHook } from "@testing-library/react";
import { useLocalStorage, useSessionStorage } from "../../src/hooks/storage";

const getStorage = () => window.localStorage;

describe("useLocalStorage", () => {
  beforeEach(() => {
    getStorage().clear();
  });

  it("returns initial value and persists to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));
    expect(result.current[0]).toBe("initial");
    act(() => result.current[1]("stored"));
    expect(result.current[0]).toBe("stored");
    expect(getStorage().getItem("key")).toBe(JSON.stringify("stored"));
  });

  it("reads existing value from localStorage after mount", () => {
    getStorage().setItem("existing", JSON.stringify("from-storage"));
    const { result } = renderHook(() => useLocalStorage("existing", "initial"));
    expect(result.current[0]).toBe("from-storage");
  });

  it("supports functional updater", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));
    act(() => result.current[1]((prev: number) => prev + 1));
    expect(result.current[0]).toBe(1);
    act(() => result.current[1]((prev: number) => prev + 1));
    expect(result.current[0]).toBe(2);
  });

  it("remove resets to initial and clears storage", () => {
    const { result } = renderHook(() => useLocalStorage("rem", "initial"));
    act(() => result.current[1]("value"));
    expect(getStorage().getItem("rem")).toBeTruthy();
    act(() => result.current[2]());
    expect(result.current[0]).toBe("initial");
    expect(getStorage().getItem("rem")).toBeNull();
  });

  it("handles missing storage gracefully", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", { value: undefined, writable: true });
    try {
      const { result } = renderHook(() => useLocalStorage("x", "fallback"));
      expect(result.current[0]).toBe("fallback");
      act(() => result.current[1]("anything"));
      expect(result.current[0]).toBe("anything");
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
      else Object.defineProperty(window, "localStorage", { value: undefined, writable: true });
      getStorage().clear();
    }
  });
});

describe("useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("persists to sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("skey", "initial"));
    act(() => result.current[1]("stored"));
    expect(result.current[0]).toBe("stored");
    expect(window.sessionStorage.getItem("skey")).toBe(JSON.stringify("stored"));
  });

  it("reads existing value after mount", () => {
    window.sessionStorage.setItem("sexisting", JSON.stringify("from-storage"));
    const { result } = renderHook(() => useSessionStorage("sexisting", "initial"));
    expect(result.current[0]).toBe("from-storage");
  });
});
