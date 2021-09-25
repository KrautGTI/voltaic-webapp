import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalsRoutingModule } from './proposals-routing.module';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UtilityComponent } from './utility/utility.component';
import { SolarComponent } from './solar/solar.component';
import { AddersComponent } from './adders/adders.component';
import { FinancingComponent } from './financing/financing.component';
import { AdminComponent } from './admin/admin.component';
import { ProposalFormComponent } from './proposal-form/proposal-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldsModule } from 'src/app/common/form-fields/form-fields.module';
import { UiElementsModule } from 'src/app/common/ui-elements/ui-elements.module';
import { HomeOwnerComponent } from './home-owner/home-owner.component';

@NgModule({
  declarations: [
    ProposalListComponent,
    ProposalComponent,
    ContactInfoComponent,
    UtilityComponent,
    SolarComponent,
    AddersComponent,
    FinancingComponent,
    AdminComponent,
    ProposalFormComponent,
    HomeOwnerComponent,
  ],
  imports: [
    CommonModule,
    ProposalsRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    FormFieldsModule,
    UiElementsModule,
  ],
})
export class ProposalsModule {}
