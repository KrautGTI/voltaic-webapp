import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FormFieldError,
  OptionConfig,
  OptionModel,
} from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input() public fieldName: string = '';
  @Input() public class: string = '';
  @Input() public isFixed: boolean = true;
  @Input() public isNewDesing: boolean = false;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public defaultOption: boolean = true;
  @Input() public isOptionStringArray: boolean = true;
  @Input() public options: any = [];
  @Input() public optionConfig: OptionConfig | undefined = new OptionConfig();
  @Input() public errors: FormFieldError[] = [];
  @Input() public isTime: boolean = false;
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();
  @ViewChild('inputRef') private inputRef: ElementRef | null = null;

  public modifiedOptions: OptionModel[] = [];

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({});
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      if (this.options && Array.isArray(this.options)) {
        if (
          this.optionConfig &&
          this.optionConfig.labelKey &&
          this.optionConfig.valueKey
        ) {
          this.options.forEach((option) => {
            const optionModel: OptionModel = new OptionModel();
            if (!this.optionConfig?.additionalLabelKey) {
              optionModel.label =
                this.optionConfig && option[this.optionConfig.labelKey]
                  ? option[this.optionConfig.labelKey]
                  : '';
            } else {
              optionModel.label =
                this.optionConfig &&
                option[this.optionConfig.labelKey] &&
                option[this.optionConfig?.additionalLabelKey]
                  ? option[this.optionConfig.labelKey] +
                    ' ' +
                    option[this.optionConfig?.additionalLabelKey]
                  : '';
            }
            if (this.optionConfig?.mergeValueKey == true) {
              optionModel.value =
                this.optionConfig && option[this.optionConfig.valueKey]
                  ? option[this.optionConfig.labelKey] +
                    '#?#' +
                    option[this.optionConfig.valueKey]
                  : '';
            } else {
              optionModel.value =
                this.optionConfig && option[this.optionConfig.valueKey]
                  ? option[this.optionConfig.valueKey]
                  : '';
            }
            this.modifiedOptions.push(optionModel);
          });
        }
      }
    }
  }

  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    this.groupControl?.setValidators(validators);
    this.groupControl?.updateValueAndValidity();
    this.setEditableStatus();
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
