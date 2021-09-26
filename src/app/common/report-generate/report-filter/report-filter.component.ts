import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  FilterConditionsOptions,
  ModuleData,
  ReportFilterLabels,
} from 'src/app/shared/constants/report.constant';
import {
  FilterCondition,
  FilterType,
  FormField,
  ModuleRef,
  OptionConfig,
} from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})
export class ReportFilterComponent implements OnInit {
  @Input() public selectedModuleArr: string[] = [];
  @Output() public reportfiltered: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onRunBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCancelBtn: EventEmitter<any> = new EventEmitter<any>();
  public modules: ModuleRef[] = ModuleData;
  public selectedModules: ModuleRef[] = [];
  public isVisibleBtn: boolean = false;
  public label: { [key: string]: FormField } = ReportFilterLabels;
  public reportFilterForm: FormGroup = new FormGroup({});
  public standardFilterOptions: FilterCondition[] = [];
  public advanceFilterOptions: FilterCondition[] = [];
  public standardFilterConditionsOptions: FilterCondition[] =
    FilterConditionsOptions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isVisibleBtn = true;
    this.createForm();
    this.prepareColumnForms();
    this.standardFilterCondition?.valueChanges.subscribe((val) => {
      this.onChangeFilterCondition(val);
    });
  }
  private createForm(): void {
    this.reportFilterForm = this.fb.group({
      standardFilterSelect: [''],
      standardFilterCondition: [''],
      startDate: [''],
      endDate: [''],
      advancedFilter: this.fb.array([]),
    });
    this.initializeAdvanceFilter();
  }
  private initializeAdvanceFilter(): void {
    this.advancedFilter.push(
      this.fb.group({
        advanceFilterSelect: [''],
        advancedFilterValue: [''],
      })
    );
  }
  public getGroup(i: number): FormGroup {
    return this.advancedFilter.at(i) as FormGroup;
  }
  public onAdd(index: number): void {
    this.initializeAdvanceFilter();
  }
  public onRemove(index: number): void {
    this.advancedFilter.removeAt(index);
  }
  private prepareColumnForms(): void {
    this.selectedModules = this.modules.filter((module: ModuleRef) => {
      if (this.selectedModuleArr.includes(module.id)) {
        const columns = module.columns;
        columns.forEach((column) => {
          if (column.filterType === FilterType.STANDARD) {
            const filterObj: FilterCondition = new FilterCondition();
            filterObj.id = column.id;
            filterObj.name = `${module.label} ${column.name}`;
            this.standardFilterOptions.push(filterObj);
          }
          if (column.filterType === FilterType.ADVANCE) {
            const filterObj: FilterCondition = new FilterCondition();
            filterObj.id = column.id;
            filterObj.name = `${module.label} ${column.name}`;
            this.advanceFilterOptions.push(filterObj);
          }
        });
      }
      return this.selectedModuleArr.includes(module.id);
    });
    if (this.standardFilterOptions.length) {
      this.standardFilterSelect?.patchValue(this.standardFilterOptions[0].id);
    }
    if (this.standardFilterConditionsOptions.length) {
      this.standardFilterCondition?.patchValue(
        this.standardFilterConditionsOptions[0].id
      );
    }
  }
  get advancedFilter(): FormArray {
    return this.reportFilterForm.get('advancedFilter') as FormArray;
  }
  get standardFilterSelect(): AbstractControl | null {
    return this.reportFilterForm.get('standardFilterSelect');
  }
  get standardFilterCondition(): AbstractControl | null {
    return this.reportFilterForm.get('standardFilterCondition');
  }
  get startDate(): AbstractControl | null {
    return this.reportFilterForm.get('startDate');
  }
  get endDate(): AbstractControl | null {
    return this.reportFilterForm.get('endDate');
  }

  private onChangeFilterCondition(filterType: string): void {
    let startDate = null;
    let endDate = null;
    if (filterType === 'previousFY') {
      let { frDate, toDate } = this.getPreviousFY();
      startDate = frDate;
      endDate = toDate;
    } else if (filterType === 'currentFY') {
      let { frDate, toDate } = this.getCurrentFY();
      startDate = frDate;
      endDate = toDate;
    } else if (filterType === 'nextFY') {
      let { frDate, toDate } = this.getNextFY();
      startDate = frDate;
      endDate = toDate;
    } else if (filterType === 'today') {
      startDate = new Date();
      endDate = new Date();
    } else if (filterType === 'yesterday') {
      startDate = this.getDate(-1);
      endDate = this.getDate(-1);
    } else if (filterType === 'tomorrow') {
      startDate = this.getDate(1);
      endDate = this.getDate(1);
    } else if (filterType === 'custom') {
      startDate = null;
      endDate = null;
    }
    this.startDate?.patchValue(startDate);
    this.endDate?.patchValue(endDate);
  }
  private getNextFY(): any {
    const d = new Date();
    let frDate = new Date(d.getFullYear() + 1, 0, 1);
    let toDate = new Date(d.getFullYear() + 1, 11, 31);
    return { frDate, toDate };
  }
  private getPreviousFY(): any {
    const d = new Date();
    let frDate = new Date(d.getFullYear() - 1, 0, 1);
    let toDate = new Date(d.getFullYear() - 1, 11, 31);
    return { frDate, toDate };
  }
  private getCurrentFY(): any {
    const d = new Date();
    let frDate = new Date(d.getFullYear(), 0, 1);
    let toDate = new Date(d.getFullYear(), 11, 31);
    return { frDate, toDate };
  }
  private getDate(day: number): Date {
    const d = new Date();
    d.setDate(d.getDate() + day);
    return d;
  }
  public onContinue(): void {
    console.log('reportFilterForm=', this.reportFilterForm.value);
    this.reportfiltered.emit(this.reportFilterForm!.value);
    this.isVisibleBtn = false;
  }
  public onRun(): void {
    this.onRunBtn.emit(this.reportFilterForm!.value);
  }
  public onCancel(): void {
    this.onCancelBtn.emit(this.reportFilterForm!.value);
  }
}
