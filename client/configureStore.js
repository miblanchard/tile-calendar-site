import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';
import reducers from './reducers/index';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development' ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;
/* eslint-enable */

const configureStore = (initialState) => {
  // const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers
    // applyMiddleware(sagaMiddleware)
  );

  // store.runSaga = sagaMiddleware.run;
  // store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
