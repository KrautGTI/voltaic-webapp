import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { LoaderService } from "../../shared/loader/loader.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-contact-leads',
  templateUrl: './contact-leads.component.html',
  styleUrls: ['./contact-leads.component.scss']
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
  userDetails: any;
  isAdmin: boolean = false;
  
  constructor(
    private genericService: GenericService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    this.userDetails = userData
      ? JSON.parse(userData)
      : null;
    this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
    this.loaderService.show();
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'first_name',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Last Name',
        field: 'last_name',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Email',
        field: 'email',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Phone No.',
        field: 'phone',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'City',
        field: 'city',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'State',
        field: 'state',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Street',
        field: 'street',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Zip Code',
        field: 'zip_code',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Company',
        field: 'company',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Avg. Monthly Bill',
        field: 'average_monthly_bill',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },  
      {
        headerName: 'Description',
        field: 'description',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Owner',
        field: 'ownerName',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Owner Email',
        field: 'ownerEmail',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Lead Source',
        field: 'master_lead_source_id',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Lead Status',
        field: 'master_lead_status',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
      },
      {
        headerName: 'Energy Consultant',
        field: 'master_energy_consultant_id',
        cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
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

  onRowClick(event:any) {
   // console.log(event.data.id);
   // this.router.navigate(['post-auth/contact/details'], { queryParams: { contactId: event.data.id } });
  }

  onRowGroupOpeneds(params: any) {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
      this.genericService.getLeadContacts(this.userDetails.authorize_token, this.isAdmin).subscribe((userList: any) => {
        console.log(userList);
        if(userList.message){
          this.manageUserList = userList.message;
          this.rowData = this.manageUserList;
          this.loaderService.hide();
          this.sizeToFit();
        } else if(userList.error.name === 'TokenExpiredError'){
          const errMsg = "Session Expired !! Please login again.";
          Swal.fire({
            text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
            confirmButtonText: 'OK'
          }).then(res => {
            this.logout();
          });
        }
      }, (error) => {
          this.loaderService.hide();
          const errMsg = "Unable To fetch data. Please try again.";
          Swal.fire({
            text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
            confirmButtonText: 'OK'
          });
      });
    // }
  }
  logout() {
    this.genericService.logoutApi(this.userDetails.authorize_token).subscribe((data: any) => { 
      console.log(data);
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }
}


