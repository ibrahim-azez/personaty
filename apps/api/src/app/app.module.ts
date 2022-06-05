import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER } from '@nestjs/core';

import { environment } from '@environment';
import { NodemailerModule } from '@modules/mail/nodemailer.module';
import { ImageModule } from '@modules/image/image.module';

import { UserModule } from './features/user/users.module';
import { AuthModule } from './features/auth/auth.module';
import { StoryModule } from './features/story/story.module';
import { GraphQLWithUploadModule } from './graphql-with-upload.module';
import { UploadScalar } from './core/utils/graphql-data-scalar/upload.scalar';
import { DateScalar } from './core/utils/graphql-data-scalar/date.scalar';
import { UnhandledRoutesModule } from './modules/unhandled-routes/unhandled-routes.module';
import { CsrfMiddleware } from './core/middlewares/csrf.middleware';
import { AllHttpExceptionsFilter } from './core/utils/error-handling/all-http-exceptions-filter';
import { AppController } from './app.controller';
import { MyJWTModule } from '@modules/jwt/jwt.module';

// import { APP_FILTER } from '@nestjs/core';
// import { AllHttpExceptionsFilter } from './core/interceptors/all-http-exceptions-filter';

@Module({
	controllers: [AppController],
	imports: [
		AuthModule,
		UserModule,
		StoryModule,
		// NOTE The order of the routes is important for route handler
		UnhandledRoutesModule,
		NodemailerModule,
		ImageModule,
		MyJWTModule,

		GraphQLWithUploadModule.forRoot(),

		MongooseModule.forRootAsync({
			connectionName: 'persona',
			useFactory: () => ({
				uri: environment.DATABASE_CONNECTION,
				retryAttempts: 5,
				retryDelay: 1000,
				autoIndex: true,
			}),
		}),

		PassportModule.registerAsync({
			useFactory: () => ({ defaultStrategy: 'jwt' }),
		}),

		ThrottlerModule.forRootAsync({
			useFactory: () => ({
				ttl: 60,
				limit: 100,
			}),
		}),
	],
	providers: [
		UploadScalar,
		DateScalar,
		{
			provide: APP_FILTER,
			useClass: AllHttpExceptionsFilter,
		},
	],
})
export class AppModule implements NestModule {
	async configure(consumer: MiddlewareConsumer) {
		await new Promise((resolve, reject) =>
			resolve(consumer.apply(CsrfMiddleware).forRoutes('*'))
		);
	}
}
