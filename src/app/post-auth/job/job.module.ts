import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobReportsComponent } from './job-reports/job-reports.component';
import { JobReportsRoutingModule } from './job-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    JobReportsComponent
  ],
  imports: [
    CommonModule, JobReportsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class JobModule { }
