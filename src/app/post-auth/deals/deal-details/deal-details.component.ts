import { Component, OnInit, ElementRef } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserDetailsModel } from 'src/app/shared/models/util.model';
// import {DatePickerComponent} from 'ng2-date-picker';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss'],
})
export class DealDetailsComponent implements OnInit {
  userDetails: UserDetailsModel | null = null;
  dealDetailsForm: any;
  dealId: string = '';
  dealInfoVisible = true;
  targetField: string = '';
  dealDetails: any;
  leadSources: any;
  energyConsultant: any;
  stages: any;
  marketers: any;
  mentors: any;
  secondMarketers: any;
  leadOwners: any;
  contacts: any;
  accounts: any;
  masterData: any;
  // contactDetails:any;
  contactList: any;
  isSubmitClicked = false;
  querySubscription: any;
  isAdmin: boolean = false;
  // contactList = [{Contact_Name: 'Armando Andrade', Phone: '(562) 822-4613', Email: 'Elalemanandrade@gmail.com', Role_Name: ''}]
  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
    this.isAdmin = this.authService.getIsAdmin();

    this.dealDetailsForm = this.formBuilder.group({
      AHJ: ['-'],
      APS_Reservation_Number: ['-'],
      Account_Name: ['-1'],
      Additional_Scope: ['-'],
      Annual_Bill: ['-'],
      Annual_Consumption: ['-'],
      Artificial_Grass: ['-'],
      Battery_Price: ['-'],
      Blended_Rate: ['-'],
      Cash_Adders: ['-'],
      Channel_Partner: ['-1'],
      Closing_Date: [''],
      Company_Cam: ['-'],
      Complimentary_Concierge: ['-1'],
      //Contact_ID: "501"
      Contact_Name: ['-1'],
      Contract_Price: ['-'],
      Date: [''],
      //Deal_ID: 2
      Deal_Name: ['-'],
      Deal_Owner: ['-1'],
      //Deal_Owner_ID: "10003"
      Dealer_Fee: ['-'],
      Derate: ['-1'],
      Description: ['-'],
      Down_Payment: ['-'],
      //Energy_Consultant_ID: ["-"], --> Energy_Consultant
      Escalator: ['-1'],
      Expected_Profit: ['-'],
      FI_PASS: [''],
      FI_SCHEDULED: ['-1'],
      FLA: [''],
      FL_Received_Date: [''],
      FL_Received_Time: ['-1'],
      Fan_Size: ['-1'],
      Final_Layout: ['-'],
      HIC: ['-'],
      HOA: ['-1'],
      HOA_INFO: ['-'],
      HVAC_Price: ['-'],
      HVAC_SOW: ['-1'],
      HVAC_size: ['-1'],
      Home_Sq_Ft: ['-'],
      Install_Completed: [''],
      Install_Scheduled: [''],
      Insulation_Price: ['-'],
      LED_Price: ['-'],
      //Lead_Source_ID: null  --> Lead_Source
      Level_2_EV: ['-'],
      M1_Paid: [''],
      M2_Paid: [''],
      MPU: ['-'],
      MPU_Complete: [''],
      MPU_Required: ['-1'],
      MPU_Scheduled: [''],
      MPU_Sold: ['-1'],
      MSP_Pics: ['-'],
      Marketer: ['-1'],
      //Mentor_ID: null  --> Mentor
      Meter_Spot: ['-1'],
      Monitoring: ['-'],
      NTP: [''],
      Nest_Price: ['-'],
      PROMO: ['-1'],
      PR_SOW_Approved: [''],
      PR_SOW_Received: ['-1'],
      PTO: [''],
      PTO_Submitted_Date: [''],
      PTO_Submitted_Time: ['-1'],
      Packaging_Commission_Paid: [''],
      Permit_Approved: [''],
      Permit_Submitted: [''],
      Pool_Pump_Price: ['-'],
      //Product_ID: "2"
      Program: ['-1'],
      Project_Docs: ['-'],
      QC_Fail_Date: [''],
      QC_Fail_Time: ['-1'],
      QC_Pass_Date: [''],
      QC_Pass_Time: ['-1'],
      QC_Ready_To_Schedule: ['-1'],
      Quiet_Cool_Installed: [''],
      Quiet_Cool_Price: ['-'],
      Region: ['-1'],
      Relocation_Distance: ['-'],
      Rep_Clawback: [''],
      Reschedule_Cycle_Time: ['-'],
      Resign_Required: ['-1'],
      Resigned_for_Roofing: ['-1'],
      Retention_Date: [''],
      //Retention_Rep_ID: null  ---> Retention_Rep
      Retention_Rep: ['-1'],
      Ring_Price: ['-'],
      Roof_Pics: ['-'],
      Roof_Price: ['-'],
      Roof_Waiver: ['-1'],
      Roofer: ['-'],
      Roofing_Required: ['-1'],
      Rookie_Card_VC: [''],
      SR_Approval: [''],
      SS_Arrival_Window: ['-'],
      SS_Date: [''],
      SS_Date_Complete: [''],
      SS_Time: ['-1'],
      Sales_Concierge: ['-1'],
      Scope_of_Reroof: ['-1'],
      Second_Marketer: ['-1'],
      Solar_Price: ['-'],
      //Stage_ID: "1"
      Storedge_Inverter: ['-'],
      System_Size: ['-'],
      UB_Page_1: ['-'],
      UB_Page_2: ['-'],
      Usage_Page: ['-'],
      Utility: ['-1'],
      Utility_Rate_Plan: ['-1'],
      VCR_Completed: ['-1'],
      VSA: [''],
      Volt_Clawback: [''],
      Volt_Paid_M1_Date: [''],
      Volt_Paid_M1_Time: ['-1'],
      Volt_Paid_M2_Date: [''],
      Volt_Paid_M2_Time: ['-1'],
      Window_Price: ['-'],
      dealerEmail: ['-'],
      Loan_Amount: ['-'],
      Modified_By: ['-'],
      Eff_PPW: ['-'],
      Created_By: ['-'],
      Deal_Age: ['-'],
      Products: ['-1'],
      Stage: ['-1'],
      Lead_Source: ['-1'],
      Mentor: ['-1'],
      Energy_Consultant: ['-1'],
    });

