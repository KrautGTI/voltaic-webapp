import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ModuleData,
  ReportModuleLabels,
} from 'src/app/shared/constants/report.constant';
import { FormField } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-module-info',
  templateUrl: './module-info.component.html',
  styleUrls: ['./module-info.component.scss'],
})
export class ModuleInfoComponent implements OnInit, OnDestroy {
  @Input() public moduleData: any = [];
  @Output() public btnSubmit: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  public label: { [key: string]: FormField } = ReportModuleLabels;
  public moduleForm: FormGroup = new FormGroup({});
  private unsubscribe$: Subject<boolean> = new Subject();
  public filteredModuleData: any = [];
  public isInvalidForm: boolean = true;
  public isVisibleForm: boolean = true;
  public isVisibleBtn: boolean = false;
  public isEditable: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moduleData = ModuleData;
    this.createForm();
    this.selectModule?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.getFilteredModuleData(this.selectModule?.value);
      });
    this.availableModules?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.setFormArrayValid();
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  private getFilteredModuleData(selectedValue: string): void {
    this.filteredModuleData = [];
    this.availableModules.clear();
    this.isVisibleBtn = false;
    if (selectedValue) {
      this.isVisibleBtn = true;
      this.filteredModuleData = this.moduleData.filter(
        (item: any) => item.id !== selectedValue
      );
    }
    this.createAvailableModuleForm(this.filteredModuleData);
  }
  private createAvailableModuleForm(filteredModuleData: []): void {
    filteredModuleData.forEach((elem: any) => {
      this.availableModules.push(
        this.fb.group({
          fieldName: elem.id,
          fieldLabel: elem.name,
          selectItem: this.fb.control(false),
        })
      );
    });
  }
  private createForm(): void {
    this.moduleForm = this.fb.group({
      selectModule: [''],
      availableModules: this.fb.array([]),
    });
  }
  get selectModule(): AbstractControl | null {
    return this.moduleForm.get('selectModule');
  }
  get availableModules(): FormArray {
    return this.moduleForm.get('availableModules') as FormArray;
  }
  public getGroup(i: number): FormGroup {
    return this.availableModules.at(i) as FormGroup;
  }
  private setFormArrayValid(): void {
    const selectedModules: FormArray = this.getSelectedModules();
    this.isInvalidForm = !selectedModules.length;
  }

  public onContinue(): void {
    const selectedModules: FormArray = this.getSelectedModules();
    const moduleIdArr = [];
    moduleIdArr.push(this.selectModule?.value);
    selectedModules.controls.forEach((control) => {
      moduleIdArr.push(control.get('fieldName')!.value);
    });
    this.btnSubmit.emit(moduleIdArr);
    this.isVisibleForm = false;
    this.isEditable = false;
    setTimeout(() => {
      this.isVisibleForm = true;
      this.isVisibleBtn = false;
    });
  }
  private getSelectedModules(): FormArray {
    const resArr = this.availableModules.controls.filter(
      (control) => control.get('selectItem')!.value
    );
    return this.fb.array(resArr);
  }
}
