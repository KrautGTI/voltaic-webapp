import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input() public fieldName: string = '';
  @Input() public class: string = '';
  @Input() public isRequired: boolean = false;
  @Input() public defaultOption: boolean = true;
  @Input() public isOptionStringArray: boolean = true;
  @Input() public options: any = [];
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({});
  }

  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
    const validators = [];
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