    this.route.queryParams.subscribe((params) => {
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
      if (!this.isAdmin)
        this.dealDetailsForm.patchValue({
          Deal_Owner: this.userDetails ? this.userDetails.user_loginId : '',
        });
    });
    this.genericService.getEnergyConsultant().subscribe((data: any) => {
      this.energyConsultant = data.message;
    });
    this.genericService.getStages().subscribe((data: any) => {
      this.stages = data.message;
    });

    this.genericService.getAccounts().subscribe((data: any) => {
      this.accounts = data.message;
    });

    this.fetchDealDetails();
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
    if (value == 'Deal Information')
      this.dealInfoVisible = !this.dealInfoVisible;
  }

  fetchDealDetails() {
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      //console.log(this.masterData);
    });
    this.genericService.getDealsById(this.dealId).subscribe(
      (userList: any) => {
        if (
          userList?.message != 'Server Error' &&
          userList?.error?.name != 'TokenExpiredError'
        ) {
          this.dealDetails = userList.message[0];
          console.log(this.dealDetails);
          let contactId = this.dealDetails.Contact_ID;
          this.genericService.getContacts().subscribe((data: any) => {
            this.contacts = data.message;
            // console.log(this.contacts);
            this.contactList = this.contacts.filter(
              (element: any) => element.Contact_ID == contactId
            );
            //  console.log(this.contactList);
          });

          
          console.log('accounts name: ' + " " + this.dealDetails?.Account_Name + '#?#' + this.dealDetails?.Account_ID);

          this.dealDetailsForm.patchValue({
            Account_Name:
              this.dealDetails?.Account_Name == null
                ? '-1'
                : (this.dealDetails?.Account_Name + '#?#' + this.dealDetails?.Account_ID),
            Channel_Partner:
              this.dealDetails?.Channel_Partner == null
                ? '-1'
                : this.dealDetails?.Channel_Partner,
            Complimentary_Concierge:
              this.dealDetails?.Complimentary_Concierge == null
                ? '-1'
                : this.dealDetails?.Complimentary_Concierge,
            Contact_Name:
              this.dealDetails?.Contact_Name == null
                ? '-1'
                : (this.dealDetails?.Contact_Name + '#?#' + (this.dealDetails?.Contact_ID)),
            Deal_Owner:
              this.dealDetails?.Deal_Owner == null
                ? '-1'
                : (this.dealDetails?.Deal_Owner + '#?#' + (this.dealDetails?.Deal_Owner_ID)),
            Derate:
              this.dealDetails?.Derate == null
                ? '-1'
                : this.dealDetails?.Derate,
            Escalator:
              this.dealDetails?.Escalator == null
                ? '-1'
                : this.dealDetails?.Escalator,
            FI_SCHEDULED:
              this.dealDetails?.FI_SCHEDULED == null
                ? '-1'
                : this.dealDetails?.FI_SCHEDULED,
            FL_Received_Time:
              this.dealDetails?.FL_Received_Time == null
                ? '-1'
                : this.dealDetails?.FL_Received_Time,
            Fan_Size:
              this.dealDetails?.Fan_Size == null
                ? '-1'
                : this.dealDetails?.Fan_Size,
            HOA: this.dealDetails?.HOA == null ? '-1' : this.dealDetails?.HOA,
            HVAC_SOW:
              this.dealDetails?.HVAC_SOW == null
                ? '-1'
                : this.dealDetails?.HVAC_SOW,
            HVAC_size:
              this.dealDetails?.HVAC_size == null
                ? '-1'
                : this.dealDetails?.HVAC_size,
            MPU_Required:
              this.dealDetails?.MPU_Required == null
                ? '-1'
                : this.dealDetails?.MPU_Required,
            MPU_Sold:
              this.dealDetails?.MPU_Sold == null
                ? '-1'
                : this.dealDetails?.MPU_Sold,
            Marketer:
              this.dealDetails?.Marketer == null
                ? '-1'
                : this.dealDetails?.Marketer,
            Meter_Spot:
              this.dealDetails?.Meter_Spot == null
                ? '-1'
                : this.dealDetails?.Meter_Spot,
            PROMO:
              this.dealDetails?.PROMO == null ? '-1' : this.dealDetails?.PROMO,
            Utility:
              this.dealDetails?.Utility == null ? '-1' : this.dealDetails?.Utility,
            PR_SOW_Received:
              this.dealDetails?.PR_SOW_Received == null
                ? '-1'
                : this.dealDetails?.PR_SOW_Received,
            PTO_Submitted_Time:
              this.dealDetails?.PTO_Submitted_Time == null
                ? '-1'
                : this.dealDetails?.PTO_Submitted_Time,
            Program:
              this.dealDetails?.Program == null
                ? '-1'
                : this.dealDetails?.Program,
            QC_Fail_Time:
              this.dealDetails?.QC_Fail_Time == null
                ? '-1'
                : this.dealDetails?.QC_Fail_Time,
            QC_Pass_Time:
              this.dealDetails?.QC_Pass_Time == null
                ? '-1'
                : this.dealDetails?.QC_Pass_Time,
            QC_Ready_To_Schedule:
              this.dealDetails?.QC_Ready_To_Schedule == null
                ? '-1'
                : this.dealDetails?.QC_Ready_To_Schedule,
            Region:
              this.dealDetails?.Region == null
                ? '-1'
                : this.dealDetails?.Region,
            Resign_Required:
              this.dealDetails?.Resign_Required == null
                ? '-1'
                : this.dealDetails?.Resign_Required,
            Resigned_for_Roofing:
              this.dealDetails?.Resigned_for_Roofing == null
                ? '-1'
                : this.dealDetails?.Resigned_for_Roofing,
            Retention_Rep:
              this.dealDetails?.Retention_Rep_ID == null
                ? '-1'
                : this.dealDetails?.Retention_Rep_ID,
            Roof_Waiver:
              this.dealDetails?.Roof_Waiver == null
                ? '-1'
                : this.dealDetails?.Roof_Waiver,
            Roofing_Required:
              this.dealDetails?.Roofing_Required == null
                ? '-1'
                : this.dealDetails?.Roofing_Required,
            SS_Time:
              this.dealDetails?.SS_Time == null
                ? '-1'
                : this.dealDetails?.SS_Time,
            Sales_Concierge:
              this.dealDetails?.Sales_Concierge == null
                ? '-1'
                : this.dealDetails?.Sales_Concierge,
            Scope_of_Reroof:
              this.dealDetails?.Scope_of_Reroof == null
                ? '-1'
                : this.dealDetails?.Scope_of_Reroof,
            Second_Marketer:
              this.dealDetails?.Second_Marketer == null
                ? '-1'
                : this.dealDetails?.Second_Marketer,
            Utility_Rate_Plan:
              this.dealDetails?.Utility_Rate_Plan == null
                ? '-1'
                : this.dealDetails?.Utility_Rate_Plan,
            VCR_Completed:
              this.dealDetails?.VCR_Completed == null
                ? '-1'
                : this.dealDetails?.VCR_Completed,
            Volt_Paid_M1_Time:
              this.dealDetails?.Volt_Paid_M1_Time == null
                ? '-1'
                : this.dealDetails?.Volt_Paid_M1_Time,
            Volt_Paid_M2_Time:
              this.dealDetails?.Volt_Paid_M2_Time == null
                ? '-1'
                : this.dealDetails?.Volt_Paid_M2_Time,
            Products:
              this.dealDetails?.Product_ID == null
                ? '-1'
                : this.dealDetails?.Product_ID,
            Stage:
              this.dealDetails?.Stage_ID == null
                ? '-1'
                : this.dealDetails?.Stage_ID,
            Lead_Source:
              this.dealDetails?.Lead_Source_ID == null
                ? '-1'
                : this.dealDetails?.Lead_Source_ID,
            Mentor:
              this.dealDetails?.Mentor_ID == null
                ? '-1'
                : this.dealDetails?.Mentor_ID,
            Energy_Consultant:
              this.dealDetails?.Energy_Consultant_ID == null
                ? '-1'
                : this.dealDetails?.Energy_Consultant_ID,
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

  submitDealDetails() {
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
        const dealDetailsData = {
          deal_id: this.dealId,
          deal_owner_id: this.dealDetailsForm.value.Deal_Owner == '-1' ? '' : this.dealDetailsForm.value.Deal_Owner.split('#?#')[1],
          account_name: this.dealDetailsForm.value.Account_Name == '-1' ? '' : this.dealDetailsForm.value.Account_Name.split('#?#')[0],
          account_id: this.dealDetailsForm.value.Account_Name == '-1' ? '' : this.dealDetailsForm.value.Account_Name.split('#?#')[1],
          deal_owner: this.dealDetailsForm.value.Deal_Owner == '-1' ? '' : this.dealDetailsForm.value.Deal_Owner.split('#?#')[0],
          deal_name: this.dealDetailsForm.value.Deal_Name == '-' ? '' : this.dealDetailsForm.value.Deal_Name,
          contact_name: this.dealDetailsForm.value.Contact_Name == '-1' ? '' : this.dealDetailsForm.value.Contact_Name.split('#?#')[0],
          contact_id: this.dealDetailsForm.value.Contact_Name == '-1' ? '' : this.dealDetailsForm.value.Contact_Name.split('#?#')[1],
		      email: this.dealDetailsForm.value.dealerEmail == '-' ? '' : this.dealDetailsForm.value.dealerEmail,
          closing_date: this.dealDetailsForm.value.Closing_Date == '-' ? '' : this.dealDetailsForm.value.Closing_Date,
          product_id: this.dealDetailsForm.value.Products == '-1' ? '' : this.dealDetailsForm.value.Products,
          lead_source_id: this.dealDetailsForm.value.Lead_Source == '-1' ? '' : this.dealDetailsForm.value.Lead_Source,
          retention_rep_id: this.dealDetailsForm.value.Retention_Rep == '-1' ? '' : this.dealDetailsForm.value.Retention_Rep,
          mentor_id: this.dealDetailsForm.value.Mentor == '-1' ? '' : this.dealDetailsForm.value.Mentor,
          region: this.dealDetailsForm.value.Region == '-1' ? '' : this.dealDetailsForm.value.Region,
          qc_ready_to_schedule: this.dealDetailsForm.value.QC_Ready_To_Schedule == '-1' ? '' : this.dealDetailsForm.value.QC_Ready_To_Schedule,
          quiet_cool_installed: this.dealDetailsForm.value.Quiet_Cool_Installed == '-' ? '' : this.dealDetailsForm.value.Quiet_Cool_Installed,
          fan_size: this.dealDetailsForm.value.Fan_Size == '-1' ? '' : this.dealDetailsForm.value.Fan_Size,
          marketer: this.dealDetailsForm.value.Marketer == '-1' ? '' : this.dealDetailsForm.value.Marketer,
          stage_id: this.dealDetailsForm.value.Stage == '-1' ? '' : this.dealDetailsForm.value.Stage,
          annual_consumption: this.dealDetailsForm.value.Annual_Consumption == '-' ? '' : this.dealDetailsForm.value.Annual_Consumption,
          annual_bill: this.dealDetailsForm.value.Annual_Bill == '-' ? '' : this.dealDetailsForm.value.Annual_Bill,
          energy_consultant_id: this.dealDetailsForm.value.Energy_Consultant == '-1' ? '' : this.dealDetailsForm.value.Energy_Consultant,
          reschedule_cycle_time: this.dealDetailsForm.value.Reschedule_Cycle_Time == '-' ? '' : this.dealDetailsForm.value.Reschedule_Cycle_Time,
          date: this.dealDetailsForm.value.Date == '-' ? '' : this.dealDetailsForm.value.Date,
          promo: this.dealDetailsForm.value.PROMO == '-1' ? '' : this.dealDetailsForm.value.PROMO,
          utility: this.dealDetailsForm.value.Utility == '-1' ? '' : this.dealDetailsForm.value.Utility,
          hoa: this.dealDetailsForm.value.HOA == '-1' ? '' : this.dealDetailsForm.value.HOA,
          hoa_info: this.dealDetailsForm.value.HOA_INFO == '-' ? '' : this.dealDetailsForm.value.HOA_INFO,
          ahj: this.dealDetailsForm.value.AHJ == '-' ? '' : this.dealDetailsForm.value.AHJ,
          roof_waiver: this.dealDetailsForm.value.Roof_Waiver == '-1' ? '' : this.dealDetailsForm.value.Roof_Waiver,
          roofing_required: this.dealDetailsForm.value.Roofing_Required == '-1' ? '' : this.dealDetailsForm.value.Roofing_Required,
          blended_rate: this.dealDetailsForm.value.Blended_Rate == '-' ? '' : this.dealDetailsForm.value.Blended_Rate,
          utility_rate_plan: this.dealDetailsForm.value.Utility_Rate_Plan == '-1' ? '' : this.dealDetailsForm.value.Utility_Rate_Plan,
          aps_reservation_number: this.dealDetailsForm.value.APS_Reservation_Number == '-' ? '' : this.dealDetailsForm.value.APS_Reservation_Number,
          channel_partner: this.dealDetailsForm.value.Channel_Partner == '-1' ? '' : this.dealDetailsForm.value.Channel_Partner,
          home_sq_ft: this.dealDetailsForm.value.Home_Sq_Ft == '-' ? '' : this.dealDetailsForm.value.Home_Sq_Ft,
          project_docs: this.dealDetailsForm.value.Project_Docs == '-' ? '' : this.dealDetailsForm.value.Project_Docs,
          resign_required: this.dealDetailsForm.value.Resign_Required == '-1' ? '' : this.dealDetailsForm.value.Resign_Required,
          resigned_for_roofing: this.dealDetailsForm.value.Resigned_for_Roofing == '-1' ? '' : this.dealDetailsForm.value.Resigned_for_Roofing,
          roofer: this.dealDetailsForm.value.Roofer == '-' ? '' : this.dealDetailsForm.value.Roofer,
          scope_of_reroof: this.dealDetailsForm.value.Scope_of_Reroof == '-1' ? '' : this.dealDetailsForm.value.Scope_of_Reroof,
          //roof_pics: this.dealDetailsForm.value.Roof_Pics == '-' ? '' : this.dealDetailsForm.value.Roof_Pics,
          roof_pics: '',
          hvac_sow: this.dealDetailsForm.value.HVAC_SOW == '-1' ? '' : this.dealDetailsForm.value.HVAC_SOW,
          hvac_size: this.dealDetailsForm.value.HVAC_size == '-1' ? '' : this.dealDetailsForm.value.HVAC_size,
          derate: this.dealDetailsForm.value.Derate == '-1' ? '' : this.dealDetailsForm.value.Derate,
          mpu_required: this.dealDetailsForm.value.MPU_Required == '-1' ? '' : this.dealDetailsForm.value.MPU_Required,
          mpu_sold: this.dealDetailsForm.value.MPU_Sold == '-1' ? '' : this.dealDetailsForm.value.MPU_Sold,
         // msp_pics: this.dealDetailsForm.value.MSP_Pics == '-' ? '' : this.dealDetailsForm.value.MSP_Pics,
         msp_pics: '', 
         meter_spot: this.dealDetailsForm.value.Meter_Spot == '-1' ? '' : this.dealDetailsForm.value.Meter_Spot,
          relocation_distance: this.dealDetailsForm.value.Relocation_Distance == '-' ? '' : this.dealDetailsForm.value.Relocation_Distance,
          mpu_scheduled: this.dealDetailsForm.value.MPU_Scheduled == '-' ? '' : this.dealDetailsForm.value.MPU_Scheduled,
          mpu_complete: this.dealDetailsForm.value.MPU_Complete == '-' ? '' : this.dealDetailsForm.value.MPU_Complete,
          rookie_card_vc: this.dealDetailsForm.value.Rookie_Card_VC == '-' ? '' : this.dealDetailsForm.value.Rookie_Card_VC,
          ub_page_one: this.dealDetailsForm.value.UB_Page_1 == '-' ? '' : this.dealDetailsForm.value.UB_Page_1,
          ub_page_two: this.dealDetailsForm.value.UB_Page_2 == '-' ? '' : this.dealDetailsForm.value.UB_Page_2,
          usage_page: this.dealDetailsForm.value.Usage_Page == '-' ? '' : this.dealDetailsForm.value.Usage_Page,
          hic: this.dealDetailsForm.value.HIC == '-' ? '' : this.dealDetailsForm.value.HIC,
          company_cam: this.dealDetailsForm.value.Company_Cam == '-' ? '' : this.dealDetailsForm.value.Company_Cam,
          second_marketer: this.dealDetailsForm.value.Second_Marketer == '-1' ? '' : this.dealDetailsForm.value.Second_Marketer,
          retention_date: this.dealDetailsForm.value.Retention_Date == '-' ? '' : this.dealDetailsForm.value.Retention_Date,
          contract_price: this.dealDetailsForm.value.Contract_Price == '-' ? '' : this.dealDetailsForm.value.Contract_Price,
          mpu: this.dealDetailsForm.value.MPU == '-' ? '' : this.dealDetailsForm.value.MPU,
          nest_price: this.dealDetailsForm.value.Nest_Price == '-' ? '' : this.dealDetailsForm.value.Nest_Price,
          ring_price: this.dealDetailsForm.value.Ring_Price == '-' ? '' : this.dealDetailsForm.value.Ring_Price,
          led_price: this.dealDetailsForm.value.LED_Price == '-' ? '' : this.dealDetailsForm.value.LED_Price,
          storedge_inverter: this.dealDetailsForm.value.Storedge_Inverter == '-' ? '' : this.dealDetailsForm.value.Storedge_Inverter,
          level_two_ev: this.dealDetailsForm.value.Level_2_EV == '-' ? '' : this.dealDetailsForm.value.Level_2_EV,
          battery_price: this.dealDetailsForm.value.Battery_Price == '-' ? '' : this.dealDetailsForm.value.Battery_Price,
          hvac_price: this.dealDetailsForm.value.HVAC_Price == '-' ? '' : this.dealDetailsForm.value.HVAC_Price,
          insulation_price: this.dealDetailsForm.value.Insulation_Price == '-' ? '' : this.dealDetailsForm.value.Insulation_Price,
          pool_pump_price: this.dealDetailsForm.value.Pool_Pump_Price == '-' ? '' : this.dealDetailsForm.value.Pool_Pump_Price,
          quiet_cool_price: this.dealDetailsForm.value.Quiet_Cool_Price == '-' ? '' : this.dealDetailsForm.value.Quiet_Cool_Price,
          roof_price: this.dealDetailsForm.value.Roof_Price == '-' ? '' : this.dealDetailsForm.value.Roof_Price,
          solar_price: this.dealDetailsForm.value.Solar_Price == '-' ? '' : this.dealDetailsForm.value.Solar_Price,
          artificial_grass: this.dealDetailsForm.value.Artificial_Grass == '-' ? '' : this.dealDetailsForm.value.Artificial_Grass,
          window_price: this.dealDetailsForm.value.Window_Price == '-' ? '' : this.dealDetailsForm.value.Window_Price,
          additional_scope: this.dealDetailsForm.value.Additional_Scope == '-' ? '' : this.dealDetailsForm.value.Additional_Scope,
          monitoring: this.dealDetailsForm.value.Monitoring == '-' ? '' : this.dealDetailsForm.value.Monitoring,
          program: this.dealDetailsForm.value.Program == '-1' ? '' : this.dealDetailsForm.value.Program,
          escalator: this.dealDetailsForm.value.Channel_Partner == '-1' ? '' : this.dealDetailsForm.value.Channel_Partner,
          dealer_fee: this.dealDetailsForm.value.Dealer_Fee == '-' ? '' : this.dealDetailsForm.value.Dealer_Fee,
          system_size: this.dealDetailsForm.value.System_Size == '-' ? '' : this.dealDetailsForm.value.System_Size,
          down_payment: this.dealDetailsForm.value.Down_Payment == '-' ? '' : this.dealDetailsForm.value.Down_Payment,
          cash_adders: this.dealDetailsForm.value.Cash_Adders == '-' ? '' : this.dealDetailsForm.value.Cash_Adders,
          sales_concierge: this.dealDetailsForm.value.Sales_Concierge == '-1' ? '' : this.dealDetailsForm.value.Sales_Concierge,
          complimentary_concierge: this.dealDetailsForm.value.Complimentary_Concierge == '-1' ? '' : this.dealDetailsForm.value.Complimentary_Concierge,
          ss_date: this.dealDetailsForm.value.SS_Date == '-' ? '' : this.dealDetailsForm.value.SS_Date,
          ss_time: this.dealDetailsForm.value.SS_Time == '-1' ? '' : this.dealDetailsForm.value.SS_Time,
          ss_arrival_window: this.dealDetailsForm.value.SS_Arrival_Window == '-' ? '' : this.dealDetailsForm.value.SS_Arrival_Window,
          ss_date_complete: this.dealDetailsForm.value.SS_Date_Complete == '-' ? '' : this.dealDetailsForm.value.SS_Date_Complete,
          sr_approval: this.dealDetailsForm.value.SR_Approval == '-' ? '' : this.dealDetailsForm.value.SR_Approval,
          qc_fail_date: this.dealDetailsForm.value.QC_Fail_Date == '-' ? '' : this.dealDetailsForm.value.QC_Fail_Date,
          qc_fail_time: this.dealDetailsForm.value.QC_Fail_Time == '-1' ? '' : this.dealDetailsForm.value.QC_Fail_Time,
          qc_pass_date: this.dealDetailsForm.value.QC_Pass_Date == '-' ? '' : this.dealDetailsForm.value.QC_Pass_Date,
          qc_pass_time: this.dealDetailsForm.value.QC_Pass_Time == '-1' ? '' : this.dealDetailsForm.value.QC_Pass_Time,
          fl_received_date: this.dealDetailsForm.value.FL_Received_Date == '-' ? '' : this.dealDetailsForm.value.FL_Received_Date,
          fl_received_time: this.dealDetailsForm.value.FL_Received_Time == '-1' ? '' : this.dealDetailsForm.value.FL_Received_Time,
          final_layout: this.dealDetailsForm.value.Final_Layout == '-' ? '' : this.dealDetailsForm.value.Final_Layout,
          fla: this.dealDetailsForm.value.FLA == '-' ? '' : this.dealDetailsForm.value.FLA,
          ntp: this.dealDetailsForm.value.NTP == '-' ? '' : this.dealDetailsForm.value.NTP,
          vsa: this.dealDetailsForm.value.VSA == '-' ? '' : this.dealDetailsForm.value.VSA,
          pr_sow_received: this.dealDetailsForm.value.PR_SOW_Received == '-1' ? '' : this.dealDetailsForm.value.PR_SOW_Received,
          pr_sow_approved: this.dealDetailsForm.value.PR_SOW_Approved == '-' ? '' : this.dealDetailsForm.value.PR_SOW_Approved,
          permit_submitted: this.dealDetailsForm.value.Permit_Submitted == '-' ? '' : this.dealDetailsForm.value.Permit_Submitted,
          mone_paid: this.dealDetailsForm.value.M1_Paid == '-' ? '' : this.dealDetailsForm.value.M1_Paid,
          volt_paid_mone_date: this.dealDetailsForm.value.Volt_Paid_M1_Date == '-' ? '' : this.dealDetailsForm.value.Volt_Paid_M1_Date,
          volt_paid_mone_time: this.dealDetailsForm.value.Volt_Paid_M1_Time == '-1' ? '' : this.dealDetailsForm.value.Volt_Paid_M1_Time,
          rep_clawback: this.dealDetailsForm.value.Rep_Clawback == '-' ? '' : this.dealDetailsForm.value.Rep_Clawback,
          volt_clawback: this.dealDetailsForm.value.Volt_Clawback == '-' ? '' : this.dealDetailsForm.value.Volt_Clawback,
          permit_approved: this.dealDetailsForm.value.Permit_Approved == '-' ? '' : this.dealDetailsForm.value.Permit_Approved,
          install_scheduled: this.dealDetailsForm.value.Install_Scheduled == '-' ? '' : this.dealDetailsForm.value.Install_Scheduled,
          install_completed: this.dealDetailsForm.value.Install_Completed == '-' ? '' : this.dealDetailsForm.value.Install_Completed,
          m_two_paid: this.dealDetailsForm.value.M2_Paid == '-' ? '' : this.dealDetailsForm.value.M2_Paid,
          volt_paid_mtwo_date: this.dealDetailsForm.value.Volt_Paid_M2_Date == '-' ? '' : this.dealDetailsForm.value.Volt_Paid_M2_Date,
          volt_paid_mtwo_time: this.dealDetailsForm.value.Volt_Paid_M2_Time == '-1' ? '' : this.dealDetailsForm.value.Volt_Paid_M2_Time,
          packaging_commission_paid: this.dealDetailsForm.value.Packaging_Commission_Paid == '-' ? '' : this.dealDetailsForm.value.Packaging_Commission_Paid,
          fi_scheduled : this.dealDetailsForm.value.FI_SCHEDULED == '-1' ? '' : this.dealDetailsForm.value.FI_SCHEDULED,
          fi_pass: this.dealDetailsForm.value.FI_PASS == '-' ? '' : this.dealDetailsForm.value.FI_PASS,
          pto_submitted_date: this.dealDetailsForm.value.PTO_Submitted_Date == '-' ? '' : this.dealDetailsForm.value.PTO_Submitted_Date,
          pto_submitted_time: this.dealDetailsForm.value.PTO_Submitted_Time == '-1' ? '' : this.dealDetailsForm.value.PTO_Submitted_Time,
          pto: this.dealDetailsForm.value.PTO == '-' ? '' : this.dealDetailsForm.value.PTO,
          vcr_completed: this.dealDetailsForm.value.VCR_Completed == '-1' ? '' : this.dealDetailsForm.value.VCR_Completed,
          expected_profit: this.dealDetailsForm.value.Expected_Profit == '-' ? '' : this.dealDetailsForm.value.Expected_Profit,
          description: this.dealDetailsForm.value.Description == '-' ? '' : this.dealDetailsForm.value.Description,
        };
        console.log(dealDetailsData);
        this.querySubscription = this.genericService
          .addModifyDeals(dealDetailsData)
          .subscribe(
            (dataValue: any) => {
              console.log(dataValue);
              const successMsg = 'Deal Details Updated Succesfully';
              Swal.fire({
                text: successMsg,
                icon: 'success',
                confirmButtonColor: '#A239CA',
                confirmButtonText: 'OK',
              }).then((res) => {
                window.location.href = '/post-auth/deals/';
              });
            },
            (error: any) => {
              const errMsg = 'Unable To Save Deal Details';
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
