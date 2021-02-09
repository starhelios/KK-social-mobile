import axios from 'axios';

// from app
import { API_ENDPOINT, API_CONFIG } from '../constants';
import { IApiSuccess } from '../interfaces/api';
import { handleError } from '../utils';

export const usePayments = () => {

  const generatePaymentIntent = async (
    experienceID: string,
    amount: number,
    payment_type: string, // saved, card
  ): Promise<any> => {
    const url = API_ENDPOINT.GENERATE_PAYMENT_INTENT;
    const body = {
      experienceID,
      amount,
      payment_type,
    }
console.log(body);
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      const clientToken: string = data.payload;
      return Promise.resolve(clientToken);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        console.log(apiError);
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  };

  const addCard = async (
    cardNumber: string,
    expiryYear: number,
    expiryMonth: number,
    cardCVV: string,
  ): Promise<any> => {
    const url = API_ENDPOINT.ADD_CARD;
    const body = { 
      data: {
        cardNumber,
        cardExpiryDate: `${expiryMonth} ${expiryYear}`,
        cardCVV,
      }
    }
    try {
      const { data } = await axios.post<IApiSuccess>(url, body, API_CONFIG);
      return Promise.resolve(data.payload);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
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
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError);
      } else {
        return Promise.reject(null);
      }
    }
  };

  return { generatePaymentIntent, addCard, saveTransation };
};
