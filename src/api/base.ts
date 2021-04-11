import { deepCamel, deepSnake } from '@/utils';
import axios from 'axios';
import { Toast } from 'antd-mobile';
import { store } from '@/core/store';
import { history } from '@/core/router';
import { UPDATE_USER_INFO } from '@/redux/user/actions';

export const baseURL = '/api';
export const request = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

request.interceptors.request.use(
  config => {
    if (config.data) {
      Object.assign(config, {
        data: deepSnake(config.data),
      });
    }
    if (config.params) {
      Object.assign(config, {
        params: deepSnake(config.params),
      });
    }
    return config;
  },
);

request.interceptors.response.use(
  response => {
    const { data } = response;
    if (data.code !== 0) {
      return Object.assign(data, {
        error: { code: data.code, message: data.message },
        data: null,
      });
    }
    return Object.assign(data, {
      error: null,
      data: deepCamel(data.data) || {},
    });
  },
  error => {
    let message = 'API error';
    switch (error.response.status) {
      case 400:
      case 401:
        message = '登录过时，请重新登录';
        store.dispatch({ type: UPDATE_USER_INFO, payload: {} });
        history.replace('/login');
        break;
      default:
        message = error.response.data?.message || 'API error';
        break;
    }
    return Object.assign(error.response, {
      error: { code: 999, message },
      data: null,
    });
  },
);

request.interceptors.response.use(
  response => {
    const { error } = response;
    if (error && error.code !== 0) {
      Toast.fail(error.message);
    }
    return response;
  },
);
