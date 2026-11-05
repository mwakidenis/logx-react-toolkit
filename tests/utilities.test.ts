import { describe, expect, test } from "vitest";
import {
  addDays,
  clamp,
  escapeHtml,
  htmlEscape,
  isEmail,
  isEmpty,
  isNil,
  isURL,
  randomInt,
  required,
  round,
  safeGet,
  truncate,
} from "../src/utilities";

describe("utilities/string", () => {
  test("escapeHtml escapes dangerous characters", () => {
  expect(escapeHtml("<script>alert('x')</script>")).toBe(
    "&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;",
  );
  });

  test("htmlEscape aliases escapeHtml", () => {
    expect(htmlEscape("<b>hi</b>")).toBe(escapeHtml("<b>hi</b>"));
  });

  test("truncate shortens long strings", () => {
    expect(truncate("hello world", { length: 5 })).toBe("he...");
  });
});

describe("utilities/object", () => {
  test("safeGet returns undefined for missing paths", () => {
    expect(safeGet({ a: { b: 1 } }, "a.b")).toBe(1);
    expect(safeGet({ a: { b: 1 } }, "a.c")).toBeUndefined();
    expect(safeGet(null, "a.b")).toBeUndefined();
  });
});

describe("utilities/validation", () => {
  test("isNil / isEmpty / isEmail / isURL", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmail("a@b.com")).toBe(true);
    expect(isEmail("not-email")).toBe(false);
    expect(isURL("https://example.com")).toBe(true);
    expect(isURL("not-url")).toBe(false);
  });

  test("required validator", () => {
    expect(required(null)).toBe("This field is required");
    expect(required("")).toBe("This field is required");
    expect(required("  ")).toBe("This field is required");
    expect(required("value")).toBeNull();
    expect(required(undefined, "Email")).toBe("Email is required");
  });
});

describe("utilities/number", () => {
  test("clamp / round / randomInt", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(100, 0, 10)).toBe(10);
    expect(round(1.234, 2)).toBe(1.23);
    const r = randomInt(1, 3);
    expect(r).toBeGreaterThanOrEqual(1);
    expect(r).toBeLessThanOrEqual(3);
  });
});

describe("utilities/date", () => {
  test("addDays", () => {
    const d = new Date("2026-01-01");
    const later = addDays(d, 5);
    expect(later.getDate()).toBe(6);
  });
});
