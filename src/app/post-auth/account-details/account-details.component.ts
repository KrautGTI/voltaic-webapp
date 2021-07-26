import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { GenericService } from '../../service/generic.service';
import { AuthService } from '../../service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import Swal from 'sweetalert2';
import { UserDetailsModel } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  public accountId: string = '';
  public accountDetails: any = null;
  private userDetails: UserDetailsModel | null = null;
  private isAdmin: boolean = false;
  public accountDetailsForm: FormGroup;
  private leadSources: any = '';
  private marketers: any = '';
  public leadOwners: any = '';
  private secondMarketers: any = '';
  private energyConsultant: any = '';
  private stages: any = '';
  public dealsList: any = '';
  private accountList: any = [];
  private targetField: string = '';
  private unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private genericService: GenericService,
    private loaderService: LoaderService,
    private elementRef: ElementRef
  ) {
    this.accountDetailsForm = this.fb.group({});
    this.userDetails = this.authService.getUserDetails();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.route.queryParams.subscribe((params) => {
      this.accountId = params.accountId;
      this.fetchRequiredDetails();
    });
    this.createForm();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  private createForm(): void {
    this.accountDetailsForm = this.fb.group({
      Account_Owner_ID: [''],
      Industry: [''],
      Employees: [''],
      Annual_Revenue: [''],
      Phone: [''],
      Account_Owner: [''],
      Account_Name: [''],
      Account_Site: [''],
      Parent_Account_ID: [''],
      Account_Number: [''],
      Account_Type: [''],
      Average_Bill: [''],
      Created_By: [''],
      Modified_By: [''],
      Fax: [''],
      Website: [''],
      Ticker_Symbol: [''],
      Ownership: [''],
      SIC_Code: [''],
      Reschedule_Cycle_Time: [''],
      Billing_Street: [''],
      Shipping_Street: [''],
      Billing_City: [''],
      Shipping_City: [''],
      Billing_State: [''],
      Shipping_State: [''],
      Billing_Code: [''],
      Shipping_Code: [''],
      Billing_Country: [''],
      Shipping_Country: [''],
      Description: [''],
      Notes: [''],
    });
  }
  private fetchRequiredDetails(): void {
    const reqs: Observable<any>[] = [];
    const authorize_token = this.userDetails
      ? this.userDetails.authorize_token
      : null;
    const getSource$ = this.genericService.getSources();
    const getMarketers$ = this.genericService.getMarketers();
    const getSecondMarketers$ = this.genericService.getSecondMarketers();
    const getLeadOwners$ = this.genericService.getLeadOwners();
    const getEnergyConsultant$ = this.genericService.getEnergyConsultant();
    const getStages$ = this.genericService.getStages();
    const getDealsFromContact$ = this.genericService.getDealsFromContact(
      '',
      this.accountId
    );
    reqs.push(getSource$);
    reqs.push(getMarketers$);
    reqs.push(getSecondMarketers$);
    reqs.push(getLeadOwners$);
    reqs.push(getEnergyConsultant$);
    reqs.push(getStages$);
    // reqs.push(getDealsFromContact$);
    if (authorize_token) {
      const getAccounts$ = this.genericService.getAccounts(
        authorize_token,
        this.isAdmin
      );
      reqs.push(getAccounts$);
    }

    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              this.leadSources = results[0].message ? results[0].message : '';
            }
            if (results[1]) {
              this.marketers = results[1].message ? results[1].message : '';
            }
            if (results[2]) {
              this.secondMarketers = results[2].message
                ? results[2].message
                : '';
            }
            if (results[3]) {
              this.leadOwners = results[3].message ? results[3].message : '';
            }
            if (results[4]) {
              this.energyConsultant = results[4].message
                ? results[4].message
                : '';
            }
            if (results[5]) {
              this.stages = results[5].message ? results[5].message : '';
            }
            // if (results[6]) {
            //   this.dealsList =
            //     results[6].message && results[6].message.data
            //       ? results[6].message.data
            //       : '';
            //   this.dealsList.forEach((element: any) => {
            //     element.Stage_Name = '-';
            //     if (this.stages && Array.isArray(this.stages)) {
            //       this.stages.forEach((ele: any) => {
            //         if (element.Stage_ID == ele.id) {
            //           element.Stage_Name = ele.name;
            //         }
            //       });
            //     }
            //   });
            // }
            if (results[6]) {
              const accountList = results[6];
              if (
                accountList?.message != 'Server Error' &&
                accountList?.error?.name != 'TokenExpiredError'
              ) {
                this.accountList = accountList.message
                  ? accountList.message
                  : '';
                if (this.accountList && Array.isArray(this.accountList)) {
                  this.accountDetails = this.getAccountDetails(
                    this.accountList,
                    this.accountId
                  );
                  console.log('accountDetails=', this.accountDetails);
                  this.setFormControlValue();
                }
                this.loaderService.hide();
              } else if (accountList?.error?.name === 'TokenExpiredError') {
                const errMsg = 'Session Expired !! Please login again.';
                this.invokeErrorModal(errMsg, true);
              }
            }
          }
        },
        (error) => {
          this.loaderService.hide();
          const errMsg = 'Unable To fetch data. Please try again.';
          this.invokeErrorModal(errMsg, false);
        }
      );
  }

  private invokeErrorModal(errMsg: string, logOutRequired: boolean): void {
    Swal.fire({
      text: errMsg,
      icon: 'error',
      confirmButtonColor: '#A239CA',
      confirmButtonText: 'OK',
    }).then((res) => {
      if (logOutRequired) {
        this.authService.logout();
      }
    });
  }
  private getAccountDetails(accountList: any, accountId: string): any {
    const accountDetails = accountList.find(
      (item: any) => parseInt(item.Account_ID) === parseInt(accountId)
    );
    return accountDetails;
  }
  private setFormControlValue(): void {
    const controls = this.accountDetailsForm.controls;
    if (this.accountDetails) {
      Object.keys(controls).forEach((control: string) => {
        const value = this.accountDetails[control]
          ? this.accountDetails[control]
          : '';
        controls[control].patchValue(value);
      });
    }
  }
  public editSaveField(fieldName: string) {
    if (this.targetField && this.targetField !== fieldName) {
      let prevTargetControl = this.elementRef.nativeElement.querySelector(
        '[formcontrolname="' + this.targetField + '"]'
      );
      if (!prevTargetControl.readOnly) {
        prevTargetControl.readOnly = true;
        prevTargetControl.parentNode.nextSibling.classList.remove('checkIcon');
      }
    }
    let targetControl = this.elementRef.nativeElement.querySelector(
      '[formcontrolname="' + fieldName + '"]'
    );
    this.targetField = fieldName;
    targetControl.readOnly = !targetControl.readOnly;
    if (!targetControl.readOnly) {
      targetControl.parentNode.nextSibling.classList.add('checkIcon');
      targetControl.focus();
    } else {
      targetControl.parentNode.nextSibling.classList.remove('checkIcon');
    }
  }
}
