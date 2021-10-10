import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { GenericService } from '../../../service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId = '';
  action = '';
  sub: any;
  progressStatus:any;
  projectDetails:any;
  constructor(private route: ActivatedRoute, private router: Router,private dataService: DataService,
    private genericService: GenericService, private notificationService: NotificationService) { }

    ngOnInit(): void {
      this.sub = this.route.queryParams.subscribe((params) => {
         this.projectId = params.projectId;
         this.action = params.action;
         this.changeProgressBar();
       });
       
     }
   
     changeProgressBar() {
       let progressdata = localStorage.getItem('userSessionProgressDataProject');
         if (progressdata) {
           this.progressStatus = JSON.parse(progressdata);
         } else {
           this.dataService.currentPogressDataProject.subscribe(progressStatus => this.progressStatus = progressStatus);
         }
         if(this.action == 'view') {
           this.progressStatus.contactInfo = 'completed';
           this.progressStatus.saleInfo = 'completed';
           this.progressStatus.otherInfo = 'completed';
         } if(this.action == 'create') {
           this.progressStatus.contactInfo = 'active';
           this.progressStatus.saleInfo = 'notVisited';
           this.progressStatus.otherInfo = 'notVisited';
         }
         this.dataService.changeStatusProject(this.progressStatus);
     }
   
     ngOnDestroy() {
       this.sub.unsubscribe();
     }

}
