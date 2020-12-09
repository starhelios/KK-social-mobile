import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IExperience } from '../interfaces/app';

export const useExperiences = () => {

  const experiences = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.EXPERIENCE_LIST;

    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperienceCategory[] = data.data;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { experiences };
};