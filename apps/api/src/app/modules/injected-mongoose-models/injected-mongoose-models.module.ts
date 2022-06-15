import { Story, User } from '@core/models/graphql.schema';
import { environment } from '@environment';
import { StorySchema } from '@features/story/models/story/story.schema';
import { UserSchema } from '@features/user/models/user/user.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectedMongooseModelsService } from './injected-mongoose-models.service';

@Global()
@Module({
	imports: [
		MongooseModule.forFeatureAsync(
			[
				{
					name: User.name,
					useFactory: () => ({ schema: UserSchema }),
				},
				{
					name: Story.name,
					useFactory: () => ({ schema: StorySchema }),
				},
			],
			environment.DATABASE_CONNECTION_NAME
		),
	],
	providers: [InjectedMongooseModelsService],
	exports: [InjectedMongooseModelsService],
})
export class InjectedMongooseModelsModule {}
