import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventsComponent } from './create-events.component';
import { CreateEventsRoutingModule } from './create-events-routing.module';



@NgModule({
  declarations: [
    CreateEventsComponent
  ],
  imports: [
    CommonModule,
    CreateEventsRoutingModule
  ]
})
export class CreateEventsModule { }
