export interface IAvailableDate {
	_id: string,
	day: string,
	startTime: string,
	endTime: string,

	// internal working
	show_date: boolean,
}

export interface IAvailableDateForCreate {
	day: string,
	startTime: string,
	endTime: string,
}

export interface ISpecificExperience {
	id: string,
	day: string,
	startTime: string,
	endTime: string,
	experience: string, 
	imageUrl: string, 
	ratings: [], 
	reservations: [], 
	usersGoing: [],

	// internal working
	show_date: boolean,
}
