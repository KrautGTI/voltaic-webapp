import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
import { NotificationService } from 'src/app/service/notification.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-proposal-info',
  templateUrl: './proposal-info.component.html',
  styleUrls: ['./proposal-info.component.scss']
})
export class ProposalInfoComponent implements OnInit {
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

  constructor(private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private dataService: DataService) { }

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : '';
    
    this.sub = this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'create') {
        this.leadId = this.genericService.getLeadId();
      } else if(this.action == 'edit') {
        this.leadId = params.leadId;
      }
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
    });
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
        field: 'sales_rep_id'
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

  sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }
  onRowClick(event: any) {
    //console.log(event.data.id);
    this.genericService.setProposalData(event.data);
    // this.rowData.forEach((ele: any) => {
    //   if(ele.id == event.data.id) {
    //     this.genericService.setProposalData(ele);
    //   } 
    // });
    this.action = 'edit';
    this.navigateToCreateProposal();
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    // let payload = { 
    //   role : this.userDetails.user_role
    // }
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sub = this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'edit' || this.action == 'view') {
        this.leadId = params.leadId;
      }
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
      this.genericService.getProposalByLead(this.leadId).subscribe(
        (userList: any) => {
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
        console.log(this.rowData);
      }, (error: any) => {
        const errMsg = 'Unable To Load The Data';
       // this.notificationService.error(errMsg);
      });
    });
    
  }

    navigateToCreateProposal() {
      if(this.action == 'edit' || this.action == 'view') {
        this.router.navigate(['post-auth/proposals/create-proposal/contract-proposal'], {queryParams: { leadId: this.leadId, action: this.action } });
      }
    }
  
    changeProgressBar(status: string) {
      let progressdata = localStorage.getItem('userSessionProgressData');
        if (progressdata) {
          this.progressStatus = JSON.parse(progressdata);
        } else {
          this.dataService.currentPogressData.subscribe(progressStatus => this.progressStatus = progressStatus);
        }
        this.progressStatus.proposal = status;
        this.dataService.changeStatus(this.progressStatus);
    }

}
