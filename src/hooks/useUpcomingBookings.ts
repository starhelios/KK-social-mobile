import axios from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IBooking } from '../interfaces/app';

export const useUpcomingBookings = () => {

  const upcomingBookings = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.UPCOMING_BOOKING_LIST;

    try {
      /*
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperienceCategory[] = data.data;
      */

      // test
      var result: IBooking[] = [];
      result.push({ id: 1, image: '', experience_icon: Icon_Category_Cooking, experience: 'Chef Ramsay Cooking'
        , date: 'Sept 1, 2020', hour: '2pm', duration:'1hr', rating: 0, is_host: false, is_joined: false, host: null
        , show_date: null, paid: null, receive: null, completed: null });
      result.push({ id: 2, image: '', experience_icon: Icon_Category_Music, experience: 'Chef Ramsay Music'
        , date: 'Nov 10, 2020', hour: '2:30pm', duration:'1hr 30min', rating: 0, is_host: true, is_joined: false, host: null
        , show_date: null, paid: null, receive: null, completed: null });
      result.push({ id: 3, image: '', experience_icon: Icon_Category_Cooking, experience: 'Chef Ramsay Sports'
        , date: 'Sept 28, 2020', hour: '2pm', duration:'2hr', rating: 0, is_host: false, is_joined: false, host: null
        , show_date: null, paid: null, receive: null, completed: null });
      result.push({ id: 4, image: '', experience_icon: Icon_Category_Music, experience: 'Chef Ramsay Study'
        , date: 'Nov 15, 2020', hour: '2:30pm', duration:'2hr', rating: 0, is_host: true, is_joined: false, host: null
        , show_date: null, paid: null, receive: null, completed: null });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { upcomingBookings };
};
