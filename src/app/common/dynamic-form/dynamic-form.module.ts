import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormFieldsModule } from '../form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldsModule],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
