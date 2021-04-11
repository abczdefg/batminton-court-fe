import { combineReducers } from 'redux';
import { createReducer } from '../utils';
import * as Actions from './actions';
import { UserState } from './types';

const reducers = {
  userInfo: createReducer(Actions.UPDATE_USER_INFO, {}),
};

export default combineReducers<UserState>(reducers);
