import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import { LoaderService } from "../../shared/loader/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactDetailsForm: any;
  contactId: string = '';
  contactInfoVisible = true;
  targetField: string = '';
  userDetails: any;
  isAdmin: boolean = false;
  contactDetails: any;
  leadSources: any;
  energyConsultant: any;
  stages: any;
  marketers:any;
  mentors:any;

  constructor(private genericService: GenericService, private loaderService: LoaderService,
    private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,
    private elementRef: ElementRef, private renderer: Renderer2, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
      this.userDetails = userData
        ? JSON.parse(userData)
        : null;
      this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
    this.contactDetailsForm = this.formBuilder.group({
      ownerName: ["-"],
      Email: ["-"],
      Phone: ["-"],
      contactName:["-"],
      Freedom_ID: ["-"],
      second_Marketer: ["-"],
      Average_Bill: ["-"],
      Spouse_Name: ["-"],
      Date_Created: ["-"],
      Home_Sq_Ft: ["-"],
      LeadIdCPY: ["-"],
      Qualified_By: ["-"],
      Mailing_City: ["-"],
      Mailing_State: ["-"],
      Mailing_Street: ["-"],
      Mailing_Zip: ["-"],
      Description: ["-"],
      DateTime_Scheduled: ["-"],

      Lead_Source: ["-1"],
      Energy_Consultant: ["-1"],
      Marketer: ["-1"],
    });

      this.route.queryParams.subscribe(params => {
        this.contactId = params.contactId;
      });
      this.genericService.getSources().subscribe((data: any) => {
        console.log(data);
        this.leadSources = data.message;
      });
      // this.genericService.getMentors().subscribe((data: any) => {
      //   console.log(data);
      //  this.mentors = data.message;
      // });
      this.genericService.getMarketers().subscribe((data: any) => {
        console.log(data);
       this.marketers = data.message;
      });
      // this.genericService.getStages().subscribe((data: any) => {
      //   console.log(data);
      //  this.stages = data.message;
      // });
      this.genericService.getEnergyConsultant().subscribe((data: any) => {
        console.log(data);
        this.energyConsultant = data.message;
      });
     this.fetchContactDetails();
  }

  editSaveField(fieldName: string) {
    if(this.targetField && this.targetField !== fieldName) {
      let prevTargetControl = this.elementRef.nativeElement.querySelector('[formcontrolname="' + this.targetField + '"]');
      if(!prevTargetControl.readOnly) {
        prevTargetControl.readOnly = true;
        prevTargetControl.parentNode.nextSibling.classList.remove('checkIcon');
      }
    }
    let targetControl = this.elementRef.nativeElement.querySelector('[formcontrolname="' + fieldName + '"]');
    this.targetField = fieldName;
    targetControl.readOnly = !targetControl.readOnly;  
    if(!targetControl.readOnly) {
      targetControl.parentNode.nextSibling.classList.add('checkIcon');
      targetControl.focus();
    } else {
      targetControl.parentNode.nextSibling.classList.remove('checkIcon');
    }
  }

  toggle(value: string){
    if(value == 'Contact Information')
      this.contactInfoVisible = !this.contactInfoVisible;
  }

  fetchContactDetails() {
    this.loaderService.hide();
    this.genericService.getContacts(this.userDetails.authorize_token, this.isAdmin).subscribe((userList: any) => {
      if(userList?.message != 'Server Error' && userList?.error?.name != 'TokenExpiredError'){
        let contactList = userList.message;
        this.contactDetails = contactList.find((ele:any) => ele.Contact_ID == this.contactId);
        console.log(this.contactDetails);
        this.contactDetailsForm.patchValue({
          Lead_Source: this.contactDetails?.Lead_Source == null ? '-1' : this.contactDetails?.Lead_Source,
          Energy_Consultant: this.contactDetails?.Energy_Consultant == null ? '-1' : this.contactDetails?.Energy_Consultant,
          Marketer: this.contactDetails?.Marketer == null ? '-1' : this.contactDetails?.Marketer
        });
        this.loaderService.hide();
      } else if(userList?.error?.name == 'TokenExpiredError'){
        const errMsg = "Session Expired !! Please login again.";
        Swal.fire({
          text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
          confirmButtonText: 'OK'
        }).then(res => {
          this.logout();
        });
      }
    }, (error) => {
        this.loaderService.hide();
        const errMsg = "Unable To fetch data. Please try again.";
        Swal.fire({
          text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
          confirmButtonText: 'OK'
        });
    });
  }

  logout() {
    this.genericService.logoutApi(this.userDetails.authorize_token).subscribe((data: any) => { 
      console.log(data);
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }

}
