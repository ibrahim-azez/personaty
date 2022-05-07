import { environment } from '../../../environments/environment';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Login_Input } from '../../core/graphql.schema';

export class LoginDto extends Login_Input {
	@IsString()
	email: string;

	@IsString()
	@MinLength(environment.MIN_LENGTH)
	@MaxLength(environment.MAX_LENGTH)
	password: string;
}
