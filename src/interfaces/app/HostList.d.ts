import { IUser } from ".";

export interface IHostList {
	results: IUser[],
	page: number,
	limit: number,
	totalPages: number,
	totalResults: number,
}
