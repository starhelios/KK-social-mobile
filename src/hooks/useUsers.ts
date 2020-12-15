import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IFile, IUser, IUserList } from '../interfaces/app';
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
    avatarUrl: IFile,
    categoryName: string,
    aboutMe: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    const body = {
      email,
      fullname,
      avatarUrl,
      // categoryName,
      // aboutMe,
    }
    try {
      const { data } = await axios.patch<any>(url, body, API_CONFIG);
      console.log(data);
      const result: IUser = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      console.log(apiError);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  return { getUserList, getUserInformation, deleteUser, updateUserInformation };
};
