import { createStore, compose, combineReducers } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';
// import reducers from './reducers/index';
import reducerRegistry from './reducerRegistry';
import * as ducks from './modules/index'; // eslint-disable-line

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development' ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;
/* eslint-enable */

const configureStore = (initialState) => {
  const combine = (reducers) => {
    /*
      By default, once an action is dispatched, Redux will throw away state that is not tied to a
      known reducer. To avoid that, reducer stubs are created to preserve the state.
    */
    const reducerNames = Object.keys(reducers);
    if (initialState) {
      Object.keys(initialState).forEach((item) => {
        if (reducerNames.indexOf(item) === -1) {
          reducers[item] = (state = null) => state; // eslint-disable-line
        }
      });
    }
    return combineReducers(reducers);
  };

  const reducers = combine(reducerRegistry.getReducers());

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers
  );

  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener((newReducers) => {
    console.log('setchange', newReducers);
    store.replaceReducer(combine(newReducers));
  });

  return store;
};


export default configureStore;
