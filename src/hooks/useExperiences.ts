import axios, { AxiosRequestConfig } from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, Img_Experience_1, Img_Experience_2, LOGIN_USER_TOKEN } from '../constants';
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
      result.push({ id: 1, title: 'Chef Ramsay Cooking', location: 'Hawaii, United States', image: '', description: 'More than 1,000 five stars reviews. We just got mentioned on Conde Nast Travel, Business Insider and Forbes Mexico! We are a National Coffee Judge and also Airbnb Experiences Community Leader in Mexico City, and two chemical engineers. This experience combines our 2 biggest passions: coffee and hosting. And we will be still running it for a limited time.'
        , host: {id: 1, username: 'Jeff A.', image: '', full_name: '', email: '', birthday: ''}
        , experience_icon: Icon_Category_Cooking, experience: 'Cooking', duration: '1hr', min_price: 150, personal: 'person', rating: 3.5, rating_count: 120, images: [Img_Experience_1, Img_Experience_2]});
      result.push({ id: 2, title: 'Guitar Lessons', location: 'Hawaii, United States', image: '', description: 'More than 1,000 five stars reviews. We just got mentioned on Conde Nast Travel, Business Insider and Forbes Mexico! We are a National Coffee Judge and also Airbnb Experiences Community Leader in Mexico City, and two chemical engineers. This experience combines our 2 biggest passions: coffee and hosting. And we will be still running it for a limited time.'
        , host: {id: 1, username: 'Jeff B.', image: '', full_name: '', email: '', birthday: ''}
        , experience_icon: Icon_Category_Music, experience: 'Music', duration: '30min', min_price: 85, personal: 'person', rating: 4.5, rating_count: 131, images: [Img_Experience_1, Img_Experience_2]});
      result.push({ id: 3, title: 'Sports Lessons', location: 'Hawaii, United States', image: '', description: 'More than 1,000 five stars reviews. We just got mentioned on Conde Nast Travel, Business Insider and Forbes Mexico! We are a National Coffee Judge and also Airbnb Experiences Community Leader in Mexico City, and two chemical engineers. This experience combines our 2 biggest passions: coffee and hosting. And we will be still running it for a limited time.'
        , host: {id: 1, username: 'Jeff C.', image: '', full_name: '', email: '', birthday: ''}
        , experience_icon: Icon_Category_Cooking, experience: 'Sports', duration: '2hr', min_price: 100, personal: 'person', rating: 4.8, rating_count: 247, images: [Img_Experience_1, Img_Experience_2]});
      result.push({ id: 4, title: 'English Lessons', location: 'Hawaii, United States', image: '', description: 'More than 1,000 five stars reviews. We just got mentioned on Conde Nast Travel, Business Insider and Forbes Mexico! We are a National Coffee Judge and also Airbnb Experiences Community Leader in Mexico City, and two chemical engineers. This experience combines our 2 biggest passions: coffee and hosting. And we will be still running it for a limited time.'
        , host: {id: 1, username: 'Jeff D.', image: '', full_name: '', email: '', birthday: ''}
        , experience_icon: Icon_Category_Music, experience: 'Study', duration: '1hr 30min', min_price: 50, personal: 'person', rating: 4.2, rating_count: 57, images: [Img_Experience_1, Img_Experience_2]});

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { experiences };
};