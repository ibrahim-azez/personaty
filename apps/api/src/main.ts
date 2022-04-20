import { Logger, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import * as csurf from 'csurf';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const whitelist = [environment.URI_HOST, environment.URI_ORIGIN];

	const corsOptions = {
		credentials: true, // This is important.

		origin: (origin, callback) => {
			if (whitelist.includes(origin)) return callback(null, true);

			throw new UnauthorizedException('Not allowed by CORS');
		},
	};

	app.enableCors(corsOptions);

	if (environment.production) {
		app.use(helmet());

		// app.use(csurf());
	}

	app.use(cookieParser());

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
		`🧑‍💻 The Application is running on: ${environment.ENVIRONMENT_NAME} environment`
	);
}

bootstrap();
