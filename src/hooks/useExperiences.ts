import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IAvailableDateForCreate, IExperience, IExperienceDetail, IReservationBooking, IUserBooking } from '../interfaces/app';
import { handleError } from '../utils';

export const useExperiences = () => {

  const getExperienceList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES;
    try {
      const { data } = await axios.get<IApiSuccess>(url);
      const result: IExperience[] = data.payload;
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

  const getExperienceDetail = async (
    id: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES + '/' + id;
    try {
      const { data } = await axios.get<IApiSuccess>(url);
      const result: IExperienceDetail = data.payload.experience;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const createExperience = async (
    title: string,
    description: string,
    duration: number,
    price: number,
    categoryName: string,
    startDay: string,
    endDay: string,
    userId: string,
    images: string[],
    specificExperiences: IAvailableDateForCreate[],
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES;
    const body = {
      title,
      description,
      duration,
      price,
      categoryName,
      startDay,
      endDay,
      userId,
      images,
      specificExperiences,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IExperience = data.payload;
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

  const filterExperiences = async (
    minPrice: number | null,
    maxPrice: number | null,
    startDay: string | null,
    endDay: string | null,
    categoryName: string[],
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES_FILTER;
    const body = {
      minPrice,
      maxPrice,
      startDay,
      endDay,
      categoryName,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IExperience[] = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const reserveBooking = async (
    userId: string,
    experienceId: string,
    id: string,
    paymentIntent: string, 
    guests: number, 
    imageUrl: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_RESERVE;
    let body = {
      userId,
      experienceId,
      id,
      paymentIntent,
      guests,
      imageUrl,
    };

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IReservationBooking = data.payload;
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

  const getReservedBookingList = async (
    id: string,
  ): Promise<any> => {
    const url = `${API_ENDPOINT.BOOKING_RESERVED}/${id}`;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IUserBooking[] = data.payload.userBookings;
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
    // try {
    //   const { data } = await axios.post<any>(url, body, API_CONFIG);
    //   const result: IUser = data.payload;
    //   setLoginUser(result);
    //   return Promise.resolve(result);
    // } catch (err) {
    //   const apiError = handleError(err);
    //   if (apiError) {
    //     return Promise.reject(apiError);
    //   } else {
    //     return Promise.reject(null);
    //   }
    // }
  };

  return { getExperienceList, getExperienceDetail, createExperience, filterExperiences, reserveBooking, getReservedBookingList, joinBooking };
};