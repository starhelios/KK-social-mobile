import axios, { AxiosRequestConfig } from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, LOGIN_USER_TOKEN } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { handleError } from '../utils';
import { IHost } from '../interfaces/app';

export const useHosts = () => {

  const hosts = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.HOST_LIST;
  
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
      var result: IHost[] = [];
      result.push({ id: 1, image: '', username: 'Lindsay Wyatt', experience_icon: Icon_Category_Cooking, experience: 'Cooking' });
      result.push({ id: 2, image: '', username: 'Brian Wong', experience_icon: Icon_Category_Music, experience: 'Music' });
      result.push({ id: 3, image: '', username: 'Alex', experience_icon: Icon_Category_Cooking, experience: 'Sports' });
      result.push({ id: 4, image: '', username: 'Samuel', experience_icon: Icon_Category_Music, experience: 'Study' });

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

  return { hosts };
};
