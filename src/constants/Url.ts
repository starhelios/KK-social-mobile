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
  BOOKING_RESERVATION : `${API_HOST}/users/booking/reservation`,
  BOOKING_JOIN : `${API_HOST}/users/booking/join`,

  // Categories
  CATEGORIES        : `${API_HOST}/categories`,
  CATEGORIES_SEARCH : `${API_HOST}/categories/search`,

  // Experiences
  EXPERIENCES         : `${API_HOST}/experiences`,
  EXPERIENCES_FILTER  : `${API_HOST}/experiences/filter`,
  // BOOKING_RESERVATION : `${API_HOST}/experiences/reserve`,
  // BOOKING_JOIN        : `${API_HOST}/experiences/join`,

  // Hosts
  HOSTS : `${API_HOST}/hosts`,

  // Tutorials
  TUTORIALS : `${API_HOST}/tutorials`,

  // Search
  SEARCH : `${API_HOST}/search`,

  // Payments
  GENERATE_PAYMENT_INTENT : `${API_HOST}/payments/charge-generate-intent/experience`,
  SAVE_TRANSACTION        : `${API_HOST}/payments/save-transaction`,
  ADD_CARD                : `${API_HOST}/payments/methods/card`,
  
};
