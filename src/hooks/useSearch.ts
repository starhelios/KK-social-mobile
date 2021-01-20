import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { ISearchHome } from '../interfaces/app';

export const useSearch = () => {

  const searchHome = async (
    minPrice: number | null,
    maxPrice: number | null,
    startDay: string | null,
    endDay: string | null,
    categoryName: string[],
    keyword: string,
    location: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.SEARCH;
    const body = {
      minPrice,
      maxPrice,
      startDay,
      endDay,
      categoryName,
      keyword,
      location,
    }

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: ISearchHome = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { searchHome };
};