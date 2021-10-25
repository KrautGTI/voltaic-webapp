import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalComponent } from './proposal/proposal.component';
import { UtilityComponent } from './utility/utility.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SolarComponent } from './solar/solar.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalListComponent,
  },
  {
    path: 'create-proposal',
    component: ProposalComponent,
    children: [
      {
        path:'contract-proposal', component: ContactInfoComponent
      },
      {
        path:'utility-proposal', component: UtilityComponent
      },
      {
        path:'solar-proposal', component: SolarComponent
      }
    ]
  },
  // {
  //   path: 'contract-proposal',
  //   component: ContactInfoComponent,
  // },
  // {
  //   path: 'utility-proposal',
  //   component: UtilityComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalsRoutingModule {}
