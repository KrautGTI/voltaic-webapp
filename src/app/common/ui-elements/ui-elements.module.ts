import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTableComponent } from './ui-table/ui-table.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [UiTableComponent],
  imports: [CommonModule, AgGridModule],
  exports: [UiTableComponent],
})
export class UiElementsModule {}
