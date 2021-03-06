import axios from 'axios';

import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { ICategory, IFile } from '../interfaces/app';

export const useCategories = () => {

  const getCategoryList = async (
    q: string,
  ): Promise<any> => {
    let url = API_ENDPOINT.CATEGORIES_SEARCH;
    if (q != '') {
      url += '?q=' + q;
    }
    try {
      const { data } = await axios.get<IApiSuccess>(url);
      const result: ICategory[] = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const createCategory = async (
    name: string,
    icon: IFile,
  ): Promise<any> => {
    const url = API_ENDPOINT.CATEGORIES;
    const body = {
      name,
      icon,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: ICategory = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { getCategoryList, createCategory };
};
