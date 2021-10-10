import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventsComponent } from './create-events.component';
import { CreateEventsRoutingModule } from './create-events-routing.module';
import { FormFieldsModule } from 'src/app/common/form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    CreateEventsComponent
  ],
  imports: [
    CommonModule,
    CreateEventsRoutingModule,
    CommonModule, AgGridModule, ReactiveFormsModule, FormsModule, FormFieldsModule
  ]
})
export class CreateEventsModule { }
