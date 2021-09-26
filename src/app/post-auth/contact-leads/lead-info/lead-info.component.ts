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

import { LeadInfoLabels } from 'src/app/shared/constants/lead.constant';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent implements OnInit {
  isSubmitClicked = false;
  public leadInfoForm: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = LeadInfoLabels;
  leadSources = [{name: 'ipsi'}, {name: 'sumitava'}];
  leadGenerators = [{name: 'ipsi_lg'}, {name: 'sumitava_lg'}];
  salesReps = [{name: 'ipsi_sr'}, {name: 'sumitava_sr'}];
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
    // this.leadInfoForm = this.formBuilder.group({
    //   source: ['', Validators.required],
    //   leadGenerator: ['', Validators.required]
    // });
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
    if (
      this.leadInfoForm.valid
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
          const leadInfoData = {
          };
          console.log(leadInfoData);
        }
      });
    }
  }

}
