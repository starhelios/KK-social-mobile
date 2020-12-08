import axios from 'axios';

// from app
import { API_CONFIG, API_ENDPOINT, setUserToken } from '../constants';
import { ILoginUser, IToken, ITokens } from '../interfaces/app';
import { handleError } from '../utils';
import { IApiSuccess, IApiSuccessMessage } from '../interfaces/api';
import { ActionType } from '../redux/Reducer';
import { useDispatch } from '../redux/Store';


export const useAuthentication = () => {

  const dispatch = useDispatch();
  
  // Register User
  const registerUser = async (
    fullname: string,
    email: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_REGISTER;
    const body = {
      fullname: fullname,
      email: email,
      password: password,
    }

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: ILoginUser = data.payload;
      setLoginUser(result);
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

  // Login User
  const loginUser = async (
    email: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_LOGIN;
    const body = {
      email: email,
      password: password,
    }

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: ILoginUser = data.payload;
      setLoginUser(result);
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

  // Logout User
  const logoutUser = async (
    refreshToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_LOGOUT;
    const body = {
      refreshToken: refreshToken,
    }

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

  // Refresh Tokens
  const refreshTokens = async (
    refreshToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_REFRESH_TOKEN;
    const body = {
      refreshToken: refreshToken,
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

  // Forgot Password
  const forgotPassword = async (
    email: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_FORGOT_PASSWORD;
    const body = {
      email: email,
    }

    try {
      const { data } = await axios.post<IApiSuccessMessage>(url, body, API_CONFIG);
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

  // Change Password
  const changePassword = async (
    userId: string,
    password: string,
    newPassword: string,
    setFirstPass: boolean,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_CHANGE_PASSWORD;
    const body = {
      userId: userId,
      password: password,
      newPassword: newPassword,
      setFirstPass: setFirstPass,
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

  // Reset Password
  const resetPassword = async (
    token: string,
    password: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USER_RESET_PASSWORD + "?token=" + token;
    const body = {
      password: password,
    }

    try {
      const { data } = await axios.post<IApiSuccessMessage>(url, body, API_CONFIG);
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

  const setLoginUser = (loginUser: ILoginUser) => {
    dispatch({
      type: ActionType.SET_USER_INFO,
      payload: {
        id: loginUser.user.id,
        fullname: loginUser.user.fullname,
        isHost: loginUser.user.isHost,
        email: loginUser.user.email,
        status: loginUser.user.status,
        
        image: loginUser.user.image,
        birthday: loginUser.user.birthday, 
      },
    });

    setAccessToken(loginUser.tokens.access);
    setRefreshToken(loginUser.tokens.refresh);
  };

  const setAccessToken = (token: IToken) => {
    dispatch({
      type: ActionType.SET_ACCESS_TOKEN,
      payload: {
        token: token.token,
        expires: token.expires, 
      },
    });
    setUserToken(token.token);
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

  return { registerUser, loginUser, logoutUser, refreshTokens, changePassword, forgotPassword, resetPassword };
};
