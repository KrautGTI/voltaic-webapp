import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportGenerateModule } from 'src/app/common/report-generate/report-generate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from 'src/app/common/ui-elements/ui-elements.module';


@NgModule({
  declarations: [
    ReportCreateComponent,
    ReportEditComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReportGenerateModule,
    UiElementsModule
  ]
})
export class ReportsModule { }
