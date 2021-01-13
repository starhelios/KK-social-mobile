import { IExperience } from ".";
import { IUser } from "./User";

export interface IExperienceDetail {
	fullname: string,
	avatarUrl: string,
	host: IUser,
	experience: IExperience,
}
