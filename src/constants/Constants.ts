// Login Type
export const EMAIL_LOGIN = 'Email';

// Values
export const MARGIN_TOP = 20;
export const LOADING_TIME = 0; //1000;


// Global Values
export var LOGIN_USER_TOKEN = '';
export const setUserToken = (token: string) => {
  LOGIN_USER_TOKEN = token;
};

export var LOGIN_USER_ID = 0;
export const setUserID = (id: number) => {
  LOGIN_USER_ID = id;
};
