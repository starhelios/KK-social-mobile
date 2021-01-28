import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { handleError } from '../utils';

export const usePayments = () => {

  const generatePaymentIntent = async (
    experienceID: string,
    payment_type: string,
    amount: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.GENERATE_PAYMENT_INTENT;
    const body = {
      experienceID,
      payment_type,
      amount,
    }

    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      return Promise.resolve(data.payload);
    } catch (err) {
      return Promise.reject(null);
    }
  };

  const saveTransation = async (
    client_secret: string,
    id: string,
    userID: string,
    experienceID: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.SAVE_TRANSACTION;
    const body = {
      client_secret,
      id,
      userID,
      experienceID,
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      console.log(data);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        console.log(apiError);
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  return { generatePaymentIntent, saveTransation };
};
