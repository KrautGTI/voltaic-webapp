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
        path: 'job-reports',
        loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage/manage.module').then((m) => m.ManageModule),
      },
      {
        path: 'leads',
        loadChildren: () =>
          import('./contact-leads/contact-leads.module').then(
            (m) => m.ContactLeadsModule
          ),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'proposals',
        loadChildren: () =>
          import('./proposals/proposals.module').then((m) => m.ProposalsModule),
      },
      {
        path: 'deals',
        loadChildren: () =>
          import('./deals/deals.module').then((m) => m.DealsModule),
      },
      {
        path: 'contact-details',
        loadChildren: () =>
          import('./contact-details/contact-details.module').then(
            (m) => m.ContactDetailsModule
          ),
      },
      {
        path: 'account-details',
        loadChildren: () =>
          import('./account-details/account-details.module').then(
            (m) => m.AccountDetailsModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAuthRoutingModule {}
