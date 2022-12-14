import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

import { environment } from '@environment';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		const scopeURL = 'https://www.googleapis.com/auth';

		super({
			clientID: environment.GOOGLE_CLIENT_ID,
			clientSecret: environment.GOOGLE_CLIENT_SECRET,
			callbackURL: environment.HOST_URL + environment.GOOGLE_CALLBACK_URL,
			scope: [`${scopeURL}/userinfo.email`, `${scopeURL}/userinfo.profile`],
		});
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		const { id, username, emails, photos, _json, name } = profile;
		// console.log(profile);
		const user = {
			googleId: id.toString(),
			username: username,
			email: (emails ?? [])[0]?.value ?? 'email Does Not Exist',
			email_verified: Boolean((emails ?? [])[0]?.value) ?? false,
			locale: _json.locale ?? 'en',
			fullName: `${name?.givenName} ${name?.familyName}`,
			profilePicture:
				(photos ?? [])[0]?.value ?? 'Profile Picture Does Not Exist',
		};
		return user;
	}
}
