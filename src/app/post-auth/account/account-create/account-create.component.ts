import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { liveSearch } from 'src/app/common/live-search.operator';
import { AuthService } from 'src/app/service/auth.service';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import {
  AccountInformationLabels,
  AddressInformationLabels,
  DescriptionInformationLabels,
} from 'src/app/shared/constants/account.constant';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit, OnDestroy {
  public label: { [key: string]: FormField } = AccountInformationLabels;
  public addrLabel: { [key: string]: FormField } = AddressInformationLabels;
  public descLabel: { [key: string]: FormField } = DescriptionInformationLabels;
  public accountForm: FormGroup = new FormGroup({});
  private accountList: any = [];
  public leadOwners: any = '';
  public masterData: any = '';
  private searchTerm$ = new Subject<string>();
  private unsubscribe$: Subject<boolean> = new Subject();

  readonly searchValues$ = this.searchTerm$.pipe(
    // liveSearch((term) => this.genericService.getAccounts())
    liveSearch((term) => of(this.accountList))
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.accountForm.valueChanges
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((res) => {
    //     console.log(res);
    //     console.log(this.accountForm);
    //     console.log(this.accountForm.valid);
    //   });
    this.fetchRequiredData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  private createForm(): void {
    this.accountForm = this.fb.group({
      Tag: [''],
      login_id: [''],
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.accountForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
      const associatedfieldName = this.label[key].associatedfieldName;
      if (associatedfieldName) {
        this.accountForm.addControl(
          associatedfieldName,
          this.createControl(this.label[key])
        );
      }
    });
    Object.keys(this.addrLabel).forEach((key: string) => {
      const fieldName = this.addrLabel[key].fieldName;
      this.accountForm.addControl(
        fieldName,
        this.createControl(this.addrLabel[key])
      );
      const associatedfieldName = this.addrLabel[key].associatedfieldName;
      if (associatedfieldName) {
        this.accountForm.addControl(
          associatedfieldName,
          this.createControl(this.addrLabel[key])
        );
      }
    });
    Object.keys(this.descLabel).forEach((key: string) => {
      const fieldName = this.descLabel[key].fieldName;
      this.accountForm.addControl(
        fieldName,
        this.createControl(this.descLabel[key])
      );
      const associatedfieldName = this.descLabel[key].associatedfieldName;
      if (associatedfieldName) {
        this.accountForm.addControl(
          associatedfieldName,
          this.createControl(this.descLabel[key])
        );
      }
    });
    console.log(this.accountForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.fb.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.accountForm.get(name);
  }

  private fetchRequiredData(): void {
    const reqs: Observable<any>[] = [];
    const getAccounts$ = this.genericService.getAccounts();
    const getLeadOwners$ = this.genericService.getLeadOwnersWithUserFilter();
    const getMasterData$ = this.genericService.getMasterData();
    reqs.push(getAccounts$);
    reqs.push(getLeadOwners$);
    reqs.push(getMasterData$);
    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              const accountList = results[0];
              if (
                accountList?.message != 'Server Error' &&
                accountList?.error?.name != 'TokenExpiredError'
              ) {
                this.accountList = accountList.message
                  ? accountList.message
                  : '';
              } else if (accountList?.error?.name === 'TokenExpiredError') {
                const errMsg = 'Session Expired !! Please login again.';
                this.notificationService.error(errMsg, true);
              }
            }
            if (results[1]) {
              this.leadOwners = results[1] ? results[1] : '';
            }
            if (results[2]) {
              const masterData = results[2];
              this.masterData = masterData;
            }
          }
        },
        (error) => {
          const errMsg = 'Unable To fetch data. Please try again.';
          this.notificationService.error(errMsg, false);
        }
      );
  }

  public onChangeParentAccount(term: string): void {
    this.searchTerm$.next(term);
  }

  public saveAccount(): void {
    if (this.accountForm.valid) {
      const saveData = { ...this.accountForm.value };
      console.log('saveData=', saveData);
      Swal.fire({
        text: 'Do You Want To Save Changes?',
        icon: 'question',
        confirmButtonColor: '#A239CA',
        position: 'center',
        confirmButtonText: 'Yes',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'No',
      }).then((res) => {
        if (res.isConfirmed) {
          this.genericService
            .addModifyAccounts(saveData)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (dataValue: any) => {
                const successMsg = 'Account Created Succesfully';
                this.notificationService.success(
                  successMsg,
                  '/post-auth/accounts'
                );
              },
              (error: any) => {
                const errMsg = 'Unable To Save The Account';
                this.notificationService.error(errMsg);
              }
            );
        }
      });
    }
  }
}
