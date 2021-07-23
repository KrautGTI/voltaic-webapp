import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsComponent } from "./deals.component";
import { CreateDealComponent } from './create-deal/create-deal.component';
import { DealDetailsComponent } from './deal-details/deal-details.component';

const routes: Routes = [
  {
    path: '',
    component: DealsComponent
  },
  {
    path: 'create-deal',
    component: CreateDealComponent
  },
  {
    path: 'deal-details',
    component: DealDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
