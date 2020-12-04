import axios, { AxiosRequestConfig } from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, LOGIN_USER_TOKEN } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IBooking } from '../interfaces/app';

export const useCompletedBookings = () => {

  const completedBookings = async (
  ): Promise<any> => {
    var url = API_ENDPOINT.COMPLETED_BOOKING_LIST;
  
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
      var result: IBooking[] = [];
      result.push({ id: 1, image: '', experience_icon: Icon_Category_Music, experience: 'Cheese Plate Course'
        , date: 'Aug 8, 2020', hour: '12:30pm', duration:'', rating: 2, is_host: false, is_joined: true
        , host: null, show_date: null, paid: null, receive: null, completed: null });
      result.push({ id: 2, image: '', experience_icon: Icon_Category_Cooking, experience: 'Cheese Plate Course'
        , date: 'Aug 8, 2020', hour: '12:30pm', duration:'', rating: 5, is_host: true, is_joined: true
        , host: {id: 1, username: 'Megan Tester', image: '', experience_icon: '', experience: ''}
        , show_date: null, paid: null, receive: null, completed: null });
      result.push({ id: 3, image: '', experience_icon: Icon_Category_Music, experience: 'Cheese Plate Course'
        , date: 'Aug 8, 2020', hour: '12:30pm', duration:'', rating: 3, is_host: false, is_joined: false
        , host: null, show_date: null, paid: null, receive: null, completed: null });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { completedBookings };
};
