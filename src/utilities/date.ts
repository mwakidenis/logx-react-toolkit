/**
 * Date utilities.
 *
 * Wrappers around @mwakidenis/logx date functions.
 */

import { addDays as logxAddDays, isValidDate as logxIsValidDate } from "../internal/logx";

export const addDays = logxAddDays;
export const isValidDate = logxIsValidDate;
