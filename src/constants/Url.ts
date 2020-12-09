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
  
  // Users

  // Categories
  CATEGORIES : `${API_HOST}/categories/`,

  // Hosts
  HOSTS : `${API_HOST}/hosts/`,
};
