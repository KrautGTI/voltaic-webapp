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
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private dataService: DataService,
  ) { }

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
        headerName: 'Event Task',
        field: 'task',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Assigned To',
        field: 'assignedTo',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Date',
        field: 'date',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Time',
        field: 'time',
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
    console.log(event.data.id);
    this.rowData.forEach((ele: any) => {
      if(ele.id == event.data.id) {
        this.genericService.setAppointmentData(ele);
      } 
    });
    this.action = 'edit';
    this.navigateToCreateEvent();
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    let payload = { 
      role : this.userDetails.user_role
    }
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.genericService.loadEvents(payload).subscribe(
      (appointmentList: any) => {
      this.rowData = appointmentList.message;
      console.log(this.rowData)
    }, (error: any) => {
      const errMsg = 'Unable To Load The Data';
      this.notificationService.error(errMsg);
    });
    // this.rowData = [
    //   {
    //     event_task : "Appointment",
    //     assigned_to : "Kanon Olivier",
    //     status : "Scheduled",
    //     date_time : "10-06-2021 at 06:00 PM"
    //   }
    // ]
    // this.genericService.getLeads().subscribe(
    //   (userList: any) => {
    //     console.log(userList);
    //     if (
    //       userList?.message != 'Server Error' &&
    //       userList?.error?.name != 'TokenExpiredError'
    //     ) {
    //       this.manageUserList = userList.message;
    //       this.rowData = this.manageUserList;
    //       this.sizeToFit();
    //     } else if (userList?.error?.name === 'TokenExpiredError') {
    //       const errMsg = 'Session Expired !! Please login again.';
    //       this.notif:icationService.error(errMsg, true);
    //     }
    //   },
    //   (error) => {
    //     const errMsg = 'Unable To fetch data. Please try again.';
    //     this.notificationService.error(errMsg);
    //   }
    // );
    // }
  }

  navigateToCreateEvent() {
    if(this.action == 'edit' || this.action == 'view') {
      this.router.navigate(['post-auth/create-events'], {queryParams: { leadId: this.leadId, action: this.action } });
    }
  }

  changeProgressBar(status: string) {
    let progressdata = localStorage.getItem('userSessionProgressData');
      if (progressdata) {
        this.progressStatus = JSON.parse(progressdata);
      } else {
        this.dataService.currentPogressData.subscribe(progressStatus => this.progressStatus = progressStatus);
      }
      this.progressStatus.appointment = status;
      this.dataService.changeStatus(this.progressStatus);
  }

}
