import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLeadsComponent } from './contact-leads.component';
import { ContactLeadsRoutingModule } from './contact-leads-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UtilityInfoComponent } from './utility-info/utility-info.component';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { ProposalInfoComponent } from './proposal-info/proposal-info.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { FormFieldsModule } from 'src/app/common/form-fields/form-fields.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';


@NgModule({
  declarations: [
    ContactLeadsComponent,
    LeadDetailsComponent,
    ProgressBarComponent,
    ContactInfoComponent,
    UtilityInfoComponent,
    LeadInfoComponent,
    ProposalInfoComponent,
    AdminInfoComponent,
    ScheduleAppointmentComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule, ContactLeadsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule, FormFieldsModule
  ]
})
export class ContactLeadsModule { }
