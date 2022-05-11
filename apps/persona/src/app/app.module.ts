/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import extractFiles from 'extract-files/extractFiles.mjs';
// @ts-ignore
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { CookieService } from 'ngx-cookie-service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ProfileState } from './features/profile/data-access/store/profile.state';
import { StoryState } from './features/story/data-access/store/story.state';

import { AuthState, AngularMaterialModule } from '@persona/authentication';
import { CsrfInterceptor } from './core/data-access/interceptors/csrf.interceptor';
import { AppState } from './core/data-access/store/app.state';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
		HttpClientModule,
		ApolloModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		NgxsModule.forRoot([AuthState, ProfileState, StoryState, AppState], {
			developmentMode: !environment.production,
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsSelectSnapshotModule.forRoot(),
		// NgxsStoragePluginModule.forRoot({
		// 	key: 'auth',
		// 	storage: 0,
		// }),

		AngularMaterialModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],

	providers: [
		CookieService,

		{
			provide: APOLLO_OPTIONS,
			useFactory: (httpLink: HttpLink) => {
				return {
					cache: new InMemoryCache(),
					link: httpLink.create({
						uri: `${environment.BACKEND_URL}/graphql`,
						withCredentials: true,
						extractFiles: (body) => extractFiles(body, isExtractableFile),
					}),
					credentials: environment.APOLLO_ORIGIN,
					ssrMode: environment.APOLLO_SSR_MODE,
				};
			},
			deps: [HttpLink],
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CsrfInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}