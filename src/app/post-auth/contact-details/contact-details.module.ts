import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactDetailsRoutingModule } from './contact-details-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ContactDetailsComponent
  ],
  imports: [
    CommonModule, ContactDetailsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class ContactDetailsModule { }
