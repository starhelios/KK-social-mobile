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
    location: string,
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
      location,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IExperience = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const updateExperience = async (
    id: string,
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
    location: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.UPDATE_EXPERIENCE;
    const body = {
      id,
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
      location,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IExperience = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
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

  const buildBooking = async (
    userId: string,
    specificExperienceId: string,
    userRole: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_BUILD;
    let body = {
      userId,
      specificExperienceId,
      userRole,
    };
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: string = data.payload.experienceBuilt;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const completeBooking = async (
    itemsNeedUpdatedArray: string[],
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_COMPLETE;
    let body = {
      itemsNeedUpdatedArray,
    };
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: string = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const rateBooking = async (
    userId: string,
    experienceId: string,
    rating: number,
  ): Promise<any> => {
    const url = API_ENDPOINT.BOOKING_RATE;
    let body = {
      userId,
      experienceId,
      rating,
    };
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const getHostExperienceListByUserId = async (
    user_id: string,
  ): Promise<any> => {
    const url = `${API_ENDPOINT.HOST_EXPERIENCE_LIST}/${user_id}`;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperienceDetail[] = data.payload.experiences;
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

  return { 
    getExperienceList, 
    getExperienceDetail, 
    createExperience, 
    updateExperience,
    reserveBooking, 
    getReservedBookingList, 
    buildBooking, 
    completeBooking, 
    rateBooking, 
    getHostExperienceListByUserId,
  };
};