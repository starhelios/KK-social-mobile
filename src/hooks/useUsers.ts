import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IUser, IUserList } from '../interfaces/app';
import { handleError } from '../utils';

export const useUsers = () => {

  const getUserList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS;
    try {
      const { data } = await axios.get<IUserList>(url, API_CONFIG);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const getUserInformation = async (
    userId: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IUser = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const deleteUser = async (
    userId: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    try {
      const { data } = await axios.delete<IApiSuccess>(url, API_CONFIG);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const updateUserInformation = async (
    userId: string,
    email: string,
    fullname: string,
    dateOfBirth: string,
    aboutMe: string,
    location: string,
    categoryName: string,
    avatarUrl: string,
    isHost: boolean,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    let body = null;
    if (avatarUrl == '') {
      body = {
        userId,
        email,
        fullname,
        dateOfBirth,
        aboutMe,
        location,
        categoryName,
        isHost,
      };
    } else {
      body = {
        userId,
        email,
        fullname,
        dateOfBirth,
        aboutMe,
        location,
        categoryName,
        avatarUrl,
        isHost,
      };
    }

    try {
      const { data } = await axios.patch<IApiSuccess>(url, body, API_CONFIG);
      const result: IUser = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const updateZoomInformation = async (
    userId: string,
    email: string,
    zoomAuthToken: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    let body = {
      email,
      zoomAuthToken,
    };

    try {
      const { data } = await axios.patch<IApiSuccess>(url, body, API_CONFIG);
      console.log(data);
      const result: IUser = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        console.log(apiError);
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };


  return { getUserList, getUserInformation, deleteUser, updateUserInformation, updateZoomInformation };
};
