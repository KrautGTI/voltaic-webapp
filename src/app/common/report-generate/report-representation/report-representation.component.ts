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
          if (column.selected) {
            this.selectedColumns.push(
              this.fb.group({
                id: column.id,
                name: column.name,
                active: this.fb.control(column.active),
                moduleId: module.id,
                moduleName: module.name,
              })
            );
          }
        });
      }
      return this.selectedModuleArr.includes(module.id);
    });
  }
  public onPickedColumns(formArray: FormArray): void {
    this.pickedColumns = formArray;
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
}
