import { Component, OnInit, ElementRef } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserDetailsModel } from 'src/app/shared/models/util.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  userDetails: UserDetailsModel | null = null;
  isAdmin: boolean = false;
  contactDetailsForm: any;
  contactId: string = '';
  contactInfoVisible = true;
  targetField: string = '';
  contactDetails: any;
  leadSources: any;
  energyConsultant: any;
  stages: any;
  marketers: any;
  mentors: any;
  secondMarketers: any;
  leadOwners: any;
  dealsList: any;
  isSubmitClicked = false;
  querySubscription: any;
  masterData: any;

  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
    this.isAdmin = this.authService.getIsAdmin();

    this.contactDetailsForm = this.formBuilder.group({
      Email: ['-'],
      Phone: ['-'],
      contactName: ['-'],
      Freedom_ID: ['-'],
      Average_Bill: ['-'],
      Spouse_Name: ['-'],
      Date_Created: [''],
      Home_Sq_Ft: ['-'],
      LeadIdCPY: ['-'],
      Qualified_By: ['-'],
      Mailing_City: ['-'],
      Mailing_State: ['-'],
      Mailing_Street: ['-'],
      Mailing_Zip: ['-'],
      Description: ['-'],
      Date_Scheduled: [''],
      Time_Scheduled: ['-1'],

      ownerName: ['-1'],
      Lead_Source: ['-1'],
      Energy_Consultant: ['-1'],
      Marketer: ['-1'],
      Second_Marketer: ['-1'],
    });

    this.route.queryParams.subscribe((params) => {
      this.contactId = params.contactId;
    });
    this.genericService.getSources().subscribe((data: any) => {
      this.leadSources = data.message;
    });
    // this.genericService.getMentors().subscribe((data: any) => {
    //   console.log(data);
    //  this.mentors = data.message;
    // });
    this.genericService.getMarketers().subscribe((data: any) => {
      this.marketers = data.message;
    });
    this.genericService.getSecondMarketers().subscribe((data: any) => {
      this.secondMarketers = data.message;
    });
    this.genericService.getLeadOwners().subscribe((data: any) => {
      this.leadOwners = data.message;
      if (!this.isAdmin)
        this.contactDetailsForm.patchValue({
          ownerName: this.userDetails ? this.userDetails.user_loginId : '',
        });
    });
    this.genericService.getEnergyConsultant().subscribe((data: any) => {
      this.energyConsultant = data.message;
    });
    this.genericService
      .getDealsFromContact(this.contactId)
      .subscribe((dealsList: any) => {
        this.dealsList = dealsList.message.data;
        // console.log('dealsList');
        //console.log(this.dealsList);
        this.genericService.getStages().subscribe((data: any) => {
          //  console.log(data);
          this.stages = data.message;
          this.dealsList.forEach((element: any, index: number) => {
            this.dealsList[index].Stage_Name = '-';
            this.stages.forEach((ele: any) => {
              if (element.Stage_ID == ele.id) {
                this.dealsList[index].Stage_Name = ele.name;
              }
            });
          });
          console.log(this.dealsList);
        });
      });
    this.fetchContactDetails();
  }

  editSaveField(fieldName: string) {
    if (this.targetField && this.targetField !== fieldName) {
      let prevTargetControl = this.elementRef.nativeElement.querySelector(
        '[formcontrolname="' + this.targetField + '"]'
      );
      if (!prevTargetControl.readOnly) {
        prevTargetControl.readOnly = true;
        prevTargetControl.parentNode.nextSibling.classList.remove('checkIcon');
      }
    }
    let targetControl = this.elementRef.nativeElement.querySelector(
      '[formcontrolname="' + fieldName + '"]'
    );
    this.targetField = fieldName;
    targetControl.readOnly = !targetControl.readOnly;
    if (!targetControl.readOnly) {
      targetControl.parentNode.nextSibling.classList.add('checkIcon');
      targetControl.focus();
    } else {
      targetControl.parentNode.nextSibling.classList.remove('checkIcon');
    }
  }

  toggle(value: string) {
    if (value == 'Contact Information')
      this.contactInfoVisible = !this.contactInfoVisible;
  }

  fetchContactDetails() {
    this.genericService.getContacts().subscribe(
      (userList: any) => {
        if (
          userList?.message != 'Server Error' &&
          userList?.error?.name != 'TokenExpiredError'
        ) {
          let contactList = userList.message;
          this.contactDetails = contactList.find(
            (ele: any) => ele.Contact_ID == this.contactId
          );
          console.log(this.contactDetails);
          this.httpClient
            .get('assets/json/master.json')
            .subscribe((masterData) => {
              this.masterData = masterData;
              // console.log(this.masterData);
              this.contactDetailsForm.patchValue({
                Lead_Source:
                  this.contactDetails?.Lead_Source == null
                    ? '-1'
                    : this.contactDetails?.Lead_Source,
                Energy_Consultant:
                  this.contactDetails?.Energy_Consultant == null
                    ? '-1'
                    : this.contactDetails?.Energy_Consultant,
                Marketer:
                  this.contactDetails?.Marketer == null
                    ? '-1'
                    : this.contactDetails?.Marketer,
                Second_Marketer:
                  this.contactDetails?.Second_Marketer == null
                    ? '-1'
                    : this.contactDetails?.Second_Marketer,
                ownerName:
                  this.contactDetails?.Contact_Owner_ID == null
                    ? '-1'
                    : this.contactDetails?.Contact_Owner_ID,
                Date_Created:
                  this.contactDetails?.Date_Created == null
                    ? ''
                    : this.contactDetails?.Date_Created,
                Date_Scheduled: '',
              });
            });
        } else if (userList?.error?.name == 'TokenExpiredError') {
          const errMsg = 'Session Expired !! Please login again.';
          this.notificationService.error(errMsg, true);
        }
      },
      (error) => {
        const errMsg = 'Unable To fetch data. Please try again.';
        this.notificationService.error(errMsg);
      }
    );
  }

  submitContactDetails() {
    this.isSubmitClicked = true;
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
        const contactDetailsData = {
          Contact_ID: this.contactId,
          role: this.userDetails ? this.userDetails.user_role : '',
          owner_login_id: this.contactDetails.ownerLoginId,
          Lead_Source:
            this.contactDetailsForm.value.Lead_Source == '-1'
              ? ''
              : this.contactDetailsForm.value.Lead_Source,
          First_Name:
            this.contactDetailsForm.value.contactName == '-'
              ? ''
              : this.contactDetailsForm.value.contactName.split(' ')[0],
          Last_Name:
            this.contactDetailsForm.value.contactName == '-'
              ? ''
              : this.contactDetailsForm.value.contactName.split(' ')[1],
          Email:
            this.contactDetailsForm.value.Email == '-'
              ? ''
              : this.contactDetailsForm.value.Email,
          Phone:
            this.contactDetailsForm.value.Phone == '-'
              ? ''
              : this.contactDetailsForm.value.Phone,
          login_id: this.userDetails ? this.userDetails.user_loginId : '',
          Mailing_Street:
            this.contactDetailsForm.value.Mailing_Street == '-'
              ? ''
              : this.contactDetailsForm.value.Mailing_Street,
          Mailing_City:
            this.contactDetailsForm.value.Mailing_City == '-'
              ? ''
              : this.contactDetailsForm.value.Mailing_City,
          Mailing_State:
            this.contactDetailsForm.value.Mailing_State == '-'
              ? ''
              : this.contactDetailsForm.value.Mailing_State,
          Mailing_Zip:
            this.contactDetailsForm.value.Mailing_Zip == '-'
              ? ''
              : this.contactDetailsForm.value.Mailing_Zip,
          Description:
            this.contactDetailsForm.value.Description == '-'
              ? ''
              : this.contactDetailsForm.value.Description,
          Salutation: '',
          Tag: '',
          Average_Bill:
            this.contactDetailsForm.value.Average_Bill == '-'
              ? ''
              : this.contactDetailsForm.value.Average_Bill,
          Date_Created: this.contactDetailsForm.value.Date_Created,
          Energy_Consultant:
            this.contactDetailsForm.value.Energy_Consultant == '-1'
              ? ''
              : this.contactDetailsForm.value.Energy_Consultant,
          Marketer:
            this.contactDetailsForm.value.Marketer == '-1'
              ? ''
              : this.contactDetailsForm.value.Marketer,
          DateTime_Scheduled:
            this.contactDetailsForm.value.Date_Scheduled +
            ' ' +
            this.contactDetailsForm.value.Time_Scheduled,
          Spouse_Name:
            this.contactDetailsForm.value.Spouse_Name == '-'
              ? ''
              : this.contactDetailsForm.value.Spouse_Name,
          Qualified_By:
            this.contactDetailsForm.value.Qualified_By == '-'
              ? ''
              : this.contactDetailsForm.value.Qualified_By,
          Home_Sq_Ft:
            this.contactDetailsForm.value.Home_Sq_Ft == '-'
              ? ''
              : this.contactDetailsForm.value.Home_Sq_Ft,
          Second_Marketer:
            this.contactDetailsForm.value.Second_Marketer == '-1'
              ? ''
              : this.contactDetailsForm.value.Second_Marketer,
          Freedom_ID:
            this.contactDetailsForm.value.Freedom_ID == '-'
              ? ''
              : this.contactDetailsForm.value.Freedom_ID,
          LeadIdCPY:
            this.contactDetailsForm.value.LeadIdCPY == '-'
              ? ''
              : this.contactDetailsForm.value.LeadIdCPY,
        };
        // console.log(contactDetailsData);
        this.querySubscription = this.genericService
          .addModifyContact(contactDetailsData)
          .subscribe(
            (dataValue) => {
              console.log(dataValue);
              const successMsg = 'Contact Details Updated Succesfully';
              Swal.fire({
                text: successMsg,
                icon: 'success',
                confirmButtonColor: '#A239CA',
                confirmButtonText: 'OK',
              }).then((res) => {
                window.location.href = '/post-auth/contacts/';
              });
            },
            (error) => {
              const errMsg = 'Unable To Save Contact Details';
              Swal.fire({
                text: errMsg,
                icon: 'error',
                confirmButtonColor: '#A239CA',
                confirmButtonText: 'OK',
              });
            }
          );
      }
    });
  }
}
