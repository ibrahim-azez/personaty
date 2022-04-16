import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common'; 

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDividerModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatNativeDateModule,MatChipsModule
	],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDividerModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatNativeDateModule,MatChipsModule
	],
})
export class MaterialModule {}