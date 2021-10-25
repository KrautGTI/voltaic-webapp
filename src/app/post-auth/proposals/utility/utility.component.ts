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
import {
  UtilityLabels
} from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  public utilityForm: FormGroup = new FormGroup({});
  public utilityLabels: { [key: string]: FormField } = UtilityLabels;
  public utilities = [];
  proposalData:any;
  action: any;
  leadId = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.proposalData = this.genericService.getProposalData();
    console.log(this.proposalData);
    this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'edit' || this.action == 'view') {
        this.leadId = params.leadId;
      }
    });
    this.createForm();
  }

  get accountOwner(): AbstractControl | null {
    return this.utilityForm.get('accountOwner');
  }

  private createForm(): void {
    this.utilityForm = this.fb.group({
    });
    Object.keys(this.utilityLabels).forEach((key: string) => {
      const fieldName = this.utilityLabels[key].fieldName;
      this.utilityForm.addControl(
        fieldName,
        this.createControl(this.utilityLabels[key])
      );
      const associatedfieldName = this.utilityLabels[key].associatedfieldName;
      if (associatedfieldName) {
        this.utilityForm.addControl(
          associatedfieldName,
          this.createControl(this.utilityLabels[key])
        );
      }
    });
    this.setFormControlValue();
  }

  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.fb.control({ disabled, value }, validation);
  }

  // public getControl(name: string): AbstractControl | null {
  //   return this.utilityForm.get(name);
  // }
  private setFormControlValue(): void {
    if (this.action == 'view' || this.action == 'edit') {
      this.utilityForm.patchValue({
        utility: this.proposalData?.company,
        annual_bill: this.proposalData?.annual_bill,
        annual_usage: this.proposalData?.annual_usage,
      });
    } 
    console.log('this.utilityForm', this.utilityForm);
    
  }

  saveUtility() {
    this.goToSolarInfo();
  }

  goToSolarInfo() {
    if(this.action == 'edit' || this.action == 'view') {
      this.router.navigate(['post-auth/proposals/create-proposal/solar-proposal'], {queryParams: { leadId: this.leadId, action: this.action } });
    }
  }

}
