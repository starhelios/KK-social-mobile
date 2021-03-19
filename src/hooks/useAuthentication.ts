import axios from 'axios';

// from app
import { 
  API_CONFIG, 
  API_ENDPOINT, 
  EMAIL_LOGIN, 
  GOOGLE_LOGIN, 
  SetApiConfig, 
  SetLoginState, 
} from '../constants';
import { ILoginUser, IToken, ITokens, IUser } from '../interfaces/app';
import { handleError } from '../utils';
import { IApiSuccess, IApiSuccessMessage } from '../interfaces/api';
import { ActionType } from '../redux/Reducer';
import { useDispatch } from '../redux/Store';


export const useAuthentication = () => {

  const dispatch = useDispatch();
  
  const registerUser = async (
    fullname: string,
    email: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_REGISTER;
    const body = {
      fullname,
      email,
      password,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body);
      const result: ILoginUser = data.payload;
      SetLoginState(EMAIL_LOGIN);
      setLoginUserInfo(result);
      return Promise.resolve(true);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_LOGIN;
    const body = {
      email,
      password,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body);
      const result: ILoginUser = data.payload;
      SetLoginState(EMAIL_LOGIN);
      setLoginUserInfo(result);
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  const logoutUser = async (
    refreshToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_LOGOUT;
    const body = {
      refreshToken,
    }
    SetLoginState('');
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      return Promise.resolve(true);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  // dragon_need
  const refreshTokens = async (
    refreshToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_REFRESH_TOKEN;
    const body = {
      refreshToken,
    }
    try {
      const { data } = await axios.post<ITokens>(url, body, API_CONFIG);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      return Promise.resolve(true);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(false);
      }
    }
  };

  const forgotPassword = async (
    email: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_FORGOT_PASSWORD;
    const body = {
      email,
    }

    try {
      const { data } = await axios.post<IApiSuccessMessage>(url, body);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const changePassword = async (
    userId: string,
    password: string,
    newPassword: string,
    setFirstPass: boolean,
  ): Promise<any> => {
    const url = `${API_ENDPOINT.USER_CHANGE_PASSWORD}/${userId}`;
    const body = {
      userId,
      password,
      newPassword,
      setFirstPass,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  // dragon_need
  const resetPassword = async (
    token: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_RESET_PASSWORD + "?token=" + token;
    const body = {
      password,
    }
    try {
      const { data } = await axios.post<IApiSuccessMessage>(url, body);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const setLoginUserInfo = (loginUser: ILoginUser) => {
    // google user
    if (loginUser.user === undefined) {
      setLoginUser(loginUser.newUser);

    // email user
    } else {
      setLoginUser(loginUser.user);
    }
    setAccessToken(loginUser.tokens.access);
    setRefreshToken(loginUser.tokens.refresh);
  };

  const setLoginUser = (user: IUser) => {
    dispatch({
      type: ActionType.SET_USER_INFO,
      payload: user,
    });
  }

  const setAccessToken = (token: IToken) => {
    dispatch({
      type: ActionType.SET_ACCESS_TOKEN,
      payload: {
        token: token.token,
        expires: token.expires, 
      },
    });
    SetApiConfig(token.token);
  };

  const setRefreshToken = (token: IToken) => {
    dispatch({
      type: ActionType.SET_REFRESH_TOKEN,
      payload: {
        token: token.token,
        expires: token.expires, 
      },
    });
  };

  const loginByGoogle = async (
    accessToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_LOGIN_GOOGLE;
    const body = {
      accessToken,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body);
      const result: ILoginUser = data.payload;
      SetLoginState(GOOGLE_LOGIN);
      setLoginUserInfo(result);
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  return { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshTokens, 
    changePassword, 
    forgotPassword, 
    resetPassword, 
    setLoginUser, 
    loginByGoogle, 
  };
};
