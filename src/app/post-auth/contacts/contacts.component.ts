import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { LoaderService } from "../../shared/loader/loader.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

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

  constructor(private genericService: GenericService,
    private loaderService: LoaderService,
    private router: Router, private route: ActivatedRoute) { }

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
          cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
          field: 'First_Name',
        },
        {
          headerName: 'Last Name',
          cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
          field: 'Last_Name',
        },
        // {
        //   headerName: 'Contact Name',
        //   cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
        //   field: 'First_Name&Last_Name',
        //   valueGetter: (params:any) => {
        //     return params.data.First_Name + ' ' + params.data.Last_Name;
        //   },
        //   filterValueGetter: (params:any) => {
        //     return params.data.First_Name + ' ' + params.data.Last_Name;
        //   }
        // },
        {
          headerName: 'Email',
          field: 'Email',
          cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
        },
        {
          headerName: 'Phone',
          field: 'Phone',
          cellStyle: { color: '#212121', 'font-size': '14px', height: '40px', cursor: 'pointer' },
        },      
        {
          headerName: 'Contact Owner',
          field: 'ownerName',
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
     console.log(event.data.Contact_ID);
     this.router.navigate(['post-auth/contact-details'], { queryParams: { contactId: event.data.Contact_ID } });
    }
  
    onRowGroupOpeneds(params: any) {}
  
    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
        this.genericService.getContacts(this.userDetails.authorize_token, this.isAdmin).subscribe((userList: any) => {
          console.log(userList);
          if(userList?.message != 'Server Error' && userList?.error?.name != 'TokenExpiredError'){
            this.manageUserList = userList.message;
            this.rowData = this.manageUserList;
            this.loaderService.hide();
            this.sizeToFit();
          } else if(userList?.error?.name == 'TokenExpiredError'){
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

    // goToCreateContact() {
    //   this.router.navigate(['create-contact'], {relativeTo:this.route});
    // }

}
