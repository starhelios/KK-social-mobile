import axios, { AxiosRequestConfig } from 'axios';

// from app
import { API_ENDPOINT, LOGIN_USER_TOKEN } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { handleError } from '../utils';
import { IExperienceCategory } from '../interfaces/app';

export const useExperienceCategories = () => {

  const experienceCategories = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.EXPERIENCE_CATEGORY_LIST;
  
    const HEADER_CONFIG: AxiosRequestConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + LOGIN_USER_TOKEN,
      },
    };

    try {
      /*
      const { data } = await axios.get<IApiSuccess>(url, HEADER_CONFIG);
      const result: IExperienceCategory[] = data.data;
      */

      // test
      var result: IExperienceCategory[] = [];
      result.push({ id: 1, title: 'Music' });
      result.push({ id: 2, title: 'Cooking' });
      result.push({ id: 3, title: 'Sports' });
      result.push({ id: 4, title: 'Study' });

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

  return { experienceCategories };
};
