import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IUser, IUserList } from '../interfaces/app';
import { handleError } from '../utils';
import { useAuthentication } from '.';

export const useUsers = () => {

  const { setLoginUser } = useAuthentication();

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
    // bankInfo: IBank[],
    // paymentInfo: ICard[],
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

    // var body = new FormData();
    // body.append('email', email);
    // body.append('fullname', fullname);
    // body.append('categoryName', categoryName);
    // body.append('aboutMe', aboutMe);
    // body.append('location', location);
    // body.append('dateOfBirth', dateOfBirth);
    // body.append('isHost', isHost);
    // body.append('avatarUrl', avatarUrl);

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

  const reservationBooking = async (
    userId: string,
    experienceID: string,
    dateAvaibilityID: string,
    completed: boolean,
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_RESERVATION + '/' + userId;
    let body = {
      experienceID,
      dateAvaibilityID,
      completed,
    };

    try {
      const { data } = await axios.post<any>(url, body, API_CONFIG);
      const result: IUser = data.payload;
      setLoginUser(result);
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

  const joinBooking = async (
    userId: string,
    id: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_JOIN + '/' + userId + '/' + id + '/';
    let body = {
    };
    console.log(url);
    try {
      const { data } = await axios.post<any>(url, body, API_CONFIG);
      const result: IUser = data.payload;
      console.log(data);
      setLoginUser(result);
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

  return { getUserList, getUserInformation, deleteUser, updateUserInformation, reservationBooking, joinBooking };
};
