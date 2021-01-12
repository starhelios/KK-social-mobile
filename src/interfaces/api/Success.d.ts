export interface IApiSuccess {
  payload: any;
  error: IApiSuccessDetail;
}

export interface IApiSuccessDetail {
  status: boolean;
  message: string;
}

export interface IApiSuccessMessage {
  payload: any;
  error: boolean
  message: string;
}
