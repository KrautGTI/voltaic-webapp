import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/models/field-config.interface';
import {
  ErrorType,
  FieldTypes,
  FormField,
  FormFieldError,
} from 'src/app/shared/models/util.model';
import { DynamicFormModule } from './dynamic-form.module';

@Injectable({
  providedIn: DynamicFormModule,
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  public createFieldConfig(
    fields: FormField[],
    dynamicOptionMap: { [key: string]: any }
  ): FieldConfig[] {
    return fields.map((elem: FormField) => {
      const validators: any = [];
      const errors: FormFieldError[] = [];
      let options: any = [];
      if (elem.isRequired) {
        validators.push(Validators.required);
        const error = new FormFieldError();
        error.type = ErrorType.REQUIRED;
        error.message = `${elem.fieldLabel} is required.`;
        errors.push(error);
      }
      if (elem.fieldType.toLowerCase() === FieldTypes.EMAIL) {
        const emailRegex = '^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';
        validators.push(Validators.pattern(emailRegex));
        const error = new FormFieldError();
        error.type = ErrorType.PATTERN;
        error.message = `Please enter valid email.`;
        errors.push(error);
      }
      if (elem.fieldType.toLowerCase() === FieldTypes.SELECT) {
        if (dynamicOptionMap[elem.fieldName]) {
          options = [...dynamicOptionMap[elem.fieldName]];
        } else {
          options = elem.options ? elem.options : [];
        }
      }
      const retCong: FieldConfig = {
        disabled: elem.isDisabled,
        label: elem.fieldLabel,
        name: elem.fieldName,
        options: options,
        placeholder: elem.placeholder,
        fieldType: elem.fieldType,
        validation: validators,
        value: '',
        errors: errors,
        readonly: false,
        isRequired: elem.isRequired,
      };
      return retCong;
    });
  }
  public createGroup(fieldConfigs: FieldConfig[]): FormGroup {
    const group = this.fb.group({});
    fieldConfigs.forEach((control) => {
      return group.addControl(control.name, this.createControl(control));
    });
    return group;
  }
  private createControl(field: FieldConfig): any {
    const { disabled, validation, value } = field;
    return this.fb.control({ disabled, value }, validation);
  }
}
