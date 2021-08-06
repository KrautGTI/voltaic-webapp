import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleInfoComponent } from './module-info/module-info.component';
import { ReportTypeComponent } from './report-type/report-type.component';
import { ReportRepresentationComponent } from './report-representation/report-representation.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ReportRouteComponent } from './report-route/report-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldsModule } from '../form-fields/form-fields.module';
import { ColumnsSelectionComponent } from './columns-selection/columns-selection.component';
import { FolderCreateComponent } from './folder-create/folder-create.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ModuleInfoComponent,
    ReportTypeComponent,
    ReportRepresentationComponent,
    ReportFilterComponent,
    BasicInfoComponent,
    ReportRouteComponent,
    ColumnsSelectionComponent,
    FolderCreateComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
  ],
  exports: [
    ModuleInfoComponent,
    ReportTypeComponent,
    ReportRepresentationComponent,
    ReportFilterComponent,
    BasicInfoComponent,
    ReportRouteComponent,
    ColumnsSelectionComponent,
  ],
})
export class ReportGenerateModule {}
