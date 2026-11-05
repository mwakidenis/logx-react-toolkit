/**
 * String utilities.
 *
 * Wrappers around @mwakidenis/logx string functions plus a React-oriented
 * HTML escaper for safe rendering.
 */

import {
  camelCase as logxCamelCase,
  capitalize as logxCapitalize,
  escapeHtml as logxEscapeHtml,
  kebabCase as logxKebabCase,
  pascalCase as logxPascalCase,
  snakeCase as logxSnakeCase,
  trim as logxTrim,
  truncate as logxTruncate,
} from "../internal/logx";

export const camelCase = logxCamelCase;
export const capitalize = logxCapitalize;
export const escapeHtml = logxEscapeHtml;
export const kebabCase = logxKebabCase;
export const pascalCase = logxPascalCase;
export const snakeCase = logxSnakeCase;
export const trim = logxTrim;
export const truncate = logxTruncate;

/**
 * Escape HTML special characters so a string can be interpolated safely.
 * Delegates to @mwakidenis/logx escapeHtml.
 */
export function htmlEscape(input: string): string {
  return escapeHtml(input);
}
