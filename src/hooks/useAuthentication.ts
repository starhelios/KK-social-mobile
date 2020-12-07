import axios from 'axios';


// from app
import { API_CONFIG, API_ENDPOINT, ERROR_MESSAGE } from '../constants';
import { ILoginUser } from '../interfaces/app';
import { handleError } from '../utils';
import { IApiSuccess } from '../interfaces/api';

export const useAuthentication = () => {

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
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(ERROR_MESSAGE.REGISTER_FAIL);
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
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(ERROR_MESSAGE.LOGIN_FAIL);
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
        return Promise.reject(false);
      }
    }
  };

  return { registerUser, loginUser, logoutUser };
};
