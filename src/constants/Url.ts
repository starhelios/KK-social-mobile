// const API_HOST = 'https://kloutkast-backend.herokuapp.com/v1';
// const API_HOST = 'http://192.168.101.16:4000/v1';
const API_HOST = 'http://127.0.0.1:4000/v1';

export const API_ENDPOINT = {
  // Authentication
  USER_REGISTER : `${API_HOST}/auth/register`,
  USER_LOGIN    : `${API_HOST}/auth/login`,
  USER_LOGOUT   : `${API_HOST}/auth/logout`,
  USER_REFRESH_TOKEN    : `${API_HOST}/auth/refresh-tokens`,
  USER_CHANGE_PASSWORD  : `${API_HOST}/auth/change-password`,
  USER_FORGOT_PASSWORD  : `${API_HOST}/auth/forgot-password`,
  USER_RESET_PASSWORD   : `${API_HOST}/auth/reset-password`,
  USER_LOGIN_GOOGLE     : `${API_HOST}/auth/google-login`,
  
  // Users
  USERS         : `${API_HOST}/users`,

  // Categories
  CATEGORIES        : `${API_HOST}/categories`,
  CATEGORIES_SEARCH : `${API_HOST}/categories/search`,

  // Experiences
  EXPERIENCES         : `${API_HOST}/experiences`,
  EXPERIENCES_FILTER  : `${API_HOST}/experiences/filter`,

  // Hosts
  HOSTS : `${API_HOST}/hosts`,

  // Tutorials
  TUTORIALS : `${API_HOST}/tutorials`,

  // Search
  SEARCH : `${API_HOST}/search`,

  // Card
  CARD : `${API_HOST}/users/card`,
  
};
