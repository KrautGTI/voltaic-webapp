import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() public group: FormGroup = new FormGroup({});
  @Input() public label: string = '';
  @Input() public type: string = 'checkbox';
  @Input() public fieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isFixed: boolean = true;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstChange = new EventEmitter<any>();
  public labelPosition: 'before' | 'after' = 'after';

  constructor() {}

  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
  }
  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  public onChange(e: any): void {
    this.cstChange.emit(e.target.value);
  }
  public onClickEdit(): void {
    this.isEditable = !this.isEditable;
    this.setEditableStatus();
  }
  private setEditableStatus(): void {
    if (this.isEditable) {
      this.groupControl?.enable();
    } else {
      this.groupControl?.disable();
    }
  }
}
