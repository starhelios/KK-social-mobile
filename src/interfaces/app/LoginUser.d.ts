import { ITokens, IUser } from ".";

export interface ILoginUser {
	user: IUser;
	newUser: IUser;
	tokens: ITokens;
}
