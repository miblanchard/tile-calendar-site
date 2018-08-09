/* eslint import/prefer-default-export: off */
import * as types from '../constants/actionTypes';

export const expandDates = currentLength => ({
  type: types.EXPAND_DATES,
  currentLength
});
