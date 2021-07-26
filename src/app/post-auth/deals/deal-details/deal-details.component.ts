import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { LoaderService } from "../../../shared/loader/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from "@angular/forms";
import Swal from 'sweetalert2';
// import {DatePickerComponent} from 'ng2-date-picker';

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
  contacts:any;
  accounts:any;
  masterData: any;
 // contactDetails:any;
  contactList: any;
 // contactList = [{Contact_Name: 'Armando Andrade', Phone: '(562) 822-4613', Email: 'Elalemanandrade@gmail.com', Role_Name: ''}]
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
      AHJ: ["-"],
      APS_Reservation_Number: ["-"],
      Account_Name: ["-1"],
      Additional_Scope: ["-"],
      Annual_Bill: ["-"],
      Annual_Consumption: ["-"],
      Artificial_Grass: ["-"],
      Battery_Price: ["-"],
      Blended_Rate: ["-"],
      Cash_Adders: ["-"],
      Channel_Partner: ["-1"],
      Closing_Date: [""],
      Company_Cam: ["-"],
      Complimentary_Concierge: ["-1"],
        //Contact_ID: "501"
      Contact_Name: ["-1"],
      Contract_Price: ["-"],
      Date: [""],
        //Deal_ID: 2
      Deal_Name: ["-"],
      Deal_Owner: ["-1"],
        //Deal_Owner_ID: "10003"
      Dealer_Fee: ["-"],
      Derate: ["-1"],
      Description: ["-"],
      Down_Payment: ["-"],
        //Energy_Consultant_ID: ["-"], --> Energy_Consultant
      Escalator: ["-1"],
      Expected_Profit: ["-"],
      FI_PASS: [""],
      FI_SCHEDULED: ["-1"],
      FLA: [""],
      FL_Received_Date: [""],
      FL_Received_Time: ["-1"],
      Fan_Size: ["-1"],
      Final_Layout: ["-"],
      HIC: ["-"],
      HOA: ["-1"],
      HOA_INFO: ["-"],
      HVAC_Price: ["-"],
      HVAC_SOW: ["-1"],
      HVAC_size: ["-1"],
      Home_Sq_Ft: ["-"],
      Install_Completed: [""],
      Install_Scheduled: [""],
      Insulation_Price: ["-"],
      LED_Price: ["-"],
        //Lead_Source_ID: null  --> Lead_Source
      Level_2_EV: ["-"],
      M1_Paid: [""],
      M2_Paid: [""],
      MPU: ["-"],
      MPU_Complete: [""],
      MPU_Required: ["-1"],
      MPU_Scheduled: [""],
      MPU_Sold: ["-1"],
      MSP_Pics: ["-"],
      Marketer: ["-1"],
        //Mentor_ID: null  --> Mentor
      Meter_Spot: ["-1"],
      Monitoring: ["-"],
      NTP: [""],
      Nest_Price: ["-"],
      PROMO: ["-1"],
      PR_SOW_Approved: [""],
      PR_SOW_Received: ["-1"],
      PTO: [""],
      PTO_Submitted_Date: [""],
      PTO_Submitted_Time: ["-1"],
      Packaging_Commission_Paid: [""],
      Permit_Approved: [""],
      Permit_Submitted: [""],
      Pool_Pump_Price: ["-"],
        //Product_ID: "2"
      Program: ["-1"],
      Project_Docs: ["-"],
      QC_Fail_Date: [""],
      QC_Fail_Time: ["-1"],
      QC_Pass_Date: [""],
      QC_Pass_Time: ["-1"],
      QC_Ready_To_Schedule: ["-1"],
      Quiet_Cool_Installed: [""],
      Quiet_Cool_Price: ["-"],
      Region: ["-1"],
      Relocation_Distance: ["-"],
      Rep_Clawback: [""],
      Reschedule_Cycle_Time: ["-"],
      Resign_Required: ["-1"],
      Resigned_for_Roofing: ["-1"],
      Retention_Date: [""],
        //Retention_Rep_ID: null  ---> Retention_Rep
      Retention_Rep: ["-1"],
      Ring_Price: ["-"],
      Roof_Pics: ["-"],
      Roof_Price: ["-"],
      Roof_Waiver: ["-1"],
      Roofer: ["-"],
      Roofing_Required: ["-1"],
      Rookie_Card_VC: [""],
      SR_Approval: [""],
      SS_Arrival_Window: ["-"],
      SS_Date: [""],
      SS_Date_Complete: [""],
      SS_Time: ["-1"],
      Sales_Concierge: ["-1"],
      Scope_of_Reroof: ["-1"],
      Second_Marketer: ["-1"],
      Solar_Price: ["-"],
        //Stage_ID: "1"
      Storedge_Inverter: ["-"],
      System_Size: ["-"],
      UB_Page_1: ["-"],
      UB_Page_2: ["-"],
      Usage_Page: ["-"],
      Utility: ["-"],
      Utility_Rate_Plan: ["-1"],
      VCR_Completed: ["-1"],
      VSA: [""],
      Volt_Clawback: [""],
      Volt_Paid_M1_Date: [""],
      Volt_Paid_M1_Time: ["-1"],
      Volt_Paid_M2_Date: [""],
      Volt_Paid_M2_Time: ["-1"],
      Window_Price: ["-"],
      dealerEmail: ["-"],
      Loan_Amount: ["-"],
      Modified_By: ["-"],
      Eff_PPW: ["-"],
      Created_By: ["-"],
      Deal_Age: ["-"],
      Products: ["-1"],
      Stage: ["-1"],
      Lead_Source: ["-1"],
      Mentor: ["-1"],
      Energy_Consultant: ["-1"]
    });

    this.route.queryParams.subscribe(params => {
      this.dealId = params.dealId;
    });
    this.genericService.getSources().subscribe((data: any) => {
      this.leadSources = data.message;
    });
    this.genericService.getMentors().subscribe((data: any) => {
     // console.log(data);
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
     console.log(this.leadOwners);
    });
    this.genericService.getEnergyConsultant().subscribe((data: any) => {
      this.energyConsultant = data.message;
    });
    this.genericService.getStages().subscribe((data: any) => {
      this.stages = data.message;
    });
    
    this.genericService.getAccounts(this.userDetails.authorize_token, this.isAdmin).subscribe((data: any) => {
      this.accounts = data.message;
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
    this.httpClient.get("assets/json/master.json").subscribe(masterData => {
      this.masterData = masterData;
      //console.log(this.masterData);
    });
    this.genericService.getDealsById(this.userDetails.authorize_token, this.dealId).subscribe((userList: any) => {
      if(userList?.message != 'Server Error' && userList?.error?.name != 'TokenExpiredError'){
        this.dealDetails = userList.message[0];
        console.log(this.dealDetails);
        let contactId = this.dealDetails.Contact_ID;
        this.genericService.getContacts(this.userDetails.authorize_token, this.isAdmin).subscribe((data: any) => {
          this.contacts = data.message;
        // console.log(this.contacts);
          this.contactList = this.contacts.filter((element:any) => (element.Contact_ID == contactId));
        //  console.log(this.contactList);
        });
        
        this.dealDetailsForm.patchValue({       
          Account_Name: this.dealDetails?.Account_Name == null ? '-1' : this.dealDetails?.Account_Name,
          Channel_Partner: this.dealDetails?.Channel_Partner == null ? '-1' : this.dealDetails?.Channel_Partner,
          Complimentary_Concierge: this.dealDetails?.Complimentary_Concierge == null ? '-1' : this.dealDetails?.Complimentary_Concierge,
          Contact_Name: this.dealDetails?.Contact_Name == null ? '-1' : this.dealDetails?.Contact_Name,
          Deal_Owner: this.dealDetails?.Deal_Owner == null ? '-1' : this.dealDetails?.Deal_Owner,
          Derate: this.dealDetails?.Derate == null ? '-1' : this.dealDetails?.Derate,
          Escalator: this.dealDetails?.Escalator == null ? '-1' : this.dealDetails?.Escalator,
          FI_SCHEDULED: this.dealDetails?.FI_SCHEDULED == null ? '-1' : this.dealDetails?.FI_SCHEDULED,
          FL_Received_Time: this.dealDetails?.FL_Received_Time == null ? '-1' : this.dealDetails?.FL_Received_Time,
            Fan_Size: this.dealDetails?.Fan_Size == null ? '-1' : this.dealDetails?.Fan_Size,
            HOA: this.dealDetails?.HOA == null ? '-1' : this.dealDetails?.HOA,
            HVAC_SOW: this.dealDetails?.HVAC_SOW == null ? '-1' : this.dealDetails?.HVAC_SOW,
            HVAC_size: this.dealDetails?.HVAC_size == null ? '-1' : this.dealDetails?.HVAC_size,
            MPU_Required: this.dealDetails?.MPU_Required == null ? '-1' : this.dealDetails?.MPU_Required,
             MPU_Sold: this.dealDetails?.MPU_Sold == null ? '-1' : this.dealDetails?.MPU_Sold,
             Marketer: this.dealDetails?.Marketer == null ? '-1' : this.dealDetails?.Marketer,
             Meter_Spot: this.dealDetails?.Meter_Spot == null ? '-1' : this.dealDetails?.Meter_Spot,
             PROMO: this.dealDetails?.PROMO == null ? '-1' : this.dealDetails?.PROMO,
             PR_SOW_Received: this.dealDetails?.PR_SOW_Received == null ? '-1' : this.dealDetails?.PR_SOW_Received,
            PTO_Submitted_Time: this.dealDetails?.PTO_Submitted_Time == null ? '-1' : this.dealDetails?.PTO_Submitted_Time,
            Program: this.dealDetails?.Program == null ? '-1' : this.dealDetails?.Program,
            QC_Fail_Time: this.dealDetails?.QC_Fail_Time == null ? '-1' : this.dealDetails?.QC_Fail_Time,
            QC_Pass_Time: this.dealDetails?.QC_Pass_Time == null ? '-1' : this.dealDetails?.QC_Pass_Time,
            QC_Ready_To_Schedule: this.dealDetails?.QC_Ready_To_Schedule == null ? '-1' : this.dealDetails?.QC_Ready_To_Schedule,
            Region: this.dealDetails?.Region == null ? '-1' : this.dealDetails?.Region,
            Resign_Required: this.dealDetails?.Resign_Required == null ? '-1' : this.dealDetails?.Resign_Required,
            Resigned_for_Roofing: this.dealDetails?.Resigned_for_Roofing == null ? '-1' : this.dealDetails?.Resigned_for_Roofing,
            Retention_Rep: this.dealDetails?.Retention_Rep_ID == null ? '-1' : this.dealDetails?.Retention_Rep_ID,
            Roof_Waiver: this.dealDetails?.Roof_Waiver == null ? '-1' : this.dealDetails?.Roof_Waiver,
            Roofing_Required: this.dealDetails?.Roofing_Required == null ? '-1' : this.dealDetails?.Roofing_Required,
            SS_Time: this.dealDetails?.SS_Time == null ? '-1' : this.dealDetails?.SS_Time,
            Sales_Concierge: this.dealDetails?.Sales_Concierge == null ? '-1' : this.dealDetails?.Sales_Concierge,
            Scope_of_Reroof: this.dealDetails?.Scope_of_Reroof == null ? '-1' : this.dealDetails?.Scope_of_Reroof,
            Second_Marketer: this.dealDetails?.Second_Marketer == null ? '-1' : this.dealDetails?.Second_Marketer,
            Utility_Rate_Plan: this.dealDetails?.Utility_Rate_Plan == null ? '-1' : this.dealDetails?.Utility_Rate_Plan,
            VCR_Completed: this.dealDetails?.VCR_Completed == null ? '-1' : this.dealDetails?.VCR_Completed,
            Volt_Paid_M1_Time: this.dealDetails?.Volt_Paid_M1_Time == null ? '-1' : this.dealDetails?.Volt_Paid_M1_Time,
            Volt_Paid_M2_Time: this.dealDetails?.Volt_Paid_M2_Time == null ? '-1' : this.dealDetails?.Volt_Paid_M2_Time,
            Products: this.dealDetails?.Product_ID == null ? '-1' : this.dealDetails?.Product_ID,
            Stage: this.dealDetails?.Stage_ID == null ? '-1' : this.dealDetails?.Stage_ID,
            Lead_Source: this.dealDetails?.Lead_Source_ID == null ? '-1' : this.dealDetails?.Lead_Source_ID,
            Mentor: this.dealDetails?.Mentor_ID == null ? '-1' : this.dealDetails?.Mentor_ID,
            Energy_Consultant: this.dealDetails?.Energy_Consultant_ID == null ? '-1' : this.dealDetails?.Energy_Consultant_ID  
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
