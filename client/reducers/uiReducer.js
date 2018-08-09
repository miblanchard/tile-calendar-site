import * as types from '../constants/actionTypes';

const initialState = {
  datesOpenIndex: 2,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXPAND_DATES:
      if (action.currentLength > state.datesOpenIndex + 1) {
        return {
          ...state,
          datesOpenIndex: state.datesOpenIndex + 1,
        };
      }
      return {
        ...state,
        datesOpenIndex: action.currentLength
      };

    default:
      return state;
  }
};

export default uiReducer;
