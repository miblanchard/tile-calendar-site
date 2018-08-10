import reducerRegistry from '../reducerRegistry';

const createActionName = name => `nyc_comedy_calendar/ui/${name}`;
export const EXPAND_DATES = createActionName('EXPAND_DATES');
export const expandDates = currentLength => ({ type: EXPAND_DATES, currentLength });

const initialState = {
  datesOpenIndex: 2,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EXPAND_DATES:
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
}

reducerRegistry.register('ui', reducer);
