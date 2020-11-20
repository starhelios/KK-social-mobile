import axios, { AxiosRequestConfig } from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, LOGIN_USER_TOKEN } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IExperience } from '../interfaces/app';

export const useExperiences = () => {

  const experiences = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.EXPERIENCE_LIST;
  
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
      var result: IExperience[] = [];
      result.push({ id: 1, title: 'Chef Ramsay Cooking', image: '', experience_icon: Icon_Category_Cooking, experience: 'Cooking', duration: '1hr', min_price: 150, count: 'person'});
      result.push({ id: 2, title: 'Guitar Lessons', image: '', experience_icon: Icon_Category_Music, experience: 'Music', duration: '30min', min_price: 85, count: 'person'});
      result.push({ id: 3, title: 'Sports Lessons', image: '', experience_icon: Icon_Category_Cooking, experience: 'Sports', duration: '2hr', min_price: 100, count: 'person'});
      result.push({ id: 4, title: 'English Lessons', image: '', experience_icon: Icon_Category_Music, experience: 'Study', duration: '1hr 30min', min_price: 50, count: 'person'});

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { experiences };
};