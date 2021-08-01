import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-job-reports',
  templateUrl: './job-reports.component.html',
  styleUrls: ['./job-reports.component.scss'],
})
export class JobReportsComponent implements OnInit {
  modules: any[] = AllModules;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  defaultColGroupDef: any;
  columnTypes: any;
  rowData = [];
  jobReportList = [];
  columnDef = [];
  public sideBar: any;
  rowGroupPanelShow: any;
  pivotPanelShow: any;
  rowSelection: any;
  onRowGroupOpened: any;
  rowDatas: any = [];
  paginationPageSize: any;
  autoGroupColumnDef: any;
  domLayout: any;
  rowHeight: any;
  paginationNumberFormatter: any;
  sortingOrder: any;
  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Job Name',
        field: 'job_name',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Company',
        field: 'company',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'City',
        field: 'address_city',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Phone',
        field: 'phone',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Contract Amount',
        field: 'contract_amount',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      // {
      //   headerName: 'Contract Date',
      //   field: 'contract_date',
      //   cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      //   cellRenderer: (params: any) => {
      //     return params.value.toString();
      //    }
      // },
      {
        headerName: 'Engineering',
        field: 'engineering',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'Inspection',
        field: 'inspection',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'Installation',
        field: 'installation',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'job Acceptance Status',
        field: 'job_acceptance_status',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'CRM',
        field: 'crm',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Market',
        field: 'market',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'System Size',
        field: 'system_size',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      },
      {
        headerName: 'Team',
        field: 'team',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      },
      {
        headerName: 'Lender New',
        field: 'lender_new',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      },
      {
        headerName: 'Site Inspection',
        field: 'site_inspection',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'Permit',
        field: 'permit',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'Phase',
        field: 'phase',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      {
        headerName: 'PTO',
        field: 'pto',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
        cellRenderer: (params: any) => {
          return params.value;
        },
      },
      // {
      //   headerName: 'PV Planset',
      //   field: 'pv_planset',
      //   cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      // },
      {
        headerName: 'Related Rep',
        field: 'related_rep',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      },
      {
        headerName: 'Utility Company',
        field: 'utility_company',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      },
      // {
      //   headerName: 'Permit Card',
      //   field: 'permit_card',
      //   cellStyle: { color: '#212121', 'font-size': '14px', height: '40px' },
      // },
    ];
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

    this.paginationPageSize = 15;
    this.rowSelection = 'single';
    this.paginationNumberFormatter = function (params: any) {
      return '[' + params.value.toLocaleString() + ']';
    };
    this.sideBar = {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
    };
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.domLayout = 'autoHeight';
    this.sortingOrder = ['desc', 'asc', null];
    this.rowHeight = 45;
  }

  sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }

  onRowClick(event: any) {
    // console.log(event.data.id);
    // this.router.navigate(['post-auth/contact/details'], { queryParams: { contactId: event.data.id } });
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.genericService.getJobReports().subscribe(
      (reportList: any) => {
        console.log(reportList);
        if (
          reportList?.message != 'Server Error' &&
          reportList?.error?.name != 'TokenExpiredError'
        ) {
          this.jobReportList = reportList.message;
          this.rowData = this.jobReportList;
          this.sizeToFit();
        } else if (reportList?.error?.name === 'TokenExpiredError') {
          const errMsg = 'Session Expired !! Please login again.';
          this.notificationService.error(errMsg, true);
        }
      },
      (error) => {
        const errMsg = 'Unable To fetch data. Please try again.';
        this.notificationService.error(errMsg);
      }
    );
    // }
  }
}
