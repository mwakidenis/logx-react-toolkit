import { act, renderHook } from "@testing-library/react";
import { useAsync } from "../../src/hooks";

describe("useAsync", () => {
  it("tracks loading, success and error states", async () => {
    const fn = vi.fn().mockResolvedValue("data");
    const { result } = renderHook(() => useAsync(fn, false));
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.execute();
    });
    expect(result.current.isLoading).toBe(true);
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toBe("data");
    expect(fn).toHaveBeenCalled();
  });

  it("sets error state on failure", async () => {
    const error = new Error("boom");
    const fn = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync(fn, false));
    act(() => {
      result.current.execute();
    });
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
  });

  it("invokes immediately when immediate is true", async () => {
    const fn = vi.fn().mockResolvedValue("immediate");
    const { result } = renderHook(() => useAsync(fn, true));
    expect(result.current.isLoading).toBe(true);
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.isSuccess).toBe(true);
    expect(fn).toHaveBeenCalled();
  });

  it("setData / setError / reset / cancel work", async () => {
    const fn = vi.fn().mockResolvedValue("data");
    const { result } = renderHook(() => useAsync(fn, false));
    act(() => {
      result.current.setData("manual");
    });
    expect(result.current.data).toBe("manual");
    expect(result.current.isSuccess).toBe(true);
    act(() => {
      result.current.setError(new Error("manual error"));
    });
    expect(result.current.isError).toBe(true);
    act(() => {
      result.current.reset();
    });
    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("cancels in-flight requests", async () => {
    let resolve: (value: string) => void = () => {};
    const promise = new Promise<string>((r) => { resolve = r; });
    const fn = vi.fn().mockReturnValue(promise);
    const { result } = renderHook(() => useAsync(fn, false));
    act(() => {
      result.current.execute();
    });
    act(() => {
      result.current.cancel();
    });
    resolve("too late");
    await act(async () => {
      await promise;
    });
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("race condition protection: latest invocation wins", async () => {
    const fn = vi.fn().mockImplementation(() => new Promise<string>((resolve) => setTimeout(() => resolve("first"), 50)));
    const fn2 = vi.fn().mockResolvedValue("second");
    const { result, rerender } = renderHook(({ f }) => useAsync(f, false), { initialProps: { f: fn } });
    act(() => { result.current.execute(); });
    rerender({ f: fn2 });
    act(() => { result.current.execute(); });
    await act(async () => { await new Promise((r) => setTimeout(r, 100)); });
    expect(result.current.data).toBe("second");
  });
});
