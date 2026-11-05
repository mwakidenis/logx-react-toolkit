/**
 * Validation utilities.
 *
 * Wrappers around @mwakidenis/logx validation functions with type-guard
 * signatures preserved, plus React-oriented helpers.
 */

import {
  isArray as logxIsArray,
  isBoolean as logxIsBoolean,
  isEmail as logxIsEmail,
  isEmpty as logxIsEmpty,
  isFunction as logxIsFunction,
  isNil as logxIsNil,
  isNull as logxIsNull,
  isNumber as logxIsNumber,
  isObject as logxIsObject,
  isString as logxIsString,
  isURL as logxIsURL,
} from "../internal/logx";

export const isArray = logxIsArray;
export const isBoolean = logxIsBoolean;
export const isEmail = logxIsEmail;
export const isEmpty = logxIsEmpty;
export const isFunction = logxIsFunction;
export const isNil = logxIsNil;
export const isNull = logxIsNull;
export const isNumber = logxIsNumber;
export const isObject = logxIsObject;
export const isString = logxIsString;
export const isURL = logxIsURL;

/**
 * Required-field validator: returns an error message when the value is nil or
 * an empty string, otherwise null.
 */
export function required(value: unknown, fieldName = "This field"): string | null {
  if (isNil(value)) return `${fieldName} is required`;
  if (isString(value) && value.trim() === "") return `${fieldName} is required`;
  return null;
}
