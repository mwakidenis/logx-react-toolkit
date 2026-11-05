/**
 * Array utilities.
 *
 * Pure, tree-shakable wrappers around @mwakidenis/logx array functions plus a
 * few React-oriented helpers. LOGX provides the core transformations; this
 * module exposes them with stable, documented signatures.
 */

import {
  chunk as logxChunk,
  compact as logxCompact,
  difference as logxDifference,
  drop as logxDrop,
  flatten as logxFlatten,
  flattenDeep as logxFlattenDeep,
  intersection as logxIntersection,
  last as logxLast,
  partition as logxPartition,
  sample as logxSample,
  shuffle as logxShuffle,
  take as logxTake,
  union as logxUnion,
  unique as logxUnique,
} from "../internal/logx";

export const chunk = logxChunk;
export const compact = logxCompact;
export const difference = logxDifference;
export const drop = logxDrop;
export const flatten = logxFlatten;
export const flattenDeep = logxFlattenDeep;
export const intersection = logxIntersection;
export const last = logxLast;
export const partition = logxPartition;
export const sample = logxSample;
export const shuffle = logxShuffle;
export const take = logxTake;
export const union = logxUnion;
export const unique = logxUnique;

/**
 * Return the first element of an array, or undefined.
 */
export function first<T>(array: readonly T[]): T | undefined {
  return array[0];
}

/**
 * Remove duplicates from an array using LOGX unique.
 */
export function distinct<T>(array: readonly T[]): T[] {
  return unique(array);
}
