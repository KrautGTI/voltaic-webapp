import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalComponent } from './proposal/proposal.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalListComponent,
  },
  {
    path: 'create-proposal',
    component: ProposalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalsRoutingModule {}
