export interface AuthStateModel {
	status: string | null;
	authenticated: boolean | null;
}

export interface UserAvailableResponse {
	available: boolean;
}

export interface UserAvailableRequest {
	username?: string;
	email?: string;
}

export interface SignupCredentials {
	email: string;
	password: string;
	birthDate: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface ResetPasswordCredentials {
	password: string;
	confirmPassword: string;
	token: string;
}