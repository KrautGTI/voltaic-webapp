import { Component, OnInit, Input } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn } from '@angular/forms';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

import { ContactInfoLabels } from 'src/app/shared/constants/lead.constant';
import { AddressLabels } from 'src/app/shared/constants/address.constant';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  isSubmitClicked = false;

  public label: { [key: string]: FormField } = ContactInfoLabels;
  public addrLabel: { [key: string]: FormField } = AddressLabels;

  public contactInfoForm: FormGroup = new FormGroup({});

  leadId = '';
  action = '';
  sub: any;
  progressStatus:any;
  leadDetails:any;
  states:any;

  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.leadId = params.leadId;
      this.action = params.action;
      // if(this.action == 'create' || this.action == 'edit') {
      //   this.changeProgressBar('active');
      // }
    });
    this.genericService.getStates().subscribe((data: any) => {
      this.states = data.message;
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
      this.progressStatus.contactInfo = status;
      this.dataService.changeStatus(this.progressStatus);
  }

  private setFormControlValue(): void {
    this.leadDetails = this.genericService.getLeadData();
    console.log(this.leadDetails);
    const controls = this.contactInfoForm.controls;
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
    this.contactInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.contactInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
    Object.keys(this.addrLabel).forEach((key: string) => {
      const fieldName = this.addrLabel[key].fieldName;
      this.contactInfoForm.addControl(
        fieldName,
        this.createControl(this.addrLabel[key])
      );
    });
    console.log(this.contactInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.contactInfoForm.get(name);
  }

  submitContactInfo() {
    this.isSubmitClicked = true;
    console.log(this.contactInfoForm);
    this.navigateToUtilityInfo();
    if (this.contactInfoForm.valid) {
      const saveData = { ...this.contactInfoForm.value };
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
            this.genericService.addContactInfo(saveData).pipe(takeUntil(this.unsubscribe$)).subscribe((dataValue: any) => {
              this.genericService.setLeadId(dataValue.id);
              this.navigateToUtilityInfo();
              }, (error: any) => {
                const errMsg = 'Unable To Save The Data';
                this.notificationService.error(errMsg);
              });
          } else if(this.action == 'edit') {
            this.genericService.editContactInfo(saveData).pipe(takeUntil(this.unsubscribe$)).subscribe((dataValue: any) => {
              this.navigateToUtilityInfo();
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
  editContactInfo() {
    this.action = 'edit'; 
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
      queryParams: { leadId: this.leadId, action: this.action }
    });
  }
  navigateToUtilityInfo() {
    if(this.action == 'create' || this.action == 'edit') {
      this.changeProgressBar('completed');
    }
    this.genericService.setSelectedState(this.contactInfoForm.controls.state.value);
    if(this.action == 'create') {
      this.router.navigate(['post-auth/leads/lead-details/utility-info'], {
        queryParams: { action: this.action }
      });
    } else if(this.action == 'edit'){
      this.router.navigate(['post-auth/leads/lead-details/utility-info'], {
        queryParams: { leadId: this.leadId, action: this.action }
      });
    }
  }
}
