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
       Email: [""],
       Phone: [""],
       First_Name:[""],
       Last_Name:[""],
       Freedom_ID: [""],
       Average_Bill: [""],
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
       DateTime_Scheduled: [""],

       ownerName: ["-1"],
       Lead_Source: ["-1"],
       Energy_Consultant: ["-1"],
       Marketer: ["-1"],
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
      });
      this.genericService.getEnergyConsultant().subscribe((data: any) => {
        this.energyConsultant = data.message;
      });   
  }

  createContact() { 
    
    
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

