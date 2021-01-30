import axios, { AxiosRequestConfig } from 'axios';

// from app
import { STRIPE_SECRET_KEY } from '.';
import { IStripePaymentIntent } from '../interfaces/app';

export const StripePayment = () => {

  const getClientSecretForConfirmPayment = async (customerId: string, amount: number, currency: string = 'usd'): Promise<any> => {
    const customerToAppend = customerId ? '&customer=' + customerId : '';
    const url = `https://api.stripe.com/v1/payment_intents?amount=${amount}&currency=${currency}${customerToAppend}`;
    const header: AxiosRequestConfig = {
      headers: {
        'Authorization': 'Bearer ' + STRIPE_SECRET_KEY,
      },
    }
    const body = { }

    try {
      const { data } = await axios.post<IStripePaymentIntent>(url, body, header);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const getClientSecretForSetupPayment = async (customerId: string): Promise<any> => {
    if (!customerId) {
      return Promise.reject('Setup a customer id');
    }

    const url = `https://api.stripe.com/v1/setup_intents?customer=${customerId}`;

    const header: AxiosRequestConfig = {
      headers: {
        'Authorization': 'Bearer ' + STRIPE_SECRET_KEY,
      },
    }
    const body = { }

    try {
      const { data } = await axios.post<IStripePaymentIntent>(url, body, header);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { getClientSecretForConfirmPayment, getClientSecretForSetupPayment };
}
