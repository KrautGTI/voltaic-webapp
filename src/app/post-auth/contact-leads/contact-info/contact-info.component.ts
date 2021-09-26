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
    // this.contactInfoForm = this.formBuilder.group({
    //   firstOwnerFirstName: ['', Validators.required],
    //   firstOwnerLastName: ['', Validators.required],
    //   firstOwnerPhone: ['', Validators.required],
    //   firstOwnerEmail: [''],
    //   secondaryOwnerFirstName: [''],
    //   secondaryOwnerLastName: [''],
    //   secondaryOwnerPhone: [''],
    //   secondaryOwnerEmail: [''],
    //   notes: ['']
    // });
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
        }
      });
    }
  }

}
