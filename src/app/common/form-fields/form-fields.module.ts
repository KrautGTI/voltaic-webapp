import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnPrimaryComponent } from './btn-primary/btn-primary.component';
import { BtnTransparentComponent } from './btn-transparent/btn-transparent.component';
import { BtnSecondaryComponent } from './btn-secondary/btn-secondary.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InputComponent } from './input/input.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputIntegerComponent } from './input-integer/input-integer.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BtnPrimaryComponent,
    BtnTransparentComponent,
    BtnSecondaryComponent,
    CheckboxComponent,
    DateComponent,
    FileUploadComponent,
    InputComponent,
    InputEmailComponent,
    InputNumberComponent,
    InputIntegerComponent,
    InputSearchComponent,
    RadioComponent,
    RadioGroupComponent,
    SelectComponent,
    SwitchComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BtnPrimaryComponent,
    BtnTransparentComponent,
    BtnSecondaryComponent,
    CheckboxComponent,
    DateComponent,
    FileUploadComponent,
    InputComponent,
    InputEmailComponent,
    InputNumberComponent,
    InputIntegerComponent,
    InputSearchComponent,
    RadioComponent,
    RadioGroupComponent,
    SelectComponent,
    SwitchComponent,
    TextareaComponent
  ]
})
export class FormFieldsModule { }
