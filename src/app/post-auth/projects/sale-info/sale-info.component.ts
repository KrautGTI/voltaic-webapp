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

import { SaleInfoLabels } from 'src/app/shared/constants/project.constant';
import { DataService } from 'src/app/service/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sale-info',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.scss']
})
export class SaleInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  projectDetails:any;
  public saleInfoForm: FormGroup = new FormGroup({});
  isSubmitClicked = false;
  public label: { [key: string]: FormField } = SaleInfoLabels;
  projectId = '';
  action = '';
  sub: any;
  progressStatus:any;
  stateData:any;
  paymentMethods:any = [];
  salesTypes:any = [];
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
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.salesTypes = this.masterData.salesType;
      this.paymentMethods = this.masterData.paymentMethod;
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
      this.progressStatus.saleInfo = status;
      this.dataService.changeStatusProject(this.progressStatus);
  }

  private setFormControlValue(): void {
    // this.projectDetails = this.genericService.getLeadData();
    // console.log(this.projectDetails);
    // const controls = this.saleInfoForm.controls;
    // if (this.projectDetails) {
    //   Object.keys(controls).forEach((control: string) => {
    //     const value = this.projectDetails[control]
    //       ? this.projectDetails[control]
    //       : '';
    //     controls[control].patchValue(value);
    //   });
    //   if(this.saleInfoForm.controls.company.value == '') {
    //     this.matchCompany = false;
    //   }
    // }
  }

  private createForm(): void {
    this.saleInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.saleInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
   
    console.log(this.saleInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.saleInfoForm.get(name);
  }

  public submitSaleInfo() {
    this.isSubmitClicked = true;
    console.log(this.saleInfoForm);
    if (this.saleInfoForm.valid) {
        const saveData = { ...this.saleInfoForm.value, id: this.projectId };
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
            //   this.genericService.addSaleInfo(saveData).subscribe((dataValue: any) => {
            //       this.navigateToOtherInfo();
            //     }, (error: any) => {
            //       const errMsg = 'Unable To Save The Data';
            //       this.notificationService.error(errMsg);
            //     });
            // } else if(this.action == 'edit') {
            //   this.genericService.editSaleInfo(saveData).subscribe((dataValue: any) => {
            //     this.navigateToOtherInfo();
            //   }, (error: any) => {
            //     const errMsg = 'Unable To Save The Data';
            //     this.notificationService.error(errMsg);
            //   });
            // }
            this.navigateToOtherInfo();  
          }
        });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editSaleInfo() {
    this.action = 'edit';
    this.changeProgressBar('active');
    this.router.navigate(['post-auth/projects/project-details/sale-info'], {
      queryParams: { projectId: this.projectId, action: this.action }
    }); 
  }

  navigateToOtherInfo() {
    if(this.action == 'create' || this.action == 'edit') {
      this.changeProgressBar('completed');
    }
    if(this.action == 'create') {
      this.router.navigate(['post-auth/projects/project-details/other-info'], {
        queryParams: { action: this.action }
      });
    } else if(this.action == 'edit'){
      this.router.navigate(['post-auth/projects/project-details/other-info'], {
        queryParams: { projectId: this.projectId, action: this.action }
      });
    }
  }

}
