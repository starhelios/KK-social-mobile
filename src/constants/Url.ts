import { AxiosRequestConfig } from 'axios';
import { LOGIN_USER_TOKEN } from '.';

const API_HOST = 'https://admin.finderscope.com/api/v1';

export const API_ENDPOINT = {
  // Login User
  LOGIN_EMAIL     : `${API_HOST}/rest-auth/login/`,
};

export const API_CONFIG: AxiosRequestConfig = {
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + LOGIN_USER_TOKEN,
  },
};
