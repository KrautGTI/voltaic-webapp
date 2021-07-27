import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
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
  @Input() public placeholder: string = '';
  @Input() public class: string = '';
  @Input() public isRequired: boolean = false;
  @Input() public optionConfig: OptionConfig | undefined = new OptionConfig();
  @Input() public errors: FormFieldError[] = [];
  @Input('searchValues') public searchValues$: any = [];
  @Output() public cstBlur = new EventEmitter<any>();
  @Output() public cstChange = new EventEmitter<any>();
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
  }

  get groupControl(): AbstractControl | null {
    return this.group.get(this.fieldName);
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
    this.groupControl?.patchValue(label);
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
}
