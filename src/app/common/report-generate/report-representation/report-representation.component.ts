import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ModuleData } from 'src/app/shared/constants/report.constant';
import { ModuleRef } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-representation',
  templateUrl: './report-representation.component.html',
  styleUrls: ['./report-representation.component.scss'],
})
export class ReportRepresentationComponent implements OnInit {
  @Input() public selectedModuleArr: string[] = [];
  @Output() public reportColumnsSelected: EventEmitter<any> =
    new EventEmitter<any>();
  public isVisibleBtn: boolean = false;
  public modules: ModuleRef[] = ModuleData;
  public reportForm: FormGroup = new FormGroup({});
  public selectedModules: ModuleRef[] = [];
  private pickedColumns: FormArray = new FormArray([]);
  private pickedSelectedIndex: number = -1;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isVisibleBtn = true;
    this.createForm();
    this.prepareColumnForms();
  }
  private createForm(): void {
    this.reportForm = this.fb.group({
      availableColumns: this.fb.array([]),
      selectedColumns: this.fb.array([]),
    });
  }
  get availableColumns(): FormArray {
    return this.reportForm.get('availableColumns') as FormArray;
  }
  get selectedColumns(): FormArray {
    return this.reportForm.get('selectedColumns') as FormArray;
  }
  private prepareColumnForms(): void {
    this.selectedModules = this.modules.filter((module: ModuleRef) => {
      if (this.selectedModuleArr.includes(module.id)) {
        const columns = module.columns;
        columns.forEach((column) => {
          this.availableColumns.push(
            this.fb.group({
              id: column.id,
              name: column.name,
              active: this.fb.control(column.active),
              moduleId: module.id,
              moduleName: module.name,
            })
          );
        });
      }
      return this.selectedModuleArr.includes(module.id);
    });
  }
  public getAvailableGroup(i: number): FormGroup {
    return this.availableColumns.at(i) as FormGroup;
  }
  public getSelectedGroup(i: number): FormGroup {
    return this.selectedColumns.at(i) as FormGroup;
  }
  public onClickColumn(selectedForm: FormGroup, index: number): void {
    this.pickedColumns = this.fb.array([]);
    this.availableColumns.controls.forEach((control) => {
      if (control.get('active')?.value) {
        control.get('active')?.patchValue(false);
      }
    });
    this.pickedColumns.push(selectedForm);
    selectedForm.get('active')?.patchValue(true);
  }
  public onClickSelectedColumn(selectedForm: FormGroup, index: number): void {
    this.pickedSelectedIndex = index;
    this.selectedColumns.controls.forEach((control) => {
      if (control.get('active')?.value) {
        control.get('active')?.patchValue(false);
      }
    });
    selectedForm.get('active')?.patchValue(true);
  }
  public onContinue(): void {
    this.reportColumnsSelected.emit(this.selectedColumns!.value);
    this.isVisibleBtn = false;
  }
  public onAdd(): void {
    const controls = this.pickedColumns.controls.map(
      (control) => `${control.value.moduleId}-${control.value.id}`
    );
    const resArr = this.pickedColumns.controls.filter((control) =>
      controls.includes(`${control.value.moduleId}-${control.value.id}`)
    );
    this.pickedColumns.controls.forEach((control) => {
      const controlId = `${control.value.moduleId}-${control.value.id}`;
      const resArr = this.selectedColumns.controls.filter(
        (control) =>
          controlId === `${control.value.moduleId}-${control.value.id}`
      );
      if (!resArr.length) {
        this.selectedColumns.push(
          this.fb.group({
            id: control.value.id,
            name: control.value.name,
            active: this.fb.control(false),
            moduleId: control.value.moduleId,
            moduleName: control.value.moduleName,
          })
        );
      }
    });
  }
  public onUp(): void {
    if (this.pickedSelectedIndex > 0) {
      const newIndex = this.pickedSelectedIndex - 1;
      const removeControl = this.selectedColumns.at(this.pickedSelectedIndex);
      this.selectedColumns.removeAt(this.pickedSelectedIndex);
      this.selectedColumns.insert(newIndex, removeControl);
      this.pickedSelectedIndex = newIndex;
    }
  }
  public onDown(): void {
    if (this.pickedSelectedIndex < this.selectedColumns.length - 1) {
      const newIndex = this.pickedSelectedIndex + 1;
      const removeControl = this.selectedColumns.at(this.pickedSelectedIndex);
      this.selectedColumns.removeAt(this.pickedSelectedIndex);
      this.selectedColumns.insert(newIndex, removeControl);
      this.pickedSelectedIndex = newIndex;
    }
  }
  public onDelete(): void {
    this.selectedColumns.removeAt(this.pickedSelectedIndex);
  }
}
