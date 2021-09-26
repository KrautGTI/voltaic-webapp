import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactLeadsComponent } from './contact-leads.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
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
      { path: 'utility-info', component:UtilityInfoComponent }
   ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactLeadsRoutingModule {}
