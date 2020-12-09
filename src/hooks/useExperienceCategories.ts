import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IExperienceCategory } from '../interfaces/app';

export const useExperienceCategories = () => {

  const experienceCategories = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.EXPERIENCE_CATEGORY_LIST;

    try {
      /*
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
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
      return Promise.reject(null);
    }
  };

  return { experienceCategories };
};
