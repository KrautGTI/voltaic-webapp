import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SaleInfoComponent } from './sale-info/sale-info.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { ContactProjectComponent } from './contact-project/contact-project.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    SaleInfoComponent,
    OtherInfoComponent,
    ContactProjectComponent
  ],
  imports: [
    CommonModule, ProjectsRoutingModule, AgGridModule, ReactiveFormsModule, FormsModule
  ]
})
export class ProjectsModule { }