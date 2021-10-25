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
  HomeOwnerLabels,
  ProposalContainerLabels,
} from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  public proposalForm: FormGroup = new FormGroup({});
  public proposalLabel: { [key: string]: FormField } = ProposalContainerLabels;
  public label: { [key: string]: FormField } = HomeOwnerLabels;
  public salesReps = [];
  proposalData:any;
  states = [];
  action: any;
  mentors = [{name:'Yes', value: 'Yes'}, {name:'No', value: 'No'}];
  leadId = '';
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,) { }

    ngOnInit(): void {
      this.proposalData = this.genericService.getProposalData();
      console.log(this.proposalData);
      this.route.queryParams.subscribe((params) => {
        this.action = params.action;
        if(this.action == 'edit' || this.action == 'view') {
          this.leadId = params.leadId;
        }
      });
      this.genericService.getStates().subscribe((data: any) => {
        this.states = data.message;
      });
      this.genericService.getSources().subscribe((data: any) => {
        this.salesReps = data.message;
      });
      // this.addCoSigner?.valueChanges
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe((val) => {
      //     // console.log('val=', val);
      //   });
      this.createForm();
    }
    ngOnDestroy(): void {
      this.unsubscribe$.next(true);
      this.unsubscribe$.complete(); 
    }
    get proposalParentGrp(): FormGroup {
      return this.proposalForm.get('proposalParentGrp') as FormGroup;
    }
    get homeOwnerGrp(): FormGroup {
      return this.proposalForm.get('homeOwnerGrp') as FormGroup;
    }
  
    get addCoSigner(): AbstractControl | null {
      return this.homeOwnerGrp.get('Add_Co_Signer');
    }
    private createForm(): void {
      const proposalParentGrp = this.fb.group({});
      const homeOwnerGrp = this.fb.group({});
      this.proposalForm = this.fb.group({
        proposalParentGrp: proposalParentGrp,
        homeOwnerGrp: homeOwnerGrp,
      });
      console.log(this.proposalForm);
      Object.keys(this.proposalLabel).forEach((key: string) => {
        const fieldName = this.proposalLabel[key].fieldName;
        proposalParentGrp.addControl(
          fieldName,
          this.createControl(this.proposalLabel[key])
        );
        const associatedfieldName = this.proposalLabel[key].associatedfieldName;
        if (associatedfieldName) {
          proposalParentGrp.addControl(
            associatedfieldName,
            this.createControl(this.proposalLabel[key])
          );
        }
      });
      Object.keys(this.label).forEach((key: string) => {
        const fieldName = this.label[key].fieldName;
        homeOwnerGrp.addControl(
          fieldName,
          this.createControl(this.label[key])
        );
        const associatedfieldName = this.label[key].associatedfieldName;
        if (associatedfieldName) {
          homeOwnerGrp.addControl(
            associatedfieldName,
            this.createControl(this.label[key])
          );
        }
      });
  
      console.log(this.proposalForm);
      this.setFormControlValue();
    }
    private createControl(field: FormField): any {
      const validation: ValidatorFn[] = [];
      const disabled = false;
      const value = '';
      return this.fb.control({ disabled, value }, validation);
    }
  
    public getControl(name: string): AbstractControl | null {
      return this.proposalForm.get(name);
    }
    private setFormControlValue(): void {
      if (this.action == 'view' || this.action == 'edit') {
        this.proposalParentGrp.patchValue({
          sales_rep: this.proposalData?.sales_rep_id,
          master_lead_owner: this.proposalData?.master_lead_owner
        });
        this.homeOwnerGrp.patchValue({
          first_name: this.proposalData?.first_name,
          last_name: this.proposalData?.last_name,
          email: this.proposalData?.email,
          phone: this.proposalData?.phone,
          address: this.proposalData?.address,
          street: this.proposalData?.street,
          street_2: this.proposalData?.street_2,
          city: this.proposalData?.city,
          state: this.proposalData?.state,
          zip_code: this.proposalData?.zip_code,
          Add_Co_Signer: false,
          Co_Signer_First_Name: '',
          Co_Signer_Last_Name: '',
          Co_Signer_Email: '',
          Co_Signer_Phone: ''
        })
      } 
      console.log('this.proposalForm', this.proposalForm);
      
    }
    public saveProposal(): void {
  
    }

}
