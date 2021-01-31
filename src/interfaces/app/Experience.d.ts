import { IAvailableDate } from ".";

export interface IExperience {
	id: string,
	userId: string,
	title: string,
	description: string,
	startDay: string,
	endDay: string,
	duration: number,
	price: number,
	categoryName: string,
	images: string[],
	specificExperience: string[],
	dateAvaibility: IAvailableDate[],
	createdAt: string,
	usersGoing: IUsersGoing[],

	// test
	icon: string,
	location: string,
}

export interface IUsersGoing {
	_id: string,
	userID: string,
	timeSlot: ITimeSlot,
	totalGuests: number,
}

export interface ITimeSlot {
	startTime: string,
	endTime: string,
	day: string,
}
