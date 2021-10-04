import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule, ProjectDetailsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule, DpDatePickerModule
  ]
})
export class ProjectDetailsModule { }
