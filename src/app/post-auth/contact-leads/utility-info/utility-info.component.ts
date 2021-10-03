import { Component, OnInit, Input } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

import { UtilityInfoLabels } from 'src/app/shared/constants/lead.constant';
import { DataService } from 'src/app/service/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-utility-info',
  templateUrl: './utility-info.component.html',
  styleUrls: ['./utility-info.component.scss']
})
export class UtilityInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  leadDetails:any;
  public utilityInfoForm: FormGroup = new FormGroup({});
  isSubmitClicked = false;
  public label: { [key: string]: FormField } = UtilityInfoLabels;
  leadId = '';
  action = '';
  sub: any;
  progressStatus:any;
  stateData:any;
  utilityCompany:any = [];
  utilityBill_1: any = "";
  utilityBill_2: any = "";
  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'create') {
        this.leadId = '';
      } else if(this.action == 'edit'){
        this.leadId = params.leadId;
      }
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
    });
    let stateId = this.genericService.getSelectedState();
    this.stateData = {stateId:stateId};
    this.genericService.getUtiliesByStates(this.stateData).subscribe((data: any) => {
      this.utilityCompany = data.message;
    });
    
    this.createForm();
    if(this.action == 'view' || this.action == 'edit')
      this.setFormControlValue();
  }

  changeProgressBar(status: string) {
    let progressdata = localStorage.getItem('userSessionProgressData');
      if (progressdata) {
        this.progressStatus = JSON.parse(progressdata);
      } else {
        this.dataService.currentPogressData.subscribe(progressStatus => this.progressStatus = progressStatus);
      }
      this.progressStatus.utilityInfo = status;
      this.dataService.changeStatus(this.progressStatus);
  }

  private setFormControlValue(): void {
    this.leadDetails = this.genericService.getLeadData();
    console.log(this.leadDetails);
    const controls = this.utilityInfoForm.controls;
    if (this.leadDetails) {
      Object.keys(controls).forEach((control: string) => {
        const value = this.leadDetails[control]
          ? this.leadDetails[control]
          : '';
        controls[control].patchValue(value);
      });
    }
  }

  private createForm(): void {
    this.utilityInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.utilityInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
   
    console.log(this.utilityInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.utilityInfoForm.get(name);
  }

  public getImage(event: any, fieldName: any) {
    if(fieldName == 'utility_bill_1')
      this.utilityBill_1 = event;
    if(fieldName == 'utility_bill_2')
      this.utilityBill_2 = event;
  }

  public submitUtilityInfo() {
    this.isSubmitClicked = true;
    console.log(this.utilityInfoForm);
    if (this.utilityInfoForm.valid) {
        let saveData = { ...this.utilityInfoForm.value, id: this.leadId };
        saveData['utility_bill_1'] = this.utilityBill_1;
        saveData['utility_bill_2'] = this.utilityBill_2;
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
            if(this.action == 'create') {
              this.genericService.addUtilityInfo(saveData).pipe(takeUntil(this.unsubscribe$)).subscribe((dataValue: any) => {
                  this.navigateToLeadInfo();
                }, (error: any) => {
                  const errMsg = 'Unable To Save The Data';
                  this.notificationService.error(errMsg);
                });
            } else if(this.action == 'edit') {
              this.genericService.editUtilityInfo(saveData).pipe(takeUntil(this.unsubscribe$)).subscribe((dataValue: any) => {
                this.navigateToLeadInfo();
              }, (error: any) => {
                const errMsg = 'Unable To Save The Data';
                this.notificationService.error(errMsg);
              });
            }  
          }
        });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  editUtilityInfo() {
    this.action = 'edit';
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/leads/lead-details/utility-info'], {
      queryParams: { leadId: this.leadId, action: this.action }
    }); 
  }

  navigateToLeadInfo() {
    if(this.action == 'create' || this.action == 'edit') {
      this.changeProgressBar('completed');
    }
    if(this.action == 'create') {
      this.router.navigate(['post-auth/leads/lead-details/lead-info'], {
        queryParams: { action: this.action }
      });
    } else if(this.action == 'edit'){
      this.router.navigate(['post-auth/leads/lead-details/lead-info'], {
        queryParams: { leadId: this.leadId, action: this.action }
      });
    }
  }

}
