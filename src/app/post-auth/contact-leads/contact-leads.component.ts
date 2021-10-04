import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contact-leads',
  templateUrl: './contact-leads.component.html',
  styleUrls: ['./contact-leads.component.scss'],
})
export class ContactLeadsComponent implements OnInit {
  modules: any[] = AllModules;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  defaultColGroupDef: any;
  columnTypes: any;
  rowData = [];
  manageUserList = [];
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
  rowStyle: any;
  headerHeight:any;

  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('userSessionProgressData');
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'first_name',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Last Name',
        field: 'last_name',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Email',
        field: 'email',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Phone No.',
        field: 'phone',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'City',
        field: 'city',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'State',
        field: 'state',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Street',
        field: 'street',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Zip Code',
        field: 'zip_code',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Lead Source',
        field: 'master_lead_source_id',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Lead Generator',
        field: 'master_lead_owner_id',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Primary Language',
        field: 'primary_lang',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Sales Rep',
        field: 'sales_rep_id',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Events',
        field: 'events',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Proposals',
        field: 'proposals',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Projects',
        field: 'projects',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Date/Time Created',
        field: 'created_at',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
      rowHeight: 45,
      minWidth: 150,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      paginationAutoPageSize: true,
      autoHeight: true,
    };

    this.paginationPageSize = 20;
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
    this.rowStyle = { background: 'white', padding: '8px'};
    this.headerHeight = 35;
  }

  sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }

  onRowClick(event: any) {
    console.log(event.data.id);
    this.rowData.forEach((ele: any) => {
      if(ele.id == event.data.id) {
        this.genericService.setLeadData(ele);
      } 
    });
    this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
      queryParams: { leadId: event.data.id, action: 'view' }
    });
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.genericService.getLeadsMaster().subscribe(
      (userList: any) => {
        console.log(userList);
        if (
          userList?.message != 'Server Error' &&
          userList?.error?.name != 'TokenExpiredError'
        ) {
          this.manageUserList = userList.data;
          this.rowData = this.manageUserList;
          this.sizeToFit();
        } else if (userList?.error?.name === 'TokenExpiredError') {
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
