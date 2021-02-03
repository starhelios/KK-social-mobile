import { IExperienceDetail } from ".";

export interface IUserBooking {
	id: string;
	experience: IExperienceDetail;
	ratings: [];
	reservations: [];
	usersGoing: string[];
	day: string;
	startTime: string;
	endTime: string;
	imageUrl: string;
	createdAt: string;
}
