import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IHostDetail, IHostList } from '../interfaces/app';

export const useHosts = () => {

  const getHostList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.HOSTS;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IHostList[] = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const getHostDetail = async (
    userId: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.HOSTS + '/' + userId;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IHostDetail = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { getHostList, getHostDetail };
};
