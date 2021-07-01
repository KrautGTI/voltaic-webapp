import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobReportsComponent } from './job-reports/job-reports.component';
import { JobRoutingModule } from './job-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    JobReportsComponent
  ],
  imports: [
    CommonModule, JobRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class JobModule { }
