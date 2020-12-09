import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IHost, IHostList } from '../interfaces/app';

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

  const getHostInformation = async (
    userId: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.HOSTS + '/' + userId;
    try {
      const { data } = await axios.get<IApiSuccess>(url, API_CONFIG);
      const result: IHost = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { getHostList, getHostInformation };
};
