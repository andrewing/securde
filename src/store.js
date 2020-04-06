import {combineReducers, createStore} from 'redux';
import * as r from './redux';

const rootReducer = combineReducers({
  ...r,
});

const store = createStore(rootReducer);
export default store;
