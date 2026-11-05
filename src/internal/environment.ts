/**
 * Environment detection helpers.
 *
 * All checks are safe to evaluate at module load time (they use `typeof`)
 * and do not throw in server-side rendering environments. Prefer calling the
 * predicate functions inside effects or event handlers rather than relying on
 * a module-level boolean for render logic, to keep components SSR-safe.
 */

export const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

export const isNode =
  typeof process !== "undefined" &&
  typeof process.versions !== "undefined" &&
  typeof process.versions.node !== "undefined";

export const hasLocalStorage = typeof localStorage !== "undefined";

export const hasSessionStorage = typeof sessionStorage !== "undefined";

/**
 * Return the global `window` object when available, otherwise `undefined`.
 * Safe to call at any time; never throws in SSR.
 */
export function getWindow(): Window | undefined {
  return typeof window !== "undefined" ? window : undefined;
}

/**
 * Return the global `document` object when available, otherwise `undefined`.
 * Safe to call at any time; never throws in SSR.
 */
export function getDocument(): Document | undefined {
  return typeof document !== "undefined" ? document : undefined;
}
