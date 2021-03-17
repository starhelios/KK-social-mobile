import axios from 'axios';

// from app
import { API_CONFIG, API_ENDPOINT } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { ITutorial } from '../interfaces/app';

export const useTutorials = () => {

  const tutorialList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.TUTORIALS;
    try {
      const { data } = await axios.get<IApiSuccess>(url);
      const result: ITutorial[] = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { tutorialList };
};
