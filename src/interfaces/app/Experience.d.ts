import { IUser } from "./User";

export interface IExperience {
	id: number;
	title: string;
	image: string;
	experience_icon: string;
	experience: string;
	duration: string;
	min_price: number;
	personal: string;
	rating: number;
	rating_count: number;
	images: string[];
	location: string;
	host: IUser;
	description: string;
}
