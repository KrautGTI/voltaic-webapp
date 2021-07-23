import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './deals.component';
import { DealsRoutingModule } from "./deals-routing.module";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DealDetailsComponent } from './deal-details/deal-details.component';

@NgModule({
  declarations: [
    DealsComponent,
    CreateDealComponent,
    DealDetailsComponent
  ],
  imports: [
    CommonModule, DealsRoutingModule, JwtModule.forRoot({
      // config: {
      //   tokenGetter: tokenGetter,
      //   allowedDomains: ["example.com"],
      //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      // },
    }), 
    DragDropModule, ReactiveFormsModule, FormsModule
  ]
})
export class DealsModule { }
