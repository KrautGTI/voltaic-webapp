import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsEventsComponent } from './leads-events.component';

const routes: Routes = [
  {
    path: '',
    component: LeadsEventsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsEventsRoutingModule { }
