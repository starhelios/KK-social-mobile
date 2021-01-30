import { ISpecificExperience } from ".";

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
	specificExperience: ISpecificExperience[],

	// test
	icon: string,
	personal: string,
	location: string,
}
