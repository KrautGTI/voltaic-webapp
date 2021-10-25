import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ColumnDefs } from 'src/app/shared/models/util.model';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss'],
})
export class ProposalListComponent implements OnInit {
  modules: any[] = AllModules;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  defaultColGroupDef: any;
  columnTypes: any;
  rowData:any = [];
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
  userDetails: any;

  leadId = '';
  action = '';
  sub: any;
  progressStatus:any;

  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : '';
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'first_name'
      },
      {
        headerName: 'Last Name',
        field: 'last_name'
      },
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Phone No.',
        field: 'phone'
      },
      {
        headerName: 'City',
        field: 'city'
      },
      {
        headerName: 'State',
        field: 'state'
      },
      {
        headerName: 'Street',
        field: 'street'
      },
      {
        headerName: 'Zip Code',
        field: 'zip_code'
      },
      {
        headerName: 'Type',
        field: 'type'
      },
      {
        headerName: 'Status',
        field: 'status'
      },
      {
        headerName: 'Watts',
        field: 'watts'
      },
      {
        headerName: 'Contract Amount',
        field: 'contract'
      },
      {
        headerName: 'Financing',
        field: 'financing'
      },
      {
        headerName: 'Lead Generator',
        field: 'master_lead_owner'
      },
      {
        headerName: 'Sales Rep',
        field: 'sales_rep'
      },
      {
        headerName: 'Installer',
        field: 'installer'
      },
      {
        headerName: 'Primary Language',
        field: 'primary_lang'
      },
      {
        headerName: 'Date Created',
        field: 'created_at'
      }
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
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.genericService.getAllProposals({role:this.userDetails.user_role}).subscribe(
      (userList: any) => {
        console.log(userList);
        if (
          userList?.message != 'Server Error' &&
          userList?.message != 'No Record Found..' &&
          userList?.error?.name != 'TokenExpiredError'
        ) {
          this.rowData = userList.message;
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
  }
  sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }
  onRowClick(event: any) {
    console.log(event.data);
    this.genericService.setProposalData(event.data);
    this.router.navigate(['post-auth/proposals/create-proposal/contract-proposal'], {queryParams: { leadId: event.data.lead_id, action: 'edit' } });
  }
  onRowGroupOpeneds(params: any) {}
}
