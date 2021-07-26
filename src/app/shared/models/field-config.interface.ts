import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormField, FormFieldError } from './util.model';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options: any;
  fieldType: string;
  validation: ValidatorFn[];
  value: string;
  placeholder: string;
  isRequired: boolean;
  readonly: boolean;
  errors: FormFieldError[];
  minDate?: Date;
  maxDate?: Date;
  startRange?: number;
  endRange?: number;
}

export class DynamicFieldGroup {
  formGrp: FormGroup = new FormGroup({});
  fieldConfigs: FieldConfig[] = [];
  fieldGroups: FormField[] = [];
}
