import axios, { AxiosRequestConfig } from 'axios';

// from app
import { IStripePaymentIntent } from './StripePaymentIntent';
import { handleError } from '../../utils';
import { STRIPE_SECRET_KEY } from '../Constants';

export const useStripePaymentIntents = () => {

  const paymentIntentUrl = 'https://api.stripe.com/v1/payment_intents';

  const stripeHeader: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  const createPaymentIntent = async (amount: number, currency: string = 'usd', payment_method_type: string = 'card'): Promise<any> => {
    const url = `${paymentIntentUrl}`;
    
    let body = new URLSearchParams();
    body.append('amount', amount.toString());
    body.append('currency', currency);
    body.append('payment_method_types[]', payment_method_type);

    try {
      const { data } = await axios.post<IStripePaymentIntent>(url, body, stripeHeader);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const retrievePaymentIntent = async (id: string): Promise<any> => {
    const url = `${paymentIntentUrl}/${id}`;

    try {
      const { data } = await axios.get<IStripePaymentIntent>(url, stripeHeader);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const confirmPaymentIntent = async (id: string, receipt_email: string, payment_method: string = 'pm_card_visa'): Promise<any> => {
    const url = `${paymentIntentUrl}/${id}/confirm`;
    
    let body = new URLSearchParams();
    body.append('payment_method', payment_method);
    body.append('receipt_email', receipt_email);

    try {
      const { data } = await axios.post<IStripePaymentIntent>(url, body, stripeHeader);
      return Promise.resolve(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        return Promise.reject(apiError.error.message);
      } else {
        return Promise.reject(null);
      }
    }
  }

  const cancelPaymentIntent = async (id: string, payment_method: string = 'pm_card_visa'): Promise<any> => {
    const url = `${paymentIntentUrl}/${id}/cancel`;
    
    let body = new FormData();
    body.append('payment_method', payment_method);

    try {
      const { data } = await axios.post<IStripePaymentIntent>(url, body, stripeHeader);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const getPaymentIntentList = async (limit: number = 3): Promise<any> => {
    const url = `${paymentIntentUrl}?limit=${limit}`;

    try {
      const { data } = await axios.get<IStripePaymentIntent[]>(url, stripeHeader);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { createPaymentIntent, retrievePaymentIntent, confirmPaymentIntent, cancelPaymentIntent, getPaymentIntentList };
}
