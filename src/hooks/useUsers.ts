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
    avatarUrl: IFile | null,
    categoryName: string,
    aboutMe: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;
    /*
    var body = new FormData();
    body.append('userId', userId);
    body.append('email', email);
    body.append('fullname', fullname);
    body.append('categoryName', categoryName);
    body.append('aboutMe', aboutMe);
    if (avatarUrl != null) {
      body.append('avatarUrl', avatarUrl);
    }
*/
    var body;
    if (avatarUrl == null) {
     body = {
        email,
        fullname,
        categoryName,
        aboutMe,
      }
    } else {
      body = {
        email,
        fullname,
        // avatarUrl,
        categoryName,
        aboutMe,
      }
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
