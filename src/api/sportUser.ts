import { request } from './base';

export interface SportUserInfo {
  id: number;
  nickname: string;
  username: string;
}

export interface AddSportUserParams {
  username: string;
  password: string;
}

export interface UpdateAddSportUserParams extends AddSportUserParams {
  id: number;
}

export const requestSportUsers = () => {
  return request.get<{ list: SportUserInfo[] }>('/sport_users');
};

export const updateSportUser = (params: UpdateAddSportUserParams) => {
  return request.put<SportUserInfo>('/sport_user', params);
};

export const requestSportUserById = (id: string) => {
  return request.get<SportUserInfo>(`/sport_users/${id}`);
};

export const addSportUser = (params: AddSportUserParams) => {
  return request.post<{}>('/sport_users/', params);
};

export const deleteSportUser = (id: string) => {
  return request.delete(`/sport_users/${id}`);
};

export const checkSportUserValid = (id: number) => {
  return request.get<{ isValid: boolean }>(`/sport_users/${id}/check_valid`);
};
