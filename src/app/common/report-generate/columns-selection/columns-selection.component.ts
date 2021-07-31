import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-columns-selection',
  templateUrl: './columns-selection.component.html',
  styleUrls: ['./columns-selection.component.scss'],
})
export class ColumnsSelectionComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() fieldName: string = '';
  @Input() isVisibleArrangeBtns: boolean = false;
  @Input() isVisibleModuleHeader: boolean = false;
  @Output() pickedColumns: EventEmitter<FormArray> =
    new EventEmitter<FormArray>();
  private selectedIndex: number = -1;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get columnFormArray(): FormArray {
    return this.form.get(this.fieldName) as FormArray;
  }
  public getGroup(i: number): FormGroup {
    return this.columnFormArray.at(i) as FormGroup;
  }

  public onClick(selectedForm: FormGroup, index: number): void {
    this.selectedIndex = index;
    const formArray = this.fb.array([]);
    formArray.push(selectedForm);
    this.pickedColumns.emit(formArray);
    this.columnFormArray.controls.forEach((control) => {
      if (control.get('active')?.value) {
        control.get('active')?.patchValue(false);
      }
    });
    selectedForm.get('active')?.patchValue(true);
  }
  public onUp(): void {
    if (this.selectedIndex > -1 && this.selectedIndex > 0) {
      const newIndex = this.selectedIndex - 1;
      const removeControl = this.columnFormArray.at(this.selectedIndex);
      this.columnFormArray.removeAt(this.selectedIndex);
      this.columnFormArray.insert(newIndex, removeControl);
      this.selectedIndex = newIndex;
    }
  }
  public onDown(): void {
    if (
      this.selectedIndex > -1 &&
      this.selectedIndex < this.columnFormArray.length - 1
    ) {
      const newIndex = this.selectedIndex + 1;
      const removeControl = this.columnFormArray.at(this.selectedIndex);
      this.columnFormArray.removeAt(this.selectedIndex);
      this.columnFormArray.insert(newIndex, removeControl);
      this.selectedIndex = newIndex;
    }
  }
  public onDelete(): void {
    if (this.selectedIndex > -1) {
      this.columnFormArray.removeAt(this.selectedIndex);
      this.selectedIndex = -1;
    }
  }
}
