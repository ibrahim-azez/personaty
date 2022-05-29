import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MyJWTModule } from '@modules/jwt/jwt.module';
import { DateScalar } from '@core/utils/graphql-data-scalar/date.scalar';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './models/user/user.schema';
import { UserResolver } from './user.resolver';

@Module({
	imports: [
		MongooseModule.forFeature(
			[{ name: 'User', schema: UserSchema }],
			'persona'
		),
		MyJWTModule,
	],
	controllers: [UserController],
	providers: [UserService, UserResolver, DateScalar],
	exports: [UserService],
})
export class UserModule {}
