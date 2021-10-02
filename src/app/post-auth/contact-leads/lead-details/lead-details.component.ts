import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { GenericService } from '../../../service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  leadId = '';
  action = '';
  sub: any;
  progressStatus:any;
  leadDetails:any;
  constructor(private route: ActivatedRoute, private router: Router,private dataService: DataService,
    private genericService: GenericService, private notificationService: NotificationService) { }

  ngOnInit(): void {
   this.sub = this.route.queryParams.subscribe((params) => {
      this.leadId = params.leadId;
      this.action = params.action;
      this.changeProgressBar();
      // this.router.navigate(['post-auth/leads/lead-details/contact-info'], {
      //   queryParams: { leadId: this.leadId, action: this.action }
      // });
      
    });
    
  }

  changeProgressBar() {
    let progressdata = localStorage.getItem('userSessionProgressData');
      if (progressdata) {
        this.progressStatus = JSON.parse(progressdata);
      } else {
        this.dataService.currentPogressData.subscribe(progressStatus => this.progressStatus = progressStatus);
      }
      if(this.action == 'view') {
        this.progressStatus.contactInfo = 'completed';
        this.progressStatus.utilityInfo = 'completed';
        this.progressStatus.leadInfo = 'completed';
      } if(this.action == 'create') {
        this.progressStatus.contactInfo = 'active';
        this.progressStatus.utilityInfo = 'notVisited';
        this.progressStatus.leadInfo = 'notVisited';
        this.progressStatus.appointment = 'notVisited';
      }
      this.dataService.changeStatus(this.progressStatus);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
