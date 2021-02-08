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
}

export interface IHostData {
	fullname: string,
	email: string,
}

export interface ISpecificExperience {
	id: string,
	imageUrl: string,
	experience: string,
	day: string,
	startTime: string,
	endTime: string,

	ratings: [ ],
	usersGoing: string[],
	reservations: [ ],

	// internal working
	show_date: boolean,
}
