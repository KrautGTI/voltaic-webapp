import { ErrorType, FieldTypes, FormField } from '../models/util.model';

export const ContactInfoLabels: { [key: string]: FormField } = {
  firstNamePrimary: {
    fieldLabel: 'Primary Homeowner First Name',
    fieldName: 'Primary_Owner_1',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.TEXT,
    isEditable: false,
    isRequired: true,
    isDisabled: false,
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'This field is required.',
      },
    ],
  },
  lastNamePrimary: {
    fieldLabel: 'Last Name',
    fieldName: 'Last_Name_Primary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.TEXT,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  phonePrimary: {
    fieldLabel: 'Phone',
    fieldName: 'Phone_Primary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.NUMBER,
    isEditable: false,
    isRequired: true,
    isDisabled: false,
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'This field is required.',
      },
    ],
  },
  emailPrimary: {
    fieldLabel: 'Email',
    fieldName: 'Email_Primary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.EMAIL,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  firstNameSecondary: {
    fieldLabel: 'Secondary Homeowner First Name',
    fieldName: 'Secondary_Owner_1',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.TEXT,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  lastNameSecondary: {
    fieldLabel: 'Last Name',
    fieldName: 'Last_Name_Secondary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.TEXT,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  phoneSecondary: {
    fieldLabel: 'Phone',
    fieldName: 'Phone_Secondary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.NUMBER,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'This field is required.',
      },
    ],
  },
  emailSecondary: {
    fieldLabel: 'Email',
    fieldName: 'Email_Secondary',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.EMAIL,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  notes: {
    fieldLabel: 'Notes',
    fieldName: 'Notes',
    placeholder: '',
    associatedfieldName: '',
    fieldType: FieldTypes.TEXTAREA,
    isEditable: false,
    isRequired: false,
    isDisabled: false,
    errors: [],
  },
  
};

export const UtilityInfoLabels: { [key: string]: FormField } = {
    utilityCompany: {
        fieldLabel: 'Utility Company',
        fieldName: 'Utility_Company',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: false,
        isDisabled: true,
        options: [],
        optionConfig: { labelKey: 'name', valueKey: 'name' },
        errors: []
      },
      utilityBillOne: {
        fieldLabel: 'Utility Bill 1',
        fieldName: 'utility_bill_1',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.FILE,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
      },
      utilityBillTwo: {
        fieldLabel: 'Utility Bill 2',
        fieldName: 'utility_bill_2',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.FILE,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
      },
      annualBill: {
        fieldLabel: 'Annual Bill ($)',
        fieldName: 'Annual_Bill',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.TEXT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
      },
      annualUsage: {
        fieldLabel: 'Annual Usage (kWh)',
        fieldName: 'Annual_Usage',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.TEXT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
      }
};

export const LeadInfoLabels: { [key: string]: FormField } = {
    leadSource: {
        fieldLabel: 'Lead Source',
        fieldName: 'Lead_Source',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'name', valueKey: 'name' },
        errors: []
    },
    leadGenerator: {
      fieldLabel: 'Lead Generator',
      fieldName: 'Lead_Generator',
      placeholder: '',
      associatedfieldName: '',
      fieldType: FieldTypes.SELECT,
      isEditable: false,
      isRequired: false,
      isDisabled: false,
      options: [],
      optionConfig: { labelKey: 'name', valueKey: 'name' },
      errors: []
    },
    salesRep: {
      fieldLabel: 'Sales Rep',
      fieldName: 'Sales_Rep',
      placeholder: '',
      associatedfieldName: '',
      fieldType: FieldTypes.SELECT,
      isEditable: false,
      isRequired: false,
      isDisabled: false,
      options: [],
      optionConfig: { labelKey: 'name', valueKey: 'name' },
      errors: []
    },
    primaryLanguage: {
      fieldLabel: 'Primary Language',
      fieldName: 'Primary_Language',
      placeholder: '',
      associatedfieldName: '',
      fieldType: FieldTypes.SELECT,
      isEditable: false,
      isRequired: false,
      isDisabled: false,
      options: [],
      optionConfig: { labelKey: 'name', valueKey: 'name' },
      errors: []
    },
    homeType: {
      fieldLabel: 'Home Type',
      fieldName: 'Home_Type',
      placeholder: '',
      associatedfieldName: '',
      fieldType: FieldTypes.SELECT,
      isEditable: false,
      isRequired: false,
      isDisabled: false,
      options: [],
      optionConfig: { labelKey: 'name', valueKey: 'name' },
      errors: []
    },
    hoa: {
      fieldLabel: 'HOA',
      fieldName: 'HOA',
      placeholder: '',
      associatedfieldName: '',
      fieldType: FieldTypes.SELECT,
      isEditable: false,
      isRequired: false,
      isDisabled: false,
      options: [],
      optionConfig: { labelKey: 'name', valueKey: 'name' },
      errors: []
    },
};

export const ScheduleAppointmentLabels: { [key: string]: FormField } = {
    date: {
        fieldLabel: 'Date',
        fieldName: 'Date',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.DATE,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
      },
    time: {
        fieldLabel: 'Time',
        fieldName: 'Time',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'value' },
        errors: []
      },
      
};