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

export interface DurationInfo {
	step: number,
	startTime: Date,
	endTime: Date,
}
