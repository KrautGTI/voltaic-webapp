import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/models/field-config.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() public fields: FieldConfig[] = [];
  @Input() public form: FormGroup = new FormGroup({});
  @Input() public formGroupName: string = '';
  @Input() public columnSize = 2;
  @Output() public changeFields = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));
      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const field = this.fields.find((control) => control.name === name);
          if (field) this.form.addControl(name, this.createControl(field));
        });
    }
  }

  ngOnInit(): void {}
  get controls() {
    return this.fields.filter(({ fieldType }) => fieldType !== 'button');
  }
  public getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }
  private createControl(field: FieldConfig): any {
    const { disabled, validation, value } = field;
    return this.fb.control({ disabled, value }, validation);
  }
  public onChangeFields(data: any, field: FieldConfig): void {
    const fieldN: any = {
      ...field,
      selectedValue: data,
      formGroupName: this.formGroupName,
    };
    this.changeFields.emit(fieldN);
  }
}
