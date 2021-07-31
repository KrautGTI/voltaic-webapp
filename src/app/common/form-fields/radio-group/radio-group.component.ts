import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class RadioGroupComponent implements OnInit {
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
  @Input() public options: OptionModel[] = [];
  @Input() public errors: FormFieldError[] = [];
  @Output() public cstChange = new EventEmitter<any>();

  constructor() {}

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
