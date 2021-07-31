import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

import { NotificationService } from 'src/app/service/notification.service';
import {
  DealInformationLabels,
  DescriptionInformationLabels,
} from 'src/app/shared/constants/deal.constant';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss'],
})
export class CreateDealComponent implements OnInit {
  contactId: string = '';
  public label: { [key: string]: FormField } = DealInformationLabels;
  public descLabel: { [key: string]: FormField } = DescriptionInformationLabels;
  private userDetails: UserDetailsModel | null = null;
  private isAdmin: boolean = false;
  public dealForm: FormGroup = new FormGroup({});
  private unsubscribe$: Subject<boolean> = new Subject();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService
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
    this.dealForm = this.fb.group({
      Tag: [''],
      login_id: [''],
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.dealForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
    Object.keys(this.descLabel).forEach((key: string) => {
      const fieldName = this.descLabel[key].fieldName;
      this.dealForm.addControl(
        fieldName,
        this.createControl(this.descLabel[key])
      );
    });
    console.log(this.dealForm);
  }

  private createControl(field: FormField): any {
    const fieldName = field.fieldName;
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.fb.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.dealForm.get(name);
  }

  public saveDeal(): void {
    if (this.dealForm.valid) {
      this.genericService
        .addModifyDeals(this.dealForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res: any) => {
            if (
              res?.message != 'Server Error' &&
              res?.error?.name != 'TokenExpiredError'
            ) {
            } else if (res?.error?.name === 'TokenExpiredError') {
              const errMsg = 'Session Expired !! Please login again.';
              this.notificationService.error(errMsg, true);
            }
          },
          (err: any) => {
            const errMsg = 'Unable To fetch data. Please try again.';
            this.notificationService.error(errMsg, false);
          }
        );
    }
  }
}
