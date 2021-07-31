export class UserDetailsModel {
  authorize_token: string = '';
  user_name: string = '';
  user_role: string = '';
  user_loginId: string = '';
}

export class FormFieldError {
  type = '';
  message = '';
}

export class FormField {
  fieldLabel = '';
  fieldName = '';
  placeholder = '';
  fieldType = '';
  isEditable = true;
  isRequired = false;
  isDisabled? = false;
  options? = [];
  optionConfig?: OptionConfig = new OptionConfig();
  errors: FormFieldError[] = [];
}
export class OptionConfig {
  labelKey: string = '';
  valueKey: string = '';
}
export class OptionModel {
  label: string = '';
  value: string = '';
  checked?: boolean = false;
}

export class FormFieldGroup {
  gorupId = '';
  gorupName = '';
  gorupType = 'static';
  groupDetails: FormField[] = [];
}
export class ColumnDefs {
  headerName: string = '';
  field: string = '';
  cellStyle?: any = null;
}

export class ModuleColumn {
  id: string = '';
  name: string = '';
  active: boolean = false;
}
export class ModuleRef {
  id: string = '';
  name: string = '';
  columns: ModuleColumn[] = [];
}
export class RoutingStep {
  stepId: string = '';
  stepName: string = '';
  isVisible: boolean = false;
}

export enum FieldTypes {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  SELECT = 'select',
  DATE = 'date',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  LABEL = 'label',
  FILE = 'file',
  PASSWORD = 'password',
  SWITCH = 'switch',
  AUTOSEARCH = 'autosearch',
}

export enum ErrorType {
  REQUIRED = 'required',
  MINLENGTH = 'minlength',
  MAXLENGTH = 'maxlength',
  EMAIL = 'email',
  PATTERN = 'pattern',
}
