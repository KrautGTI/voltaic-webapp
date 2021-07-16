import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule, ContactsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class ContactsModule { }
