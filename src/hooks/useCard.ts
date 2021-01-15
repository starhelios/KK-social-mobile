import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess, IApiSuccessDetail } from '../interfaces/api';
import { handleError } from '../utils';

export const useCard = () => {

  const addCard = async (
    userId: string,
    cardType: string,
    cardNumber: string,
    cardExpiryDate: string,
    cvc: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.CARD + '/' + userId;
    const body = {
      cardType,
      cardNumber,
      cardExpiryDate,
      cvc,
    }

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const result: IApiSuccessDetail = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.resolve(false);
      }
    }
  };

  const deleteCard = async (
    cardID: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.CARD + '/' + cardID;
    try {
      const { data } = await axios.delete<IApiSuccess>(url, API_CONFIG);
      const result: IApiSuccessDetail = data.payload;
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  return { addCard, deleteCard };
};
