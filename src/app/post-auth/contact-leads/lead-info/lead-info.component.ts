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

import { LeadInfoLabels } from 'src/app/shared/constants/lead.constant';
import { DataService } from 'src/app/service/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  leadDetails:any;
  isSubmitClicked = false;
  public leadInfoForm: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = LeadInfoLabels;
  leadSources = [];
  leadGenerators = [];
  salesReps = [];
  primaryLangs = [];
  homeTypes = [];
  hoa = [];
  leadId = '';
  action = '';
  sub: any;
  masterData: any;
  progressStatus:any;
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
        this.leadId = this.genericService.getLeadId();
      } else if(this.action == 'edit'){
        this.leadId = params.leadId;
      }
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
    });
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.primaryLangs = this.masterData.primaryLang;
      this.homeTypes = this.masterData.homeType;
      this.hoa = this.masterData.hoa;
    });
    this.genericService.getLeadOwners().subscribe((data: any) => {
      this.leadGenerators = data.message;
    });
    this.genericService.getSources().subscribe((data: any) => {
      this.leadSources = data.message;
      this.salesReps = data.message;
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
      this.progressStatus.leadInfo = status;
      this.dataService.changeStatus(this.progressStatus);
  }

  private setFormControlValue(): void {
    this.leadDetails = this.genericService.getLeadData();
    console.log(this.leadDetails);
    const controls = this.leadInfoForm.controls;
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
    this.leadInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.leadInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
   
    console.log(this.leadInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.leadInfoForm.get(name);
  }

  submitLeadInfo() {
    this.isSubmitClicked = true;
    console.log(this.leadInfoForm);
    if (this.leadInfoForm.valid) {
      const saveData = { ...this.leadInfoForm.value, id: this.leadId };
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
            this.genericService.addLeadInfo(saveData).subscribe((dataValue: any) => {
                this.navigateToScheduleAppointment();
              }, (error: any) => {
                const errMsg = 'Unable To Save The Data';
                this.notificationService.error(errMsg);
              });
          } else if(this.action == 'edit') {
            this.genericService.editLeadInfo(saveData).subscribe((dataValue: any) => {
              this.navigateToScheduleAppointment();
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
    // this.unsubscribe$.next(true);
    // this.unsubscribe$.complete();
  }

  editLeadInfo() {
    this.action = 'edit';
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/leads/lead-details/lead-info'], {
      queryParams: { leadId: this.leadId, action: this.action }
    });
  }

  navigateToScheduleAppointment(){
    if(this.action == 'create' || this.action == 'edit') {
      this.changeProgressBar('completed');
    }
    if(this.action == 'create') {
      this.router.navigate(['post-auth/leads/lead-details/schedule-appointment'], {
        queryParams: { action: this.action }
      });
    } else if(this.action == 'edit') {
      this.router.navigate(['post-auth/leads']);
    }
  }

}
