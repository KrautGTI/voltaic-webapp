import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  @Input() public isRequired: boolean = false;
  @Input() public defaultOption: boolean = true;
  @Input() public isOptionStringArray: boolean = true;
  @Input() public options: any = [];
  @Input() public optionConfig: OptionConfig | undefined = new OptionConfig();
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();

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
            optionModel.label =
              this.optionConfig && option[this.optionConfig.labelKey]
                ? option[this.optionConfig.labelKey]
                : '';
            optionModel.value =
              this.optionConfig && option[this.optionConfig.valueKey]
                ? option[this.optionConfig.valueKey]
                : '';
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
