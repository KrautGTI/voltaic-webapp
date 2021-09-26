import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn } from '@angular/forms';
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
  isSubmitClicked = false;

  public label: { [key: string]: FormField } = ContactInfoLabels;
  public addrLabel: { [key: string]: FormField } = AddressLabels;

  public contactInfoForm: FormGroup = new FormGroup({});

  leadId = '';
  action = '';
  sub: any;
  progressStatus:any;

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
      if(this.action == 'create' || this.action == 'edit') {
        this.changeProgressBar('active');
      }
    });
    this.createForm();
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
    if (
      this.contactInfoForm.valid
    ) {
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
          const contactInfoData = {
          };
          console.log(contactInfoData);
          if(this.action == 'create' || this.action == 'edit') {
            this.changeProgressBar('completed');
          }
          this.navigateToUtilityInfo();
        }
      });
    }
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  editContactInfo() {
    this.action = 'edit';
    // this.location.replaceState('post-auth/leads/lead-details/contact-info?leadId=' + 
    // this.leadId + '&action=' + this.action);   
    this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
      queryParams: { leadId: this.leadId, action: this.action }
    });
  }
  navigateToUtilityInfo() {
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
