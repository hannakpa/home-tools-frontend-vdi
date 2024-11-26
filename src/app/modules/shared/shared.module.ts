import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiSelectDropdownComponent} from './multi-select-dropdown/multi-select-dropdown.component';
import {FormsModule} from "@angular/forms";
import {DatePickerComponent} from './date-picker/date-picker.component';
import {provideHttpClient} from "@angular/common/http";


@NgModule({
  declarations: [
    MultiSelectDropdownComponent,
    DatePickerComponent,
    MultiSelectDropdownComponent
  ],
  exports: [
    MultiSelectDropdownComponent,
    DatePickerComponent,
    MultiSelectDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SharedModule { }
