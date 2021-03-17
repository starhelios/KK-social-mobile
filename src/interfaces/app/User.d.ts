import { ICardInfo } from '.';

export interface IUser {
	id: string,
  email: string,
  fullname: string,
  avatarUrl: string,
  categoryName: string,
  aboutMe: string,
  status: string,
  dateOfBirth: string,
  location: string,
  isHost: boolean,
  availableMethods: ICardInfo[],
  experiences: string,
  isZoom: string,
  stripeAccountVerified: string,
  zoomAccessToken: string,
  zoomRefreshToken: string
	stripeCustomerID: string,
	stripeConnectID: string,
	zoomId: string,
	createdAt: string,
}
