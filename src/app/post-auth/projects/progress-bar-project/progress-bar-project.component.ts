import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from "../../../service/data.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress-bar-project',
  templateUrl: './progress-bar-project.component.html',
  styleUrls: ['./progress-bar-project.component.scss']
})
export class ProgressBarProjectComponent implements OnInit {
  projectId = '';
  action = '';
  sub: any;
  public progressStatus: any;
  public subscription: any;
  userData:any;
  constructor(private route: ActivatedRoute,
    protected router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.projectId = params.projectId;
      this.action = params.action;
    });
    this.subscription = this.dataService.currentPogressDataProject.subscribe(progressStatus => this.progressStatus = progressStatus);
  }

  navigateToContactInfo() {
    if(this.action == 'edit') {
      this.progressStatus.contactInfo = 'active';
      this.progressStatus.saleInfo = 'completed';
      this.progressStatus.otherInfo = 'completed';
      this.changeProgressBar();
    }
    if(this.action == 'edit' || this.action == 'view'){
      this.router.navigate(['post-auth/projects/project-details/contact-info'], {
        queryParams: { projectId: this.projectId, action: this.action }
      });
    }
  }
  navigateToSaleInfo() {
    if(this.action == 'edit') {
      this.progressStatus.contactInfo = 'completed';
      this.progressStatus.saleInfo = 'active';
      this.progressStatus.otherInfo = 'completed';
      this.changeProgressBar();
    } 
    if(this.action == 'edit' || this.action == 'view'){
      this.router.navigate(['post-auth/projects/project-details/sale-info'], {
        queryParams: { projectId: this.projectId, action: this.action }
      });
    }
  }
  navigateToOtherInfo() {
    if(this.action == 'edit') {
      this.progressStatus.contactInfo = 'completed';
      this.progressStatus.saleInfo = 'completed';
      this.progressStatus.otherInfo = 'active';
      this.changeProgressBar();
    }
    if(this.action == 'edit' || this.action == 'view'){
      this.router.navigate(['post-auth/projects/project-details/other-info'], {
        queryParams: { projectId: this.projectId, action: this.action }
      });
    }
  }

  changeProgressBar() {
      this.dataService.changeStatusProject(this.progressStatus);
  }

}
