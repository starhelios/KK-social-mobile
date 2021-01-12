import { IHost } from ".";

export interface IHostList {
	results: IHost[],
	page: number,
	limit: number,
	totalPages: number,
	totalResults: number,
}
