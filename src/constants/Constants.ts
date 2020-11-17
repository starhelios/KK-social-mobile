// Login Type
export const EMAIL_LOGIN = 'Email';


// Global Values
export var LOGIN_USER_TOKEN = '';
export const setUserToken = (token: string) => {
  LOGIN_USER_TOKEN = token;
};

export var LOGIN_USER_ID = 0;
export const setUserID = (id: number) => {
  LOGIN_USER_ID = id;
};
