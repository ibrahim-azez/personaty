import { IsBoolean } from 'class-validator';
import { Is_User_Available } from '../../core/graphql.schema';

export class IsUserAvailable extends Is_User_Available {
	@IsBoolean()
	available: boolean;
}