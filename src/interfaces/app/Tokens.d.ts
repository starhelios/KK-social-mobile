export interface ITokens {
	access: IToken;
	refresh: IToken;
}

export interface IToken {
	token: string;
	expires: string;
}
