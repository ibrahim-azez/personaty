import { Logger, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const whitelist = [environment.HOST_URL, environment.ORIGIN_URL, undefined];

	const corsOptions = {
		origin: function (origin, callback) {
			if (whitelist.filter((x) => x && x.startsWith(origin)))
				return callback(null, true);

			throw new UnauthorizedException('Not allowed by CORS');
		},
		credentials: true,
	};

	app.enableCors(corsOptions);

	app.use(
		'/graphql',
		graphqlUploadExpress({
			maxFileSize: 10000,
			maxFiles: 1,
		})
	);

	app.use(cookieParser());

	if (environment.production) {
		app.use(helmet());

		app.use(compression());

		app.set('trust proxy', 1);

		app.use(csurf({ cookie: true }));
	}

	const globalPrefix = 'api/v1';

	app.setGlobalPrefix(globalPrefix);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		})
	);

	const port = process.env.PORT || 3333;

	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}`);

	Logger.log(
		`🧑‍💻 Application is running on: ${environment.ENVIRONMENT_NAME} environment`
	);

	// console.log(whitelist);
}

bootstrap();
