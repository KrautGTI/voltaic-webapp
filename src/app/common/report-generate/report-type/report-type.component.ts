import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReportModuleLabels } from 'src/app/shared/constants/report.constant';
import { FormField, OptionModel } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-type',
  templateUrl: './report-type.component.html',
  styleUrls: ['./report-type.component.scss'],
})
export class ReportTypeComponent implements OnInit {
  @Output() public reportTypeSelect: EventEmitter<any> =
    new EventEmitter<any>();
  public isVisibleBtn: boolean = false;
  public label: { [key: string]: FormField } = ReportModuleLabels;
  public reportTypeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isVisibleBtn = true;
    this.createForm();
    this.reportType?.valueChanges.subscribe((res) => {
      console.log('res=', res);
    });
  }
  private createForm(): void {
    this.reportTypeForm = this.fb.group({
      reportType: ['tabularReport'],
    });
  }
  get reportType(): AbstractControl | null {
    return this.reportTypeForm.get('reportType');
  }
  public onContinue(): void {
    this.reportTypeSelect.emit(this.reportType!.value);
    this.isVisibleBtn = false;
  }
}
