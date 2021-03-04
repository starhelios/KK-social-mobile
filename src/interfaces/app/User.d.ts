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
	zoomAccessToken: string,
	zoomRefreshToken: string,
	zoomId: string,

	experiences: [],
	availableMethods: ICardInfo[],
}
