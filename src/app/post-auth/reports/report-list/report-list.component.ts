import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ColumnDefsConfigs } from 'src/app/shared/constants/report.constant';
import { ColumnDefs } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit, OnDestroy {
  public tabData: any = [];
  public columnDefsConfigs: ColumnDefs[] = ColumnDefsConfigs;
  public gridApi: any;
  public gridColumnApi: any;
  public selectFolderArr: any[] = [];
  public isVisibleTable: boolean = false;
  public selectedFolder: any = null;
  private unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private genericService: GenericService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchRequiredData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  private fetchRequiredData(): void {
    const reqs: Observable<any>[] = [];
    const getFolders$ = this.genericService.getFolders();
    reqs.push(getFolders$);
    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              this.selectFolderArr =
                results[0].message && Array.isArray(results[0].message)
                  ? results[0].message
                  : [];
            }
          }
        },
        (error) => {
          const errMsg = 'Unable To fetch data. Please try again.';
          this.notificationService.error(errMsg, false);
        }
      );
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
