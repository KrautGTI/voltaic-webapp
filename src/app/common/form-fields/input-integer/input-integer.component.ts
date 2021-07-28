import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-input-integer',
  templateUrl: './input-integer.component.html',
  styleUrls: ['./input-integer.component.scss'],
})
export class InputIntegerComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'number';
  @Input() public fieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isFixed: boolean = true;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();
  @ViewChild('inputRef') private inputRef: ElementRef | null = null;

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({});
  }

  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
    const validators = [Validators.minLength(0), Validators.maxLength(250)];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.groupControl?.setValidators(validators);
    this.setEditableStatus();
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  public onKeypress(e: KeyboardEvent): void {
    this.numberCheck(e);
  }
  public onBlur(e: any): void {
    this.cstBlur.emit(e.target.value);
  }
  public onChange(e: any): void {
    this.cstChange.emit(e.target.value);
  }
  private numberCheck(e: KeyboardEvent): void {
    const keycode = e.keyCode || e.which;
    const ctrlKey = e.ctrlKey;
    const shiftKey = e.shiftKey;
    const keycodeArr = [ 8, 9, 27, 13];
    if (
      keycodeArr.includes(keycode) ||
      (ctrlKey &&
        (keycode === 65 ||
          keycode === 67 ||
          keycode === 86 ||
          keycode === 116)) ||
      (!shiftKey && keycode === 190)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (shiftKey || keycode < 48 || keycode > 57) &&
      (keycode > 96 || keycode < 105)
    ) {
      e.preventDefault();
    }
  }
  public onClickEdit(): void {
    if (!this.isEditable) {
      setTimeout(() => {
        this.inputRef?.nativeElement.focus();
      });
    }
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
