import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobReportsComponent } from './job-reports/job-reports.component';

const routes: Routes = [
  {
    path: '',
    component: JobReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
