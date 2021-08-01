import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { ColumnDefs } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
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
    this.columnDefsConfigs = [
      {
        headerName: 'Account Name',
        field: 'Account_Name',
      },
      {
        headerName: 'Phone',
        field: 'Phone',
      },
      {
        headerName: 'Website',
        field: 'Website',
      },
      {
        headerName: 'Account Owner',
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
