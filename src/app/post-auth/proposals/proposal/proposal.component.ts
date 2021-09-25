import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import {
  HomeOwnerLabels,
  ProposalContainerLabels,
} from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  public proposalForm: FormGroup = new FormGroup({});
  public proposalLabel: { [key: string]: FormField } = ProposalContainerLabels;
  public homeOwnerLabel: { [key: string]: FormField } = HomeOwnerLabels;
  public salesReps: { name: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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
    Object.keys(this.homeOwnerLabel).forEach((key: string) => {
      const fieldName = this.homeOwnerLabel[key].fieldName;
      homeOwnerGrp.addControl(
        fieldName,
        this.createControl(this.homeOwnerLabel[key])
      );
      const associatedfieldName = this.homeOwnerLabel[key].associatedfieldName;
      if (associatedfieldName) {
        homeOwnerGrp.addControl(
          associatedfieldName,
          this.createControl(this.homeOwnerLabel[key])
        );
      }
    });

    console.log(this.proposalForm);
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
  public saveProposal(): void {}
}
