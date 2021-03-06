const API_HOST = 'https://kloutkast-backend.herokuapp.com/v1';
// const API_HOST = 'http://127.0.0.1:4000/v1';

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
  EXPERIENCES_BY_HOST : `${API_HOST}/experiences/getExperiencesByHost`,
  UPDATE_EXPERIENCE   : `${API_HOST}/experiences/updateExperience`,
  BOOKING_RESERVE     : `${API_HOST}/experiences/reserve`,
  BOOKING_BUILD       : `${API_HOST}/experiences/build`,
  BOOKING_RESERVED    : `${API_HOST}/experiences/reserved`,
  BOOKING_COMPLETE    : `${API_HOST}/experiences/complete`,
  BOOKING_RATE        : `${API_HOST}/experiences/rate`,
  HOST_EXPERIENCE_LIST : `${API_HOST}/experiences/getHostExperiences`,

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
  DELETE_CARD             : `${API_HOST}/payments/delete-payment-method`,
  GENERATE_ACCOUNT_LINK   : `${API_HOST}/payments/generate/account_link`,
};
