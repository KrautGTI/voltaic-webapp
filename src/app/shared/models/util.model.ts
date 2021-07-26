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
  isRequired = false;
  isDisabled? = false;
  options? = [];
  errors: FormFieldError[] = [];
}

export class FormFieldGroup {
  gorupId = '';
  gorupName = '';
  gorupType = 'static';
  groupDetails: FormField[] = [];
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
}

export enum ErrorType {
  REQUIRED = 'required',
  MINLENGTH = 'minlength',
  MAXLENGTH = 'maxlength',
  EMAIL = 'email',
  PATTERN = 'pattern',
}
