import { AxiosRequestConfig } from 'axios';
import { LOGIN_USER_TOKEN } from '.';

const API_HOST = 'https://admin.finderscope.com/api/v1';

export const API_ENDPOINT = {
  // Home Tab
  EXPERIENCE_CATEGORY_LIST  : `${API_HOST}/rest-auth/login/`,
  EXPERIENCE_LIST           : `${API_HOST}/rest-auth/login/`,
  HOST_LIST                 : `${API_HOST}/rest-auth/login/`,

  // Booking Tab
  COMPLETED_BOOKING_LIST    : `${API_HOST}/rest-auth/login/`,
  UPCOMING_BOOKING_LIST     : `${API_HOST}/rest-auth/login/`,
};

export const API_CONFIG: AxiosRequestConfig = {
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + LOGIN_USER_TOKEN,
  },
};
