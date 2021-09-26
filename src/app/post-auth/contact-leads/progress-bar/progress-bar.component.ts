import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from "../../../service/data.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  leadId = '';
  action = '';
  sub: any;
  public progressStatus: any;
  public subscription: any;
  userData:any;
  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.leadId = params.leadId;
      this.action = params.action;
    });
 //this.subscription = this.dataService.currentData.subscribe(userData => this.userData = userData);
    this.subscription = this.dataService.currentPogressData.subscribe(progressStatus => this.progressStatus = progressStatus);
  }
  navigateToContactInfo() {
    // if(this.action == 'create') {
    //   this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
    //     queryParams: { action: this.action }
    //   });
    // } else if(this.action == 'edit' || this.action == 'view'){
    //   this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
    //     queryParams: { leadId: this.leadId, action: this.action }
    //   });
    // }
  }
  navigateToUtilityInfo() {
    // if(this.action == 'create') {
    //   this.router.navigate(['post-auth/leads/lead-details/utility-info'], {
    //     queryParams: { action: this.action }
    //   });
    // } else if(this.action == 'edit' || this.action == 'view'){
    //   this.router.navigate(['post-auth/leads/lead-details/utility-info'], {
    //     queryParams: { leadId: this.leadId, action: this.action }
    //   });
    // }
  }
  navigateToLeadInfo() {
    // if(this.action == 'create') {
    //   this.router.navigate(['post-auth/leads/lead-details/lead-info'], {
    //     queryParams: { action: this.action }
    //   });
    // } else if(this.action == 'edit' || this.action == 'view'){
    //   this.router.navigate(['post-auth/leads/lead-details/lead-info'], {
    //     queryParams: { leadId: this.leadId, action: this.action }
    //   });
    // }
  }
  navigateToScheduleAppointment(){
    // if(this.action == 'create') {
    //   this.router.navigate(['post-auth/leads/lead-details/schedule-appointment'], {
    //     queryParams: { action: this.action }
    //   });
    // } else if(this.action == 'edit'){
    //   this.router.navigate(['post-auth/leads/lead-details/schedule-appointment'], {
    //     queryParams: { leadId: this.leadId, action: this.action }
    //   });
    // }
  }
}
