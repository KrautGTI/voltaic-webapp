import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReportListComponent,
  },
  {
    path: 'create-report',
    component: ReportCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
