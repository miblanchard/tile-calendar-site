import reducerRegistry from '../reducerRegistry';

const initialState = {
  datesOpenIndex: {},
};

const reducerName = 'ui';
const createActionName = name => `nyc_comedy_calendar/${reducerName}/${name}`;
export const EXPAND_DATES = createActionName('EXPAND_DATES');
export const expandDates = (currentLength, id) => ({ type: EXPAND_DATES, currentLength, id });


export default function reducer(state = {}, action) {
  console.log('action', action);
  console.log('state', state);
  switch (action.type) {
    case EXPAND_DATES:
      if (!state[`datesOpenIndex${action.id}`]) {
        return {
          ...state,
          [`datesOpenIndex${action.id}`]: 2
        };
      }
      if (action.currentLength > state[`datesOpenIndex${action.id}`] + 1) {
        return {
          ...state,
          [`datesOpenIndex${action.id}`]: state[`datesOpenIndex${action.id}`] + 1,
        };
      }
      return {
        ...state,
        [`datesOpenIndex${action.id}`]: action.currentLength
      };

    default:
      return state;
  }
}

reducerRegistry.register('ui', reducer);
