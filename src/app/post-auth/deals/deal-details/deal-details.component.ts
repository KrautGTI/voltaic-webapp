import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { LoaderService } from "../../../shared/loader/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss']
})
export class DealDetailsComponent implements OnInit {
  dealDetailsForm: any;
  dealId: string = '';
  dealInfoVisible = true;
  targetField: string = '';
  userDetails: any;
  isAdmin: boolean = false;
  dealDetails: any;
  leadSources: any;
  energyConsultant: any;
  stages: any;
  marketers:any;
  mentors:any;
  secondMarketers:any;
  leadOwners:any;
  contactList = [{Contact_Name: 'Armando Andrade', Phone: '(562) 822-4613', Email: 'Elalemanandrade@gmail.com', Role_Name: ''}]
  constructor(private genericService: GenericService, private loaderService: LoaderService,
    private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,
    private elementRef: ElementRef, private renderer: Renderer2, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
      this.userDetails = userData
        ? JSON.parse(userData)
        : null;
      this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
    this.dealDetailsForm = this.formBuilder.group({
    });

    this.route.queryParams.subscribe(params => {
      this.dealId = params.dealId;
    });
    this.genericService.getSources().subscribe((data: any) => {
      this.leadSources = data.message;
    });
    this.genericService.getMentors().subscribe((data: any) => {
      console.log(data);
     this.mentors = data.message;
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
    this.genericService.getStages().subscribe((data: any) => {
      this.stages = data.message;
    });

    this.fetchDealDetails();
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
    if(value == 'Deal Information')
      this.dealInfoVisible = !this.dealInfoVisible;
  }

  fetchDealDetails() { 
    this.genericService.getDealsById(this.userDetails.authorize_token, this.dealId).subscribe((userList: any) => {
      if(userList?.message != 'Server Error' && userList?.error?.name != 'TokenExpiredError'){
        this.dealDetails = userList.message[0];
        console.log(this.dealDetails);
        this.dealDetailsForm.patchValue({
          // Lead_Source: this.dealDetails?.Lead_Source == null ? '-1' : this.dealDetails?.Lead_Source,
          // Energy_Consultant: this.dealDetails?.Energy_Consultant == null ? '-1' : this.dealDetails?.Energy_Consultant,
          // Marketer: this.dealDetails?.Marketer == null ? '-1' : this.dealDetails?.Marketer,
          // Second_Marketer: this.dealDetails?.Second_Marketer == null ? '-1' : this.dealDetails?.Second_Marketer,
          // ownerName : this.dealDetails?.Contact_Owner_ID == null ? '-1' : this.dealDetails?.Contact_Owner_ID
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
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }

}
