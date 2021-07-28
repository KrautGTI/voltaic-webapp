import { AllModules } from '@ag-grid-enterprise/all-modules';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColumnDefs } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
})
export class UiTableComponent implements OnInit, OnChanges {
  @Input() tabData: any = [];
  @Input() columnDefsConfigs: ColumnDefs[] = [];
  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowGroupOpened: EventEmitter<any> = new EventEmitter<any>();
  public modules: any[] = AllModules;
  public columnDefs: ColumnDefs[] = [];
  public defaultColDef: any;
  public rowGroupPanelShow: any;
  public domLayout: any;
  public pivotPanelShow: any;
  public rowSelection: any;
  public paginationPageSize: any;
  public paginationNumberFormatter: any;
  public rowHeight: any;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columnDefsConfigs) {
      this.setDefaultConfig();
    }
  }

  ngOnInit(): void {
    this.setDefaultConfig();
  }
  private setDefaultConfig(): void {
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.domLayout = 'autoHeight';
    this.rowHeight = 45;
    this.rowSelection = 'single';
    this.paginationPageSize = 15;
    this.paginationNumberFormatter = function (params: any) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
      rowHeight: 20,
      minWidth: 150,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    };
    this.setColumnDefs();
  }
  private setColumnDefs(): void {
    const cellStyle = {
      color: '#212121',
      'font-size': '14px',
      height: '40px',
      cursor: 'pointer',
    };
    this.columnDefs = this.columnDefsConfigs.map((item) => {
      item.cellStyle = cellStyle;
      return item;
    });
  }
  public onRowGroupOpened(params: any) {
    this.rowGroupOpened.emit(params);
  }
  public onGridReady(params: any) {
    this.gridReady.emit(params);
  }
  public onRowClick(event: any): void {
    this.rowClick.emit(event);
  }
}
