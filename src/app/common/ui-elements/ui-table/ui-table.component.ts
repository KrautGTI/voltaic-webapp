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
  @Input() public tabData: any = [];
  @Input() public columnDefsConfigs: ColumnDefs[] = [];
  @Input() public rowSelection: string = 'single';
  @Output() public gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowGroupOpened: EventEmitter<any> = new EventEmitter<any>();
  public modules: any[] = AllModules;
  public columnDefs: ColumnDefs[] = [];
  public defaultColDef: any;
  public rowGroupPanelShow: any;
  public domLayout: any;
  public pivotPanelShow: any;

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
    // const firstColumn = this.columnDefsConfigs[0]
    //   ? this.columnDefsConfigs[0]
    //   : null;
    // if (firstColumn) {
    //   this.autoGroupColumnDef = {
    //     headerName: firstColumn.headerName ? firstColumn.headerName : '',
    //     field: firstColumn.field ? firstColumn.field : '',
    //     minWidth: 250,
    //     cellRenderer: 'agGroupCellRenderer',
    //     cellRendererParams: {
    //       checkbox: this.rowSelection === 'multiple' ? true : false,
    //     },
    //   };
    // }
    this.setColumnDefs();
  }
  private setColumnDefs(): void {
    const cellStyle = {
      color: '#212121',
      'font-size': '14px',
      height: '40px',
      cursor: 'pointer',
    };
    this.columnDefs = this.columnDefsConfigs.map((item, i: number) => {
      if (this.rowSelection === 'multiple' && i === 0) {
        item.headerCheckboxSelection = true;
        item.headerCheckboxSelectionFilteredOnly = true;
        item.checkboxSelection = true;
      }
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
