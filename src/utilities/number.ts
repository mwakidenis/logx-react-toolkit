/**
 * Number utilities.
 *
 * Wrappers around @mwakidenis/logx number functions.
 */

import {
  clamp as logxClamp,
  inRange as logxInRange,
  round as logxRound,
  percentage as logxPercentage,
  randomInt as logxRandomInt,
} from "../internal/logx";

export const clamp = logxClamp;
export const inRange = logxInRange;
export const round = logxRound;
export const percentage = logxPercentage;
export const randomInt = logxRandomInt;
