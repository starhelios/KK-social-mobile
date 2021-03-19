import axios from 'axios';

import { API_ENDPOINT } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { IHostDetail, IHostList } from '../interfaces/app';

export const useHosts = () => {

  const getHostList = async (
  ): Promise<any> => {
    const url = API_ENDPOINT.HOSTS;
    try {
      const { data } = await axios.get<IApiSuccess>(url);
      const result: IHostList = data.payload;      
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
      const { data } = await axios.get<IApiSuccess>(url);
      const result: IHostDetail = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { getHostList, getHostDetail };
};
