import { act, renderHook } from "@testing-library/react";
import { difference, intersection, partition, union, unique } from "../../src/utilities/array";
import { useArray, useObject } from "../../src/hooks";
import { clone, entries, get, keys, merge, omit, pick, values } from "../../src/utilities/object";

describe("useArray", () => {
  it("manages array state immutably", () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]));
    expect(result.current.array).toEqual([1, 2, 3]);
    act(() => result.current.push(4));
    expect(result.current.array).toEqual([1, 2, 3, 4]);
    act(() => result.current.unshift(0));
    expect(result.current.array).toEqual([0, 1, 2, 3, 4]);
    act(() => result.current.remove(2));
    expect(result.current.array).toEqual([0, 1, 3, 4]);
    act(() => result.current.update(1, 99));
    expect(result.current.array).toEqual([0, 99, 3, 4]);
    act(() => result.current.clear());
    expect(result.current.array).toEqual([]);
  });

  it("removeBy filters by predicate", () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));
    act(() => result.current.removeBy((v) => v % 2 === 0));
    expect(result.current.array).toEqual([1, 3, 5]);
  });

  it("reset restores initial value", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current.push(4));
    act(() => result.current.reset());
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it("unique delegates to LOGX unique", () => {
    const { result } = renderHook(() => useArray([1, 2, 2, 3, 3]));
    act(() => result.current.unique());
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it("compact delegates to LOGX compact", () => {
    const { result } = renderHook(() => useArray([0, 1, null, 2, undefined, 3]));
    act(() => result.current.compact());
    expect(result.current.array).toEqual([0, 1, 2, 3]);
  });

  it("first / last / take / drop delegate to LOGX", () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));
    expect(result.current.first()).toBe(1);
    expect(result.current.last()).toBe(5);
    expect(result.current.take(2)).toEqual([1, 2]);
    expect(result.current.drop(2)).toEqual([3, 4, 5]);
  });

  it("exposes LOGX pure helpers difference/intersection/union/partition", () => {
    expect(difference([1, 2, 3], [2, 3])).toEqual([1]);
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(partition([1, 2, 3, 4], (v) => v % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it("unique removes duplicates via LOGX", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });
});

describe("useObject", () => {
  it("manages object state immutably", () => {
    const { result } = renderHook(() => useObject({ a: 1, b: 2 }));
    expect(result.current.object).toEqual({ a: 1, b: 2 });
    act(() => result.current.setKey("c", 3));
    expect(result.current.object).toEqual({ a: 1, b: 2, c: 3 });
    act(() => result.current.removeKey("b"));
    expect(result.current.object).toEqual({ a: 1, c: 3 });
    act(() => result.current.clear());
    expect(result.current.object).toEqual({});
  });

  it("set with updater function", () => {
    const { result } = renderHook(() => useObject({ count: 0 }));
    act(() => result.current.set((prev) => ({ ...prev, count: prev.count + 1 })));
    expect(result.current.object.count).toBe(1);
  });

  it("reset restores initial value", () => {
    const { result } = renderHook(() => useObject({ a: 1 }));
    act(() => result.current.setKey("b", 2));
    act(() => result.current.reset());
    expect(result.current.object).toEqual({ a: 1 });
  });

  it("pick / omit / keys / values / entries delegate to LOGX", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    expect(keys(obj)).toEqual(["a", "b", "c"]);
    expect(values(obj)).toEqual([1, 2, 3]);
    expect(entries(obj)).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  it("get retrieves nested path", () => {
    const obj = { user: { name: "Alice" } };
    expect(get(obj, "user.name")).toBe("Alice");
    expect(get(obj, "user.age", "N/A")).toBe("N/A");
  });

  it("merge combines sources", () => {
    expect(merge({ a: 1 }, { b: 2 }, { a: 10 })).toEqual({ a: 10, b: 2 });
  });

  it("clone / deepClone produce copies", () => {
    const obj = { a: 1, nested: { b: 2 } };
    const c = clone(obj);
    expect(c).toEqual(obj);
    expect(c).not.toBe(obj);
  });
});
