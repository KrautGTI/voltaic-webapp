import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldError } from 'src/app/shared/models/util.model';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class DateComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'date';
  @Input() public fieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isFixed: boolean = true;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public errors: FormFieldError[] = [];
  @Input() public picker = '';
  @Input() public minDate: Date | null = null;
  @Input() public maxDate: Date | null = null;
  @Input() public startRange: number | null = null;
  @Input() public endRange: number | null = null;
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();
  @ViewChild('inputRef') private inputRef: ElementRef | null = null;

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({});
  }

  ngOnInit(): void {
    this.initConfigureDate();
    this.class = `${this.fieldName} ${this.class}`;
    const validators = [Validators.minLength(0), Validators.maxLength(250)];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.groupControl?.setValidators(validators);
    this.groupControl?.updateValueAndValidity();
    if (this.groupControl!.value) {
      const formatedDate = _moment(this.groupControl!.value, ['DD/MM/YYYY']);
      this.groupControl!.patchValue(formatedDate);
    }
    this.setEditableStatus();
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  private initConfigureDate(): void {
    const currentYear = new Date().getFullYear();
    if (!this.minDate) {
      this.minDate = new Date(currentYear - 70, 0, 1);
    }
    if (!this.maxDate) {
      this.maxDate = new Date(currentYear + 50, 11, 31);
    }
    if (typeof this.startRange === 'number') {
      const d = new Date();
      d.setDate(d.getDate() - this.startRange);
      this.minDate = d;
    }
    if (typeof this.endRange === 'number') {
      const d = new Date();
      d.setDate(d.getDate() + this.endRange);
      this.maxDate = d;
    }
  }
  public onDateChange(e: any): void {
    const formatedDate = this.groupControl!.value
      ? this.groupControl!.value.format()
      : '';
    this.cstChange.emit(formatedDate);
  }
  public onChange(e: any): void {
    const formatedDate = this.groupControl!.value
      ? this.groupControl!.value.format()
      : '';
    this.cstChange.emit(formatedDate);
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
