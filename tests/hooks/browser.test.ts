import { act, renderHook } from "@testing-library/react";
import {
  useClickOutside,
  useClipboard,
  useEventListener,
  useMediaQuery,
  useOnlineStatus,
  useWindowSize,
} from "../../src/hooks";

describe("useMediaQuery", () => {
  it("returns false before matchMedia reports true", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any);
    const { result } = renderHook(() => useMediaQuery("(min-width: 1000px)"));
    expect(result.current).toBe(false);
  });

  it("updates when media query changes", () => {
    const mql: any = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.mocked(window.matchMedia).mockReturnValue(mql);
    const { result } = renderHook(() => useMediaQuery("(min-width: 1000px)"));
    expect(result.current).toBe(false);
    act(() => {
      mql.matches = true;
      const handler = mql.addEventListener.mock.calls.find((c: any) => c[0] === "change")?.[1];
      handler({ matches: true });
    });
    expect(result.current).toBe(true);
  });
});

describe("useWindowSize", () => {
  it("reports window size and updates on resize", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 800 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 600 });
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 800, height: 600 });

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 768 });
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});

describe("useClickOutside", () => {
  it("calls handler when clicking outside the ref element", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => {
      const ref = { current: document.createElement("div") };
      document.body.appendChild(ref.current);
      ref.current.innerHTML = "<button>inside</button>";
      useClickOutside(ref, handler);
      return ref;
    });
    const outside = document.createElement("div");
    document.body.appendChild(outside);
    act(() => {
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(result.current.current!);
    document.body.removeChild(outside);
  });

  it("does not call handler when clicking inside", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => {
      const ref = { current: document.createElement("div") };
      document.body.appendChild(ref.current);
      ref.current.innerHTML = "<button>inside</button>";
      useClickOutside(ref, handler);
      return ref;
    });
    act(() => {
      result.current.current!.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(result.current.current!);
  });
});

describe("useEventListener", () => {
  it("adds and removes a window listener", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener(window, "resize", handler));
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("useClipboard", () => {
  it("copies text and reports support", () => {
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(""),
      },
    });
    const { result } = renderHook(() => useClipboard());
    expect(result.current.isSupported).toBe(true);
    return result.current.copy("hello").then((ok) => {
      expect(ok).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
    });
  });
});

describe("useOnlineStatus", () => {
  it("returns navigator.onLine and updates on events", () => {
    Object.defineProperty(navigator, "onLine", { writable: true, configurable: true, value: true });
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
    Object.defineProperty(navigator, "onLine", { writable: true, configurable: true, value: false });
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(result.current).toBe(false);
  });
});
