import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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
import { Observable } from 'rxjs';
import { FormFieldError, OptionConfig } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public label: string = '';
  @Input() public type: string = 'text';
  @Input() public fieldName: string = '';
  @Input() public associatedfieldName: string = '';
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isNewDesing: boolean = false;
  @Input() public isFixed: boolean = true;
  @Input() public isEditable: boolean = true;
  @Input() public isRequired: boolean = false;
  @Input() public optionConfig: OptionConfig | undefined = new OptionConfig();
  @Input() public errors: FormFieldError[] = [];
  @Input('searchValues') public searchValues$: any = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();
  @ViewChild('inputRef') private inputRef: ElementRef | null = null;
  public showModal: boolean = true;
  private wasInside = false;

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
    this.setEditableStatus();
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
  }
  get associatedControl(): AbstractControl | null {
    return this.group.get(this.associatedfieldName);
  }
  get searchObs$(): Observable<[]> {
    return this.searchValues$;
  }
  public onBlur(e: any): void {
    this.cstBlur.emit(e.target.value);
  }
  public onChange(e: any): void {
    this.showModal = true;
    this.cstChange.emit(e.target.value);
  }
  public onSelectValue(searchVal: any): void {
    const label =
      searchVal && searchVal[this.optionConfig!.labelKey]
        ? searchVal[this.optionConfig!.labelKey]
        : '';
    const value =
      searchVal && searchVal[this.optionConfig!.valueKey]
        ? searchVal[this.optionConfig!.valueKey]
        : '';
    console.log('label=', label, '==value==', value);
    this.groupControl?.patchValue(label);
    if (this.associatedfieldName && this.associatedControl) {
      this.associatedControl.patchValue(value);
    }
    this.showModal = false;
  }

  @HostListener('click')
  private clickInside(): void {
    this.wasInside = true;
  }
  @HostListener('document:click')
  private clickOutside(): void {
    if (!this.wasInside) {
      this.showModal = false;
    }
    this.wasInside = false;
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
