import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IBank, ICard, IFile, IUser, IUserList } from '../interfaces/app';
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
    avatar: IFile | null,
    bankInfo: IBank[],
    paymentInfo: ICard[],
    isHost: boolean,
  ): Promise<any> => {
    const url = API_ENDPOINT.USERS + '/' + userId;

    var body = new FormData();
    // body.append('userId', userId);
    body.append('email', email);
    body.append('fullname', fullname);
    body.append('categoryName', categoryName);
    body.append('aboutMe', aboutMe);
    body.append('location', location);
    body.append('dateOfBirth', dateOfBirth);
    body.append('isHost', isHost);
    // body.append('bankInfo', bankInfo.toString());
    // body.append('paymentInfo', paymentInfo.toString());
    if (avatar != null) {
      body.append('avatar', avatar);
    }

    try {
      const { data } = await axios.patch<any>(url, body, API_CONFIG);
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

  return { getUserList, getUserInformation, deleteUser, updateUserInformation };
};
