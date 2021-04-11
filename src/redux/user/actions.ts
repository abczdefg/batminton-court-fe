import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  login as loginRequest,
  UserInfo,
} from '@/api';
import { UserState } from './types';

type UserThunkAction = ThunkAction<void, UserState, null, Action<string>>;

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const login = (userInfo: UserInfo): UserThunkAction => async dispatch => {
  const res = await loginRequest(userInfo);
  dispatch({ type: UPDATE_USER_INFO, payload: res.error ? {} : res.data });
  return res;
};
