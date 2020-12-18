import { IUser } from ".";

export interface IUserList {
	results: IUser[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number,
}
