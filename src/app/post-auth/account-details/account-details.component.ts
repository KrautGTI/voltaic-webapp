import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UserDetailsModel } from 'src/app/shared/models/util.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { GenericService } from '../../service/generic.service';
import { AuthService } from '../../service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';
import { liveSearch } from 'src/app/common/live-search.operator';
import { FormField } from 'src/app/shared/models/util.model';
import {
  AccountInformationLabels,
  AddressInformationLabels,
  DescriptionInformationLabels,
} from 'src/app/shared/constants/account.constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  public accountId: string = '';
  public contactId: string = '';
  public accountDetails: any = null;
  public contactDetails: any = null;
  public accountDetailsForm: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = { ...AccountInformationLabels };
  public addrLabel: { [key: string]: FormField } = {
    ...AddressInformationLabels,
  };
  public descLabel: { [key: string]: FormField } = {
    ...DescriptionInformationLabels,
  };
  private leadSources: any = '';
  private marketers: any = '';
  public leadOwners: any = '';
  private secondMarketers: any = '';
  private energyConsultant: any = '';
  private stages: any = '';
  public dealsList: any = '';
  private accountList: any = [];
  public masterData: any = '';
  private targetField: string = '';
  private searchTerm$ = new Subject<string>();
  private unsubscribe$: Subject<boolean> = new Subject();
  userDetails: UserDetailsModel | null = null;

  readonly searchValues$ = this.searchTerm$.pipe(
    // liveSearch((term) => this.genericService.getAccounts())
    liveSearch((term) => of(this.accountList))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private genericService: GenericService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
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
      Tag: [''],
      login_id: [''],
      Notes: [''],
      Created_By: [''],
      Created_Time: [''],
      Modified_By: [''],
      Modified_Time: [''],
    });
    Object.keys(this.label).forEach((key: string) => {
      this.label[key].isEditable = false;
      this.label[key].placeholder = '-';
      const fieldName = this.label[key].fieldName;
      this.accountDetailsForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
    Object.keys(this.addrLabel).forEach((key: string) => {
      this.addrLabel[key].isEditable = false;
      this.addrLabel[key].placeholder = '-';
      const fieldName = this.addrLabel[key].fieldName;
      this.accountDetailsForm.addControl(
        fieldName,
        this.createControl(this.addrLabel[key])
      );
    });
    Object.keys(this.descLabel).forEach((key: string) => {
      this.descLabel[key].isEditable = false;
      this.descLabel[key].placeholder = '-';
      const fieldName = this.descLabel[key].fieldName;
      this.accountDetailsForm.addControl(
        fieldName,
        this.createControl(this.descLabel[key])
      );
    });
    console.log(this.accountDetailsForm);
  }
  private createControl(field: FormField): any {
    const fieldName = field.fieldName;
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.fb.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.accountDetailsForm.get(name);
  }
  private fetchRequiredDetails(): void {
    const reqs: Observable<any>[] = [];
    const getAccounts$ = this.genericService.getAccounts();
    const getLeadOwners$ = this.genericService.getLeadOwners();
    const getMasterData$ = this.genericService.getMasterData();
    const getStages$ = this.genericService.getStages();
    const getDealsFromAccount$ = this.genericService.getDealsFromAccount(
      this.accountId
    );

    const getSource$ = this.genericService.getSources();
    const getMarketers$ = this.genericService.getMarketers();
    const getSecondMarketers$ = this.genericService.getSecondMarketers();
    const getEnergyConsultant$ = this.genericService.getEnergyConsultant();

    reqs.push(getAccounts$);
    reqs.push(getLeadOwners$);
    reqs.push(getMasterData$);
    reqs.push(getStages$);
    reqs.push(getDealsFromAccount$);

    reqs.push(getSource$);
    reqs.push(getMarketers$);
    reqs.push(getSecondMarketers$);
    reqs.push(getEnergyConsultant$);

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
                if (this.accountList && Array.isArray(this.accountList)) {
                  this.accountDetails = this.getAccountDetails(
                    this.accountList,
                    this.accountId
                  );
                  this.contactId = this.accountDetails.Contact_ID
                    ? this.accountDetails.Contact_ID
                    : '0';
                  this.getContactByAccountId(this.contactId);
                  console.log('accountDetails=', this.accountDetails);
                  this.setFormControlValue();
                }
              } else if (accountList?.error?.name === 'TokenExpiredError') {
                const errMsg = 'Session Expired !! Please login again.';
                this.notificationService.error(errMsg, true);
              }
            }
            if (results[1]) {
              this.leadOwners = results[1].message ? results[1].message : '';
            }
            if (results[2]) {
              const masterData = results[2];
              this.masterData = masterData;
            }
            if (results[3]) {
              this.stages = results[3].message ? results[3].message : '';
            }
            if (results[4]) {
              const dealsList = results[4];
              if (dealsList?.message !== 'No Record Updated..') {
                this.dealsList =
                  dealsList && dealsList.message && dealsList.message.data
                    ? dealsList.message.data
                    : [];
                if (Array.isArray(this.dealsList)) {
                  this.dealsList.forEach((element: any) => {
                    element.Stage_Name = '-';
                    if (this.stages && Array.isArray(this.stages)) {
                      this.stages.forEach((ele: any) => {
                        if (element.Stage_ID == ele.id) {
                          element.Stage_Name = ele.name;
                        }
                      });
                    }
                  });
                }
              }
            }
            if (results[5]) {
              this.leadSources = results[5].message ? results[5].message : '';
            }
            if (results[6]) {
              this.marketers = results[6].message ? results[6].message : '';
            }
            if (results[7]) {
              this.secondMarketers = results[7].message
                ? results[7].message
                : '';
            }
            if (results[8]) {
              this.energyConsultant = results[8].message
                ? results[8].message
                : '';
            }
          }
        },
        (error) => {
          const errMsg = 'Unable To fetch data. Please try again.';
          this.notificationService.error(errMsg, false);
        }
      );
  }
  private getContactByAccountId(contactId: string): void {
    this.genericService
      .getContacts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (userList: any) => {
          if (
            userList?.message != 'Server Error' &&
            userList?.error?.name != 'TokenExpiredError'
          ) {
            let contactList = userList.message;
            this.contactDetails = this.getContactDetails(
              contactList,
              contactId
            );
          } else if (userList?.error?.name == 'TokenExpiredError') {
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
  private getContactDetails(contactList: any, contactId: string): any {
    const contactDetails = contactList.find(
      (item: any) => parseInt(item.Contact_ID) === parseInt(contactId)
    );
    return contactDetails;
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
  public onChangeParentAccount(term: string): void {
    this.searchTerm$.next(term);
    console.log('term=', term);
  }

  public saveAccount(): void {
      console.log(this.accountDetailsForm.value);
      this.accountDetailsForm.patchValue({
        login_id: this.userDetails ? this.userDetails.user_loginId : '',
      });
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
        this.genericService
          .addModifyAccounts(this.accountDetailsForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (dataValue: any) => {
              console.log(dataValue);
              const successMsg = 'Account Details Updated Succesfully';
              this.notificationService.success(
                successMsg,
                '/post-auth/accounts'
              );
            },
            (error: any) => {
              const errMsg = 'Unable To Save Account Details';
              this.notificationService.error(errMsg);
            }
          );
      });
  }
}
