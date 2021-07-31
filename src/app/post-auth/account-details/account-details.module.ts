import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { UiElementsModule } from 'src/app/common/ui-elements/ui-elements.module';
import { FormFieldsModule } from 'src/app/common/form-fields/form-fields.module';

@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    UiElementsModule,
    FormFieldsModule,
  ],
})
export class AccountDetailsModule {}
