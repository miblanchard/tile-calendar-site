/* eslint import/prefer-default-export: off */
import * as types from '../constants/actionTypes';

export const expandDates = id => ({
  type: types.EXPAND_DATES,
  id
});
