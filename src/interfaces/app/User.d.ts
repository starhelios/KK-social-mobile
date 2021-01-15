import { ICard, IBank } from ".";

export interface IUser {
	id: string,
	status: string,
	isHost: boolean,
	email: string,
	fullname: string,
	avatarUrl: string,
	dateOfBirth: string,
	aboutMe: string,
	categoryName: string,
	location: string,
	createdAt: string,

	bankInfo: IBank[],
	paymentInfo: ICard[],
}
