import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsEventsComponent } from './leads-events.component';
import { LeadsEventsRoutingModule } from './leads-events-routing.module';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    LeadsEventsComponent
  ],
  imports: [
    CommonModule,
    LeadsEventsRoutingModule,
    AgGridModule,
  ]
})
export class LeadsEventsModule { }
