import * as types from '../constants/actionTypes';

const initialState = {
  datesOpenIndex: 2,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXPAND_DATES:
      return {
        ...state,
        datesOpenIndex: state.datesOpenIndex + 1,
      };

    default:
      return state;
  }
};

export default uiReducer;
