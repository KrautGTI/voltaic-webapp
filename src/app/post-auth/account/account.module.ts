import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AccountCreateComponent } from './account-create/account-create.component';



@NgModule({
  declarations: [
    AccountComponent,
    AccountCreateComponent
  ],
  imports: [
    CommonModule, AccountRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class AccountModule { }
