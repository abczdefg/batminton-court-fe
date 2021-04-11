import { request } from './base';

export interface UserInfo {
  username: string;
  password: string;
}

export const login = (params: UserInfo) => {
  return request.post<{}>('/session', params);
};

export const checkLogin = () => {
  return request.get<{}>('/session');
};

export const logout = () => {
  return request.delete<{}>('/session');
};
