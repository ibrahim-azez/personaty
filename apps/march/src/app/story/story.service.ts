import { Injectable } from '@angular/core';
import { CreateStoryDto } from './create-story.dto';
import { CREATE_STORY, GET_STORY } from './story.gql.schema';
import { Apollo } from 'apollo-angular';
import { StoryStateModel } from './store/story.model';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StoryService {
	constructor(private apollo: Apollo) {}

	getStory(id: string) {
		return this.apollo
			.watchQuery({
				query: GET_STORY,
				variables: {
					id,
				},
				errorPolicy: 'all',
				context: {
					withCredentials: true,
				},
			})
			.valueChanges.pipe(
				map(({ data }: any) => {
					// console.log(data);

					return data.createStory as StoryStateModel;
				})
			);
	}

	createStory(story: CreateStoryDto) {
		return this.apollo
			.mutate({
				mutation: CREATE_STORY,
				variables: {
					story,
				},
				errorPolicy: 'all',
				context: {
					withCredentials: true,
				},
			})
			.pipe(
				map(({ data }: any) => {
					// console.log(data);
					return data.createStory as StoryStateModel;
				})
			);
	}
}