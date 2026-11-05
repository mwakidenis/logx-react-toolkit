/**
 * LOGX integration layer.
 *
 * This module is the single place where @mwakidenis/logx is imported. Every hook,
 * component or utility that needs a LOGX capability imports it from here rather
 * than importing @mwakidenis/logx directly. That keeps React-specific behaviour
 * separate from core utility behaviour and makes the dependency boundary obvious.
 *
 * Only confirmed, publicly exported LOGX functions are re-exported. No LOGX
 * internals are copied into this project and the parent repository is not modified.
 */

import {
  debounce as logxDebounce,
  throttle as logxThrottle,
  type Cancelable,
} from "@mwakidenis/logx/function";
import {
  isBrowser as logxIsBrowser,
  isNode as logxIsNode,
  hasLocalStorage as logxHasLocalStorage,
  hasSessionStorage as logxHasSessionStorage,
  localStorageHelpers as logxLocalStorageHelpers,
  sessionStorageHelpers as logxSessionStorageHelpers,
  safeStorage as logxSafeStorage,
  type StorageHelpers,
} from "@mwakidenis/logx/browser";
import {
  isArray,
  isBoolean,
  isEmail,
  isEmpty,
  isFunction,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isURL,
} from "@mwakidenis/logx/validation";
import {
  clone,
  deepClone,
  entries,
  get,
  has,
  invert,
  keys,
  mapKeys,
  mapValues,
  merge,
  omit,
  pick,
  set,
  values,
} from "@mwakidenis/logx/object";
import {
  clamp,
  inRange,
  percentage,
  randomInt,
  round,
} from "@mwakidenis/logx/number";
import {
  unique,
  partition,
  compact,
  first,
  last,
  take,
  drop,
  shuffle,
  sample,
  chunk,
  flatten,
  flattenDeep,
  difference,
  intersection,
  union,
} from "@mwakidenis/logx/array";
import { sleep, retry, withTimeout, timeout } from "@mwakidenis/logx/async";
import { addDays, isValidDate } from "@mwakidenis/logx/date";
import {
  escapeHtml,
  trim,
  truncate,
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
} from "@mwakidenis/logx/string";

export {
  logxDebounce as debounce,
  logxThrottle as throttle,
  type Cancelable,
  logxIsBrowser as isBrowser,
  logxIsNode as isNode,
  logxHasLocalStorage as hasLocalStorage,
  logxHasSessionStorage as hasSessionStorage,
  logxLocalStorageHelpers as localStorageHelpers,
  logxSessionStorageHelpers as sessionStorageHelpers,
  logxSafeStorage as safeStorage,
  type StorageHelpers,
  isNil,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isEmpty,
  isEmail,
  isFunction,
  isNull,
  isURL,
  clone,
  deepClone,
  get,
  set,
  pick,
  omit,
  merge,
  entries,
  keys,
  values,
  has,
  invert,
  mapKeys,
  mapValues,
  clamp,
  inRange,
  round,
  percentage,
  randomInt,
  unique,
  partition,
  compact,
  first,
  last,
  take,
  drop,
  shuffle,
  sample,
  chunk,
  flatten,
  flattenDeep,
  difference,
  intersection,
  union,
  sleep,
  retry,
  withTimeout,
  timeout,
  addDays,
  isValidDate,
  escapeHtml,
  trim,
  truncate,
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
};

/**
 * React-friendly wrapper around LOGX debounce that exposes a stable Cancelable
 * and validates the wait argument. Leading edge is not invoked by LOGX debounce
 * (trailing edge only); document this in hooks that use it.
 */
export interface LogxDebounceResult<F extends (...args: unknown[]) => unknown> {
  fn: F & Cancelable;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

export function createLogxDebounce<F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number,
): LogxDebounceResult<F> {
  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError("debounce: wait must be a non-negative number");
  }
  const debounced = logxDebounce(func, wait);
  return {
    fn: debounced,
    cancel: () => debounced.cancel(),
    flush: () => debounced.flush(),
    pending: () => debounced.pending(),
  };
}
