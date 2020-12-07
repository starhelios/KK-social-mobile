export interface IApiError {
  error: IApiErrorDetail;
}

export interface IApiErrorDetail {
  status: string;
  message: string;
}
