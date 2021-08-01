import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CreateContactComponent } from './create-contact/create-contact.component';
import {DpDatePickerModule} from 'ng2-date-picker';



@NgModule({
  declarations: [
    ContactsComponent,
    CreateContactComponent
  ],
  imports: [
    CommonModule, ContactsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule, DpDatePickerModule
  ]
})
export class ContactsModule { }
