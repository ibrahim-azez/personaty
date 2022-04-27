import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LogoutComponent,
	},
];

@NgModule({


	imports: [
		CommonModule,
		AngularMaterialModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
	],
})
export class LogoutModule {}