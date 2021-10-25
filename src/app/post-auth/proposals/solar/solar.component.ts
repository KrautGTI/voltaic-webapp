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
  SolarLabels
} from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrls: ['./solar.component.scss']
})
export class SolarComponent implements OnInit {
  arrays = [];
  private unsubscribe$: Subject<boolean> = new Subject();
  public solarForm: FormGroup = new FormGroup({});
  public solarLabels: { [key: string]: FormField } = SolarLabels;
  proposalData:any;
  action: any;
  leadId = '';
  masterData: any;
  homeTypes = [];
  proposalTypes = [];
  installers = [];
  systemSizes:any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService,
    private route: ActivatedRoute, private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.proposalData = this.genericService.getProposalData();
    console.log(this.proposalData);
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.homeTypes = this.masterData.homeType;
      this.proposalTypes = this.masterData.proposalType;
      this.installers = this.masterData.installers;
    });
    for(let i=0; i<=100-3; i++) {
      this.systemSizes.push({value: (i+3).toString()});
    }
    this.route.queryParams.subscribe((params) => {
      this.action = params.action;
      if(this.action == 'edit' || this.action == 'view') {
        this.leadId = params.leadId;
      }
    });
    this.createForm();
  }

  private createForm(): void {
    this.solarForm = this.fb.group({
    });
    Object.keys(this.solarLabels).forEach((key: string) => {
      const fieldName = this.solarLabels[key].fieldName;
      this.solarForm.addControl(
        fieldName,
        this.createControl(this.solarLabels[key])
      );
      const associatedfieldName = this.solarLabels[key].associatedfieldName;
      if (associatedfieldName) {
        this.solarForm.addControl(
          associatedfieldName,
          this.createControl(this.solarLabels[key])
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

  private setFormControlValue(): void {
    if (this.action == 'view' || this.action == 'edit') {
      // this.solarForm.patchValue({
      //   utility: this.proposalData?.company,
      //   annual_bill: this.proposalData?.annual_bill,
      //   annual_usage: this.proposalData?.annual_usage,
      // });
    } 
    console.log('this.solarForm', this.solarForm);
    
  }

  saveSolar() {

  }


}
