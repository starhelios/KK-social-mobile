import { AxiosRequestConfig } from 'axios';
import { LOGIN_USER_TOKEN } from '.';

const API_HOST = 'https://kloutkast-backend.herokuapp.com/v1';

export const API_ENDPOINT = {
  // Authentication
  USER_REGISTER : `${API_HOST}/auth/register`,
  USER_LOGIN    : `${API_HOST}/auth/login`,
  USER_LOGOUT   : `${API_HOST}/auth/logout`,
  USER_REFRESH_TOKEN    : `${API_HOST}/auth/refresh-tokens`,
  USER_CHANGE_PASSWORD  : `${API_HOST}/auth/change-password`,
  USER_FORGOT_PASSWORD  : `${API_HOST}/auth/forgot-password`,
  USER_RESET_PASSWORD   : `${API_HOST}/auth/reset-password`,
  


  // Home Tab
  EXPERIENCE_CATEGORY_LIST  : `${API_HOST}/rest-auth/login/`,
  EXPERIENCE_LIST           : `${API_HOST}/rest-auth/login/`,
  HOST_LIST                 : `${API_HOST}/rest-auth/login/`,

  // Booking Tab
  COMPLETED_BOOKING_LIST    : `${API_HOST}/rest-auth/login/`,
  UPCOMING_BOOKING_LIST     : `${API_HOST}/rest-auth/login/`,

  // Profile Tab
  PROFILE_HELP              : `${API_HOST}/rest-auth/login/`,
};

export const API_CONFIG: AxiosRequestConfig = {
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + LOGIN_USER_TOKEN,
  },
};
