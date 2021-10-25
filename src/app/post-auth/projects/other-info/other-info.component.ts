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

import { OtherInfoLabels } from 'src/app/shared/constants/project.constant';
import { DataService } from 'src/app/service/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  projectDetails:any;
  public otherInfoForm: FormGroup = new FormGroup({});
  isSubmitClicked = false;
  public label: { [key: string]: FormField } = OtherInfoLabels;
  projectId = '';
  action = '';
  sub: any;
  progressStatus:any;
  stateData:any;
  hoa:any = [];
  utilityCompany:any = [];
  matchCompany = true;
  masterData:any;
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
        this.projectId = this.genericService.getProjectId();
      } else if(this.action == 'edit'){
        this.projectId = params.projectId;
      }
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
    });
    let stateId = this.genericService.getSelectedStateProject();
    if(stateId) {
      this.stateData = {stateId:stateId};
      console.log(this.stateData);
      this.genericService.getUtiliesByStates(this.stateData).subscribe((data: any) => {
        if(data.message != 'No Record Found.')
          this.utilityCompany = data.message;
      });
    }
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.hoa = this.masterData.hoa;
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
      this.progressStatus.otherInfo = status;
      this.dataService.changeStatusProject(this.progressStatus);
  }

  private setFormControlValue(): void {
    // this.projectDetails = this.genericService.getProjectData();
    // console.log(this.projectDetails);
    // const controls = this.otherInfoForm.controls;
    // if (this.projectDetails) {
    //   Object.keys(controls).forEach((control: string) => {
    //     const value = this.projectDetails[control]
    //       ? this.projectDetails[control]
    //       : '';
    //     controls[control].patchValue(value);
    //   });
    //   if(this.otherInfoForm.controls.company.value == '') {
    //     this.matchCompany = false;
    //   }
    // }
  }

  private createForm(): void {
    this.otherInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.otherInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
   
    console.log(this.otherInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.otherInfoForm.get(name);
  }

  public submitOtherInfo() {
    this.isSubmitClicked = true;
    console.log(this.otherInfoForm);
    if (this.otherInfoForm.valid) {
        const saveData = { ...this.otherInfoForm.value, id: this.projectId };
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
            //   this.genericService.addOtherInfo(saveData).subscribe((dataValue: any) => {
            //       this.navigateToProjectList();
            //     }, (error: any) => {
            //       const errMsg = 'Unable To Save The Data';
            //       this.notificationService.error(errMsg);
            //     });
            // } else if(this.action == 'edit') {
            //   this.genericService.editOtherInfo(saveData).subscribe((dataValue: any) => {
            //     this.navigateToProjectList();
            //   }, (error: any) => {
            //     const errMsg = 'Unable To Save The Data';
            //     this.notificationService.error(errMsg);
            //   });
            // }
            this.navigateToProjectList();  
          }
        });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editOtherInfo() {
    this.action = 'edit';
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/projects/project-details/other-info'], {
      queryParams: { projectId: this.projectId, action: this.action }
    }); 
  }
  navigateToProjectList() {
    if(this.action == 'create') {
      this.changeProgressBar('completed');
    }
    this.router.navigate(['post-auth/projects']);
  }
}
