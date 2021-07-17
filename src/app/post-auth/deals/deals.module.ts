import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './deals.component';
import { DealsRoutingModule } from "./deals-routing.module";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    DealsComponent
  ],
  imports: [
    CommonModule, DealsRoutingModule, JwtModule.forRoot({
      // config: {
      //   tokenGetter: tokenGetter,
      //   allowedDomains: ["example.com"],
      //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      // },
    }), 
    DragDropModule,
  ]
})
export class DealsModule { }
