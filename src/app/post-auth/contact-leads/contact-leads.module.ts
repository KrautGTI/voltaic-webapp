import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLeadsComponent } from './contact-leads.component';
import { ContactLeadsRoutingModule } from './contact-leads-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ContactLeadsComponent
  ],
  imports: [
    CommonModule, ContactLeadsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class ContactLeadsModule { }
