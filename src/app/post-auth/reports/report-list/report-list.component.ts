import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ColumnDefs } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
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
        headerName: 'Report Name',
        field: 'Account_Name',
      },
      {
        headerName: 'Description',
        field: 'Description',
      },
      {
        headerName: 'Last Run Date',
        field: 'Created_Time',
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
      (error: any) => {
        const errMsg = 'Unable To fetch data. Please try again.';
        this.notificationService.error(errMsg);
      }
    );
  }
  private sizeToFit() {
    this.gridApi?.sizeColumnsToFit();
  }
  public onRowClick(event: any): void {
    console.log(this.gridApi.getSelectedRows());
  }
}
