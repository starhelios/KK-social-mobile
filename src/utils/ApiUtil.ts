import { AxiosError } from 'axios';

import { IApiError } from '../interfaces/api/Error';

export function handleError(error: AxiosError<IApiError>): void | IApiError {
  if (error.response === undefined) {
    return;
  }

  const {status, data} = error.response;

  switch (status) {
    case 400:
      console.log(`[400] Bad Request Error: ${data.errors}`);
      break;
    case 404:
      console.log('[404] URL Not Found.');
      break;
    case 500:
      console.log(`[500] Server Error: ${data.errors}`);
      break;
    default:
      console.log(`API Error: ${error.message}`);
      break;
  }

  return data;
}
