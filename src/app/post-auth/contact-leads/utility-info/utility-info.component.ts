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

import { UtilityInfoLabels } from 'src/app/shared/constants/lead.constant';

@Component({
  selector: 'app-utility-info',
  templateUrl: './utility-info.component.html',
  styleUrls: ['./utility-info.component.scss']
})
export class UtilityInfoComponent implements OnInit {

  public utilityInfoForm: FormGroup = new FormGroup({});
  isSubmitClicked = false;
  public label: { [key: string]: FormField } = UtilityInfoLabels;
  utilityCompany = [];
  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
    // this.utilityInfoForm = this.formBuilder.group({
    //   utilityCompany: [''],
    //   utilityBill: [''],
    //   annualBill: [''],
    //   annualUsage: ['']
    // });
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

  submitUtilityInfo() {
    this.isSubmitClicked = true;
    console.log(this.utilityInfoForm);
    if (
      this.utilityInfoForm.valid
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
          const utilityInfoData = {
          };
          console.log(utilityInfoData);
        }
      });
    }
  }

}
