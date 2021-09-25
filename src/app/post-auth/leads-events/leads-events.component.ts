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
  selector: 'app-leads-events',
  templateUrl: './leads-events.component.html',
  styleUrls: ['./leads-events.component.scss'],
})
export class LeadsEventsComponent implements OnInit {
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

  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.columnDefs = [
      { field: 'month', rowGroup: true, hide: true },
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
      },
      {
        headerName: 'Task',
        field: 'task',
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
        headerName: 'Detail',
        field: 'detail',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Homeowner/Customer',
        field: 'homeOwner',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Address',
        field: 'address',
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
        headerName: 'Employee',
        field: 'employee',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Dealer',
        field: 'dealer',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Source',
        field: 'source',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Record Owner',
        field: 'recordOwner',
        cellStyle: {
          color: '#212121',
          'font-size': '14px',
          height: '40px',
          cursor: 'pointer',
        },
      },
      {
        headerName: 'Date Created',
        field: 'dateCreated',
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
  createNew() {
    this.router.navigate(['post-auth/create-events'])
  }
  onRowClick(event: any) {
    // console.log(event.data.id);
    // this.router.navigate(['post-auth/contact/details'], { queryParams: { contactId: event.data.id } });
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = [
      {
        month : "JUL 2021",
        date : "01-07-2021",
        time : "05:00 p.m.",
        task : "Appointment",
        status : "Scheduled",
        detail : "",
        homeOwner : "Socorro & Jorge",
        address : "5442 Pomeroy Circle, Las Vegas, Nevada 89142",
        phone : "(949) 630-1451",
        employee : "Dareon King",
        dealer: "True Power",
        source: "Door",
        recordOwner: "David Duke",
        dateCreated : "07-13-21 03:46 PM"
      },
      {
        month : "JUL 2021",
        date : "01-07-2021",
        time : "05:00 p.m.",
        task : "Appointment",
        status : "Scheduled",
        detail : "",
        homeOwner : "Socorro & Jorge",
        address : "5442 Pomeroy Circle, Las Vegas, Nevada 89142",
        phone : "(949) 630-1451",
        employee : "Dareon King",
        dealer: "True Power",
        source: "Door",
        recordOwner: "David Duke",
        dateCreated : "07-13-21 03:46 PM"
      },
      {
        month : "NOV 2021",
        date : "01-11-2021",
        time : "05:00 p.m.",
        task : "Appointment",
        status : "Scheduled",
        detail : "",
        homeOwner : "Socorro & Jorge",
        address : "5442 Pomeroy Circle, Las Vegas, Nevada 89142",
        phone : "(949) 630-1451",
        employee : "Dareon King",
        dealer: "True Power",
        source: "Door",
        recordOwner: "David Duke",
        dateCreated : "07-13-21 03:46 PM"
      },
      {
        month : "SEP 2021",
        date : "01-09-2021",
        time : "05:00 p.m.",
        task : "Appointment",
        status : "Scheduled",
        detail : "",
        homeOwner : "Socorro & Jorge",
        address : "5442 Pomeroy Circle, Las Vegas, Nevada 89142",
        phone : "(949) 630-1451",
        employee : "Dareon King",
        dealer: "True Power",
        source: "Door",
        recordOwner: "David Duke",
        dateCreated : "07-13-21 03:46 PM"
      },
      {
        month : "AUG 2021",
        date : "01-08-2021",
        time : "05:00 p.m.",
        task : "Appointment",
        status : "Scheduled",
        detail : "",
        homeOwner : "Socorro & Jorge",
        address : "5442 Pomeroy Circle, Las Vegas, Nevada 89142",
        phone : "(949) 630-1451",
        employee : "Dareon King",
        dealer: "True Power",
        source: "Door",
        recordOwner: "David Duke",
        dateCreated : "07-13-21 03:46 PM"
      }
    ]
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
}
