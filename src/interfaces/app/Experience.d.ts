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
	location: string,
	createdAt: string,

	// for create
	dateAvaibility: IAvailableDate[],
}

export interface ITimeSlot {
	startTime: string,
	endTime: string,
	day: string,
}
