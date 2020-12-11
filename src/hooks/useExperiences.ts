import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IAvailableDateForCreate, IExperience, IExperienceDetail, IFile } from '../interfaces/app';

export const useExperiences = () => {

  const getExperienceList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperience[] = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const getExperienceDetail = async (
    id: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.EXPERIENCES + '/' + id;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperienceDetail = data.payload;
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
    images: IFile[],
    dateAvaibility: IAvailableDateForCreate[],
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
      dateAvaibility,
    }
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperience = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { getExperienceList, getExperienceDetail, createExperience };
};