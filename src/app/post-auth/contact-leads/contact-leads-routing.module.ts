import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactLeadsComponent } from './contact-leads.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { UtilityInfoComponent } from './utility-info/utility-info.component';

const routes: Routes = [
  {
    path: '',
    component: ContactLeadsComponent,
  },
  {
    path: 'lead-details',
    component: LeadDetailsComponent,
    children: [
      { path: 'contact-info', component:ContactInfoComponent },
      { path: 'utility-info', component:UtilityInfoComponent },
      { path: 'lead-info', component:LeadInfoComponent },
      { path: 'schedule-appointment', component:ScheduleAppointmentComponent }
   ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactLeadsRoutingModule {}
