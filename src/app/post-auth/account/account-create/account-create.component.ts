import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import {
  AccountInformationLabels,
  AddressInformationLabels,
  DescriptionInformationLabels,
} from 'src/app/shared/constants/account.constant';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';

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
    private authService: AuthService
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
    this.accountForm = this.fb.group({});
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
}
