import { combineReducers } from 'redux';
import userReducers from './user/reducers';
import { AppState } from './types';

const rootReducer = {
  user: userReducers,
};

export default combineReducers<AppState>(rootReducer);
