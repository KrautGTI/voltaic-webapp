import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';

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
  private isAdmin: boolean = false;
  public dealForm: FormGroup = new FormGroup({});
  private unsubscribe$: Subject<boolean> = new Subject();
  leadSources: any = [];
  energyConsultant: any = [];
  stages: any = [];
  marketers: any = [];
  mentors: any = [];
  secondMarketers: any = [];
  leadOwners: any = [];
  contacts: any = [];
  accounts: any = [];
  public masterData: any = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService
  ) {
    //this.userDetails = this.authService.getUserDetails();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit(): void {
    this.createForm();
    this.fetchRequiredData();
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

  private fetchRequiredData(): void {
    const reqs: Observable<any>[] = [];
    const getLeadSources$ = this.genericService.getSources();
    const getMentors$ = this.genericService.getMentors();
    const getMarketers$ = this.genericService.getMarketers();
    const getSecondMarketers$ = this.genericService.getSecondMarketers();
    const getLeadOwners$ = this.genericService.getLeadOwners();
    const getEnergyConsultant$ = this.genericService.getEnergyConsultant();
    const getStages$ = this.genericService.getStages();
    const getAccounts$ = this.genericService.getAccounts();
    const getContacts$ = this.genericService.getContacts();
    const getMasterData$ = this.genericService.getMasterData();
    reqs.push(getLeadSources$);
    reqs.push(getMentors$);
    reqs.push(getMarketers$);
    reqs.push(getSecondMarketers$);
    reqs.push(getLeadOwners$);
    reqs.push(getEnergyConsultant$);
    reqs.push(getStages$);
    reqs.push(getAccounts$);
    reqs.push(getContacts$);
    reqs.push(getMasterData$);
    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              const leadSourceList = results[0];
              if (
                leadSourceList?.message != 'Server Error' &&
                leadSourceList?.error?.name != 'TokenExpiredError'
              ) {
                this.leadSources = leadSourceList.message
                  ? leadSourceList.message
                  : '';
              } else if (leadSourceList?.error?.name === 'TokenExpiredError') {
                const errMsg = 'Session Expired !! Please login again.';
                this.notificationService.error(errMsg, true);
              }
            }
            if (results[1]) {
              this.mentors = results[1].message ? results[1].message : '';
            }
            if (results[2]) {
              this.marketers = results[2].message ? results[2].message : '';
            }
            if (results[3]) {
              this.secondMarketers = results[3].message ? results[3].message : '';
            }
            if (results[4]) {
              this.leadOwners = results[4].message ? results[4].message : '';
            }
            if (results[5]) {
              this.energyConsultant = results[5].message ? results[5].message : '';
            }
            if (results[6]) {
              this.stages = results[6].message ? results[6].message : '';
            }
            if (results[7]) {
              this.accounts = results[7].message ? results[7].message : '';
            }
            if (results[8]) {
              this.contacts = results[8].message ? results[8].message : '';
            }
            if (results[9]) {
              const masterData = results[8];
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
