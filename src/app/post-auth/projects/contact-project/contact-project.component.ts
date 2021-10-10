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
  selector: 'app-contact-project',
  templateUrl: './contact-project.component.html',
  styleUrls: ['./contact-project.component.scss']
})
export class ContactProjectComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  isSubmitClicked = false;

  public label: { [key: string]: FormField } = ContactInfoLabels;
  public addrLabel: { [key: string]: FormField } = AddressLabels;

  public contactInfoForm: FormGroup = new FormGroup({});

  projectId = '';
  action = '';
  sub: any;
  progressStatus:any;
  projectDetails:any;
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
      this.projectId = params.projectId;
      this.action = params.action;
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
        this.dataService.currentPogressDataProject.subscribe(progressStatus => this.progressStatus = progressStatus);
      }
      this.progressStatus.contactInfo = status;
      this.dataService.changeStatusProject(this.progressStatus);
  }

  private setFormControlValue(): void {
    // this.projectDetails = this.genericService.getProjectData();
    // console.log(this.projectDetails);
    // const controls = this.contactInfoForm.controls;
    // if (this.projectDetails) {
    //   Object.keys(controls).forEach((control: string) => {
    //     const value = this.projectDetails[control]
    //       ? this.projectDetails[control]
    //       : '';
    //     controls[control].patchValue(value);
    //   });
    // }
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
    if (this.contactInfoForm.valid) {
      let saveData:any = {};
      if(this.action == 'create')
        saveData = { ...this.contactInfoForm.value };
      else
        saveData = { ...this.contactInfoForm.value, id: this.projectId };
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
          // if(this.action == 'create') {
          //   this.genericService.addProjectContactInfo(saveData).subscribe((dataValue: any) => {
          //     if(dataValue.id && dataValue.id != '') {
          //       this.genericService.setProjectId(dataValue.id);
          //       this.navigateToSaleInfo();
          //     } else {
          //       const errMsg = 'Unable To Save The Data';
          //       this.notificationService.error(errMsg);
          //     }
          //   }, (error: any) => {
          //       const errMsg = 'Unable To Save The Data';
          //       this.notificationService.error(errMsg);
          //     });
          // } else if(this.action == 'edit') {
          //   this.genericService.editContactInfo(saveData).subscribe((dataValue: any) => {
          //     this.navigateToSaleInfo();
          //   }, (error: any) => {
          //     const errMsg = 'Unable To Save The Data';
          //     this.notificationService.error(errMsg);
          //   });
          // }  

          this.navigateToSaleInfo();
        }
      });
    }
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  editContactInfo() {
    this.action = 'edit'; 
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/projects/project-details/contact-info'], {
      queryParams: { projectId: this.projectId, action: this.action }
    });
  }
  navigateToSaleInfo() {
    if(this.action == 'create' || this.action == 'edit') {
      this.changeProgressBar('completed');
    }
    this.genericService.setSelectedStateProject(this.contactInfoForm.controls.state_id.value);
    if(this.action == 'create') {
      this.router.navigate(['post-auth/projects/project-details/sale-info'], {
        queryParams: { action: this.action }
      });
    } else if(this.action == 'edit'){
      this.router.navigate(['post-auth/projects/project-details/sale-info'], {
        queryParams: { projectId: this.projectId, action: this.action }
      });
    }
  }

}
