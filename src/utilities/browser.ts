/**
 * Browser environment utilities.
 *
 * Re-exports @mwakidenis/logx browser detection helpers so consumers can
 * write SSR-safe code without importing @mwakidenis/logx directly.
 */

import {
  hasLocalStorage as logxHasLocalStorage,
  hasSessionStorage as logxHasSessionStorage,
  isBrowser as logxIsBrowser,
  isNode as logxIsNode,
} from "../internal/logx";

export const hasLocalStorage = logxHasLocalStorage;
export const hasSessionStorage = logxHasSessionStorage;
export const isBrowser = logxIsBrowser;
export const isNode = logxIsNode;
