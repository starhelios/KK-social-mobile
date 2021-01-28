import { ICard, IBank } from ".";
import { IReservationBooking } from "./ReservationBooking";

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
	bookingInfo: IReservationBooking[],
}
