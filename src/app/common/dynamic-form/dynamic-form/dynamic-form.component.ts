import {
  Component,
  Input,
  OnChanges,
  OnInit,
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
  @Input() public columnSize = 2;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {}

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
}
