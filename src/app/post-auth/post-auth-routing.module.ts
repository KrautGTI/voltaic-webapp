import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostAuthComponent } from './post-auth.component';

const routes: Routes = [
  {
    path: '',
    component: PostAuthComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'job',
        loadChildren: () =>
          import('./job/job.module').then((m) => m.JobModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage/manage.module').then((m) => m.ManageModule),
      },
      {
        path: 'contact-leads',
        loadChildren: () =>
          import('./contact-leads/contact-leads.module').then((m) => m.ContactLeadsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAuthRoutingModule {}
