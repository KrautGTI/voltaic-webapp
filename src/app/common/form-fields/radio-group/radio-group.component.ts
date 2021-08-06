import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  FormFieldError,
  OptionConfig,
  OptionModel,
} from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent implements OnInit, OnChanges {
  @Input() public group: FormGroup = new FormGroup({});
  @Input() public label: string = '';
  @Input() public type: string = 'radio';
  @Input() public fieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isFixed: boolean = true;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public options: OptionModel[] | undefined = [];
  @Input() public optionConfig: OptionConfig | undefined = new OptionConfig();
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstChange = new EventEmitter<any>();

  public modifiedOptions: OptionModel[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      if (this.options && Array.isArray(this.options)) {
        if (
          this.optionConfig &&
          this.optionConfig.labelKey &&
          this.optionConfig.valueKey
        ) {
          this.options.forEach((option: any) => {
            const optionModel: OptionModel = new OptionModel();
            optionModel.label =
              this.optionConfig &&
              this.optionConfig.labelKey &&
              option[this.optionConfig.labelKey]
                ? option[this.optionConfig.labelKey]
                : '';
            optionModel.value =
              this.optionConfig &&
              this.optionConfig.valueKey &&
              option[this.optionConfig.valueKey]
                ? option[this.optionConfig.valueKey]
                : '';
            optionModel.checked =
              this.optionConfig &&
              this.optionConfig.checkedKey &&
              option[this.optionConfig.checkedKey]
                ? option[this.optionConfig.checkedKey]
                : false;
            this.modifiedOptions.push(optionModel);
          });
        }
      }
    }
  }
  ngOnInit(): void {
    this.class = `${this.fieldName} ${this.class}`;
  }
  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  public onChange(e: any): void {
    this.cstChange.emit(e.value);
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
