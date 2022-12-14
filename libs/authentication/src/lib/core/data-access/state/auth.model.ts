export interface IAuthStateModel {
	status: string | null;
	authenticated: boolean | null;
	userId?: string | null;
}

export interface ISignupCredentials {
	email: string;
	password: string;
	birthDate: string;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IConfirmForgotPasswordCredentials {
	password: string;
	confirmPassword: string;
	authToken: string;
}
