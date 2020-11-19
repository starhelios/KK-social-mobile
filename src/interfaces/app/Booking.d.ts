import { IHost } from "./Host";

export interface IBooking {
	id: number;
	image: string;
	experience_icon: string;
	experience: string;
	date: string;
	hour: string;
	duration: string;
	rating: number;
	is_host: boolean;
	is_joined: boolean;
	host: IHost | null;
}
