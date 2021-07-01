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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAuthRoutingModule {}
