import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AngularMaterialModule } from '@persona/shared';
import { FormModule } from '../../pages/form/form.module';

const routes: Routes = [
	{
		path: '',
		component: ForgotPasswordComponent,
	},
];

@NgModule({
	declarations: [ForgotPasswordComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		AngularMaterialModule,
		FormModule,
	],
})
export class ForgotPasswordModule {}
