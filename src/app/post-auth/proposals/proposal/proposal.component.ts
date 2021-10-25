import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit {
  action: any;
  leadId = '';
  isUtility = false;
  isContract = true;
  isSolar = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'edit' || this.action == 'view') {
        this.leadId = params.leadId;
      }
    });
  }

  goToContractInfo() {
    this.isUtility = false;
    this.isContract = true;
    this.isSolar = false;
    if(this.action == 'edit' || this.action == 'view') {
      this.router.navigate(['post-auth/proposals/create-proposal/contract-proposal'], {queryParams: { leadId: this.leadId, action: this.action } });
    }
  }
  
  goToUtilityInfo() {
    this.isContract = false;
    this.isUtility = true;
    this.isSolar = false;
    if(this.action == 'edit' || this.action == 'view') {
      this.router.navigate(['post-auth/proposals/create-proposal/utility-proposal'], {queryParams: { leadId: this.leadId, action: this.action } });
    }
  }

  goToSolarInfo() {
    this.isContract = false;
    this.isUtility = false;
    this.isSolar = true;
    if(this.action == 'edit' || this.action == 'view') {
      this.router.navigate(['post-auth/proposals/create-proposal/solar-proposal'], {queryParams: { leadId: this.leadId, action: this.action } });
    }
  }

}
