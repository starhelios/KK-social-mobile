export interface IApiError {
  code: number;
  status: string;
  errors: Array<IApiErrorDetail>;
}

export interface IApiErrorDetail {
  source: string;
  detail: string;
}
