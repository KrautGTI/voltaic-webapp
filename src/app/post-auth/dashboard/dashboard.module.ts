import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, DashboardRoutingModule, JwtModule.forRoot({
      // config: {
      //   tokenGetter: tokenGetter,
      //   allowedDomains: ["example.com"],
      //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      // },
    }),
    // ChartsModule
    NgxChartsModule
  ]
})
export class DashboardModule { }
