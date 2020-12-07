import { IApiErrorDetail } from ".";

export interface IApiSuccess {
  payload: any;
  error: IApiErrorDetail;
}

export interface IApiSuccessData {
  detail: string;
}
