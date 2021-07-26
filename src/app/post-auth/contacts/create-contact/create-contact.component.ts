import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { LoaderService } from "../../../shared/loader/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  contactForm: any;
  contactId: string = '';
  userDetails: any;
  isAdmin: boolean = false;
  leadSources: any;
  energyConsultant: any;
  stages: any;
  marketers:any;
  mentors:any;
  secondMarketers:any;
  leadOwners:any;
  dealsList:any;
  isSubmitClicked = false;
  querySubscription: any;
  masterData:any;

  constructor(private genericService: GenericService, private loaderService: LoaderService,
    private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
      this.userDetails = userData
        ? JSON.parse(userData)
        : null;
      this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
      this.contactForm = this.formBuilder.group({
       Email: ["", Validators.required],
       Phone: ["", Validators.required],
       Salutation: ["-1", Validators.required],
       First_Name:["", Validators.required],
       Last_Name:["", Validators.required],
       Freedom_ID: [""],
       Average_Bill: ["", Validators.required],
       Spouse_Name: [""],
       Date_Created: [""],
       Home_Sq_Ft: [""],
       LeadIdCPY: [""],
       Qualified_By: [""],
       Mailing_City: [""],
       Mailing_State: [""],
       Mailing_Street: [""],
       Mailing_Zip: [""],
       Description: [""],
      // DateTime_Scheduled: [""],
       Date_Scheduled: ["", Validators.required],
       Time_Scheduled: ["-1", Validators.required],

       ownerName: ["-1"],
       Lead_Source: ["-1"],
       Energy_Consultant: ["-1"],
       Marketer: ["-1", Validators.required],
       Second_Marketer: ["-1"],
    });
      this.genericService.getSources().subscribe((data: any) => {
        this.leadSources = data.message;
      });
      this.genericService.getMarketers().subscribe((data: any) => {
       this.marketers = data.message;
      });
      this.genericService.getSecondMarketers().subscribe((data: any) => {
       this.secondMarketers = data.message;
      });
      this.genericService.getLeadOwners().subscribe((data: any) => {
       this.leadOwners = data.message;

       if(!this.isAdmin)
          this.contactForm.patchValue({
            ownerName: this.userDetails.user_loginId
          });
      });
      this.genericService.getEnergyConsultant().subscribe((data: any) => {
        this.energyConsultant = data.message;
      });  
      this.httpClient.get("assets/json/master.json").subscribe(masterData => {
        this.masterData = masterData;
        console.log(this.masterData);
      }); 
  }

  createContact() { 
      this.isSubmitClicked = true;
      this.loaderService.show();
      if(this.contactForm.valid && this.contactForm.value.ownerName != '-1' && 
      this.contactForm.value.Salutation != '-1' && this.contactForm.value.Marketer != '-1' &&
      this.contactForm.value.Time_Scheduled != '-1' && this.contactForm.value.Date_Scheduled != '') {
      Swal.fire({
        text: 'Do You Want To Save Changes?', icon: 'question', confirmButtonColor: '#A239CA', position: 'center',
        confirmButtonText: 'Yes', showConfirmButton: true, showCancelButton: true, cancelButtonText: 'No'
      }).then(res => {
        if (res.isConfirmed) {
          this.loaderService.show();
          const contactDetailsData = {
            //Contact_ID: this.contactId,
            role:this.userDetails.user_role,
            owner_login_id: this.contactForm.value.ownerName,
            Lead_Source: this.contactForm.value.Lead_Source == '-1' ? '' : this.contactForm.value.Lead_Source,
            First_Name:this.contactForm.value.First_Name,
            Last_Name:this.contactForm.value.Last_Name,
            Email:this.contactForm.value.Email,
            Phone:this.contactForm.value.Phone,
            login_id:this.userDetails.user_loginId,
            Mailing_Street:this.contactForm.value.Mailing_Street,
            Mailing_City:this.contactForm.value.Mailing_City,
            Mailing_State:this.contactForm.value.Mailing_State,
            Mailing_Zip:this.contactForm.value.Mailing_Zip,
            Description:this.contactForm.value.Description,
            Salutation:this.contactForm.value.Salutation,
            Tag:"",
            Average_Bill:this.contactForm.value.Average_Bill,
            Date_Created:this.contactForm.value.Date_Created,
            Energy_Consultant:this.contactForm.value.Energy_Consultant == '-1' ? '' : this.contactForm.value.Energy_Consultant,
            Marketer:this.contactForm.value.Marketer == '-1' ? '' : this.contactForm.value.Marketer,
            DateTime_Scheduled:this.contactForm.value.Date_Scheduled + ' ' + this.contactForm.value.Time_Scheduled,
            Spouse_Name:this.contactForm.value.Spouse_Name,
            Qualified_By:this.contactForm.value.Qualified_By,
            Home_Sq_Ft:this.contactForm.value.Home_Sq_Ft,
            Second_Marketer:this.contactForm.value.Second_Marketer == '-1' ? '' : this.contactForm.value.Second_Marketer,
            Freedom_ID:this.contactForm.value.Freedom_ID,
            LeadIdCPY:this.contactForm.value.LeadIdCPY
          }
          console.log(contactDetailsData);
          this.querySubscription = this.genericService
              .addModifyContact(contactDetailsData, this.userDetails.authorize_token)
              .subscribe(
                (dataValue) => {
                  this.loaderService.hide();
                  console.log(dataValue); 
                  const successMsg = "Contact Created Succesfully";
                  Swal.fire({
                    text: successMsg, icon: 'success', confirmButtonColor: '#A239CA',
                    confirmButtonText: 'OK'
                  }).then(res => {
                    window.location.href = '/post-auth/contacts/';
                  });
                },
                (error) => {
                  this.loaderService.hide();
                  const errMsg = "Unable To Save The Contact";
                  Swal.fire({
                    text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
                    confirmButtonText: 'OK'
                  });
                }
              );
        } else {
          this.loaderService.hide();
        }
      });
      } else {
        this.loaderService.hide();
      }
  }

  logout() {
    this.genericService.logoutApi(this.userDetails.authorize_token).subscribe((data: any) => { 
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }

}

