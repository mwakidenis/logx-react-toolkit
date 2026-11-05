/**
 * Object utilities.
 *
 * Wrappers around @mwakidenis/logx object functions with stable signatures.
 */

import {
  clone as logxClone,
  deepClone as logxDeepClone,
  entries as logxEntries,
  get as logxGet,
  has as logxHas,
  keys as logxKeys,
  mapKeys as logxMapKeys,
  mapValues as logxMapValues,
  merge as logxMerge,
  omit as logxOmit,
  pick as logxPick,
  set as logxSet,
  values as logxValues,
} from "../internal/logx";

export const clone = logxClone;
export const deepClone = logxDeepClone;
export const entries = logxEntries;
export const get = logxGet;
export const has = logxHas;
export const keys = logxKeys;
export const mapKeys = logxMapKeys;
export const mapValues = logxMapValues;
export const merge = logxMerge;
export const omit = logxOmit;
export const pick = logxPick;
export const set = logxSet;
export const values = logxValues;

/**
 * Safely get a nested value, returning undefined when the path is missing.
 */
export function safeGet<T>(object: unknown, path: string | Array<string | number>): T | undefined {
  const result = logxGet(object, path);
  return result === undefined ? undefined : (result as T);
}
