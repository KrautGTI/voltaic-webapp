import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { GenericService } from 'src/app/service/generic.service';
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
  private userDetails: UserDetailsModel | null = null;
  private isAdmin: boolean = false;
  private unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService
  ) {
    this.userDetails = this.authService.getUserDetails();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit(): void {
    this.createForm();
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
    });
    Object.keys(this.addrLabel).forEach((key: string) => {
      const fieldName = this.addrLabel[key].fieldName;
      this.accountForm.addControl(
        fieldName,
        this.createControl(this.addrLabel[key])
      );
    });
    Object.keys(this.descLabel).forEach((key: string) => {
      const fieldName = this.descLabel[key].fieldName;
      this.accountForm.addControl(
        fieldName,
        this.createControl(this.descLabel[key])
      );
    });
    console.log(this.accountForm);
  }
  private createControl(field: FormField): any {
    const fieldName = field.fieldName;
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.fb.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.accountForm.get(name);
  }

  public saveAccount(): void {
    if (this.accountForm.valid) {
      this.genericService
        .addModifyAccounts(this.accountForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res: any) => {
            if (
              res?.message != 'Server Error' &&
              res?.error?.name != 'TokenExpiredError'
            ) {
            } else if (res?.error?.name === 'TokenExpiredError') {
              const errMsg = 'Session Expired !! Please login again.';
              this.invokeErrorModal(errMsg, true);
            }
          },
          (err: any) => {
            const errMsg = 'Unable To fetch data. Please try again.';
            this.invokeErrorModal(errMsg, false);
          }
        );
    }
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
}
