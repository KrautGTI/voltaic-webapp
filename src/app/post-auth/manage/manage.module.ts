import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageRoutingModule } from './manage-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ManageUsersComponent
  ],
  imports: [
    CommonModule, ManageRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class ManageModule { }