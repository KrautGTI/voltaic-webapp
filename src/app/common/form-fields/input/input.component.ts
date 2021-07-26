import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input() public fieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isRequired: boolean = false;
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();

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
    this.groupControl?.updateValueAndValidity();
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  public onBlur(e: any): void {
    this.cstBlur.emit(e.target.value);
  }
  public onChange(e: any): void {
    this.cstChange.emit(e.target.value);
  }
}
