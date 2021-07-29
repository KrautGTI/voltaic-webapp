import { ErrorType, FieldTypes, FormField } from '../models/util.model';

export const ReportModuleLabels: { [key: string]: FormField } = {
  selectModule: {
    fieldLabel: '',
    fieldName: 'selectModule',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isEditable: true,
    isRequired: true,
    isDisabled: false,
    options: [],
    optionConfig: { labelKey: 'name', valueKey: 'id' },
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Please select a Module.',
      },
    ],
  },
};

export const ModuleData = [
  {
    id: 'Contacts',
    name: 'Contacts',
  },
  {
    id: 'Accounts',
    name: 'Accounts',
  },
  {
    id: 'Deals',
    name: 'Deals',
  },
  {
    id: 'Notes',
    name: 'Notes',
  },
  {
    id: 'Emails',
    name: 'Emails',
  },
  {
    id: 'Users',
    name: 'Users',
  },
];
