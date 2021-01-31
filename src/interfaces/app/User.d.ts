import { ICardInfo, IBank, IReservationBooking } from ".";

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
	stripeCustomerID: string,
	stripeConnectID: string,

	experiences: [],
	ratingsGiven: [],
	bankInfo: IBank[],
	availableMethods: ICardInfo[],
	bookingInfo: IReservationBooking[],
}
