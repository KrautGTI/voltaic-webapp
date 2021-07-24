import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AccountDetailsModule {}
