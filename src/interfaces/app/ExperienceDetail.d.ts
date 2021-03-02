import { IExperience } from ".";
import { IAvailableDate } from "./AvailableDate";

export interface IExperienceDetail {
	id: string,
	images: string[],
	title: string,
	description: string,
	duration: number,
	price: number,
	categoryName: string,
	specificExperience: ISpecificExperience[],
	startDay: string,
	endDay: string,
	userId: string,
	updatedAt: string,
	hostData: IHostData,
	location: string,
	dateAvaibility: IAvailableDate[],
}

export interface IHostData {
	fullname: string,
	email: string,
}

export interface ISpecificExperience {
	id: string,
	imageUrl: string,
	experience: IExperience,
	day: string,
	startTime: string,
	endTime: string,
	createdAt: string,
	ratings: [],
	usersGoing: string[],
	reservations: [],
	completed: boolean,
	zoomMeetingId: string,
	zoomMeetingPassword: string,

	// internal working
	show_date: boolean,
}
