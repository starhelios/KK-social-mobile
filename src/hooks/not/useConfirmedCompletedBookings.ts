import axios from 'axios';

// from app
import { API_ENDPOINT, Icon_Category_Cooking, Icon_Category_Music, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IBooking } from '../interfaces/app';

export const useConfirmedCompletedBookings = () => {

  const confirmedCompletedBookings = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.COMPLETED_BOOKING_LIST;

    try {
      /*
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IExperienceCategory[] = data.data;
      */

      // test
      var result: IBooking[] = [];
      result.push({ id: 1, image: '', experience_icon: Icon_Category_Cooking, experience: 'Surf Lessons with Kelly Slater'
        , date: 'September 01, 2020', hour: '4:00 PM', duration: '60min', rating: 4, is_host: true, is_joined: true
        , host: {id: 1, username: 'Jeff K.', image: '', experience_icon: '', experience: ''}
        , show_date: null, paid: '150', receive: '120', completed: true });
      result.push({ id: 2, image: '', experience_icon: Icon_Category_Cooking, experience: 'Surf Lessons with Kelly Slater'
        , date: 'September 01, 2020', hour: '6:00 PM', duration: '60min', rating: 3, is_host: true, is_joined: true
        , host: {id: 1, username: 'Teri M.', image: '', experience_icon: '', experience: ''}
        , show_date: null, paid: '120', receive: '100', completed: true });
      result.push({ id: 3, image: '', experience_icon: Icon_Category_Cooking, experience: 'Surf Lessons with Kelly Slater'
        , date: 'September 02, 2020', hour: '1:00 PM', duration: '60min', rating: 2, is_host: true, is_joined: true
        , host: {id: 1, username: 'Margo K.', image: '', experience_icon: '', experience: ''}
        , show_date: null, paid: '300', receive: '250', completed: false });
      result.push({ id: 4, image: '', experience_icon: Icon_Category_Cooking, experience: 'Surf Lessons with Kelly Slater'
        , date: 'September 02, 2020', hour: '2:00 PM', duration: '60min', rating: 5, is_host: true, is_joined: false
        , host: {id: 1, username: 'Frank H.', image: '', experience_icon: '', experience: ''}
        , show_date: null, paid: '240', receive: '200', completed: false });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { confirmedCompletedBookings };
};
