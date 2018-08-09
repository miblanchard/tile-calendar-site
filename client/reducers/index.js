import { combineReducers } from 'redux';
// import productReducer from './productReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  ui: uiReducer,
  // products: productReducer
});

export default reducers;
