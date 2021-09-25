import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ColumnDefs } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss'],
})
export class ProposalListComponent implements OnInit {
  public tabData: any = [];
  public columnDefsConfigs: ColumnDefs[] = [];
  public gridApi: any;
  public gridColumnApi: any;

  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // this.columnDefsConfigs = [
    //   {
    //     headerName: 'Account Name',
    //     field: 'Account_Name',
    //   },
    //   {
    //     headerName: 'Phone',
    //     field: 'Phone',
    //   },
    //   {
    //     headerName: 'Website',
    //     field: 'Website',
    //   },
    //   {
    //     headerName: 'Account Owner',
    //     field: 'ownerName',
    //   },
    // ];
    this.columnDefsConfigs = [
      {
        headerName: 'Homeowner',
        field: 'Account_Name',
      },
      {
        headerName: 'Address',
        field: 'Phone',
      },
      {
        headerName: 'Type',
        field: 'Website',
      },
      {
        headerName: 'Status',
        field: 'ownerName',
      },
      {
        headerName: 'Watts',
        field: 'ownerName',
      },
      {
        headerName: 'Contract Amount',
        field: 'ownerName',
      },
      {
        headerName: 'Financing',
        field: 'ownerName',
      },
      {
        headerName: 'Lead Generator',
        field: 'ownerName',
      },
      {
        headerName: 'Sales Rep',
        field: 'ownerName',
      },
      {
        headerName: 'Installer',
        field: 'ownerName',
      },
      {
        headerName: 'Primary Language',
        field: 'ownerName',
      },
      {
        headerName: 'Date Created',
        field: 'ownerName',
      },
      {
        headerName: 'Status',
        field: 'ownerName',
      },
    ];
  }
  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.genericService.getAccounts().subscribe(
      (userList: any) => {
        if (
          userList?.message != 'Server Error' &&
          userList?.error?.name != 'TokenExpiredError'
        ) {
          this.tabData = userList.message;
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
  private sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }
  public onRowClick(event: any): void {
    this.router.navigate(['post-auth/account-details'], {
      queryParams: { accountId: event.data.Account_ID },
    });
  }
}
