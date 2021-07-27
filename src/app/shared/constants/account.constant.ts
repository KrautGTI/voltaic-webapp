import { ErrorType, FieldTypes, FormField } from '../models/util.model';

export const AccountInformationLabels: { [key: string]: FormField } = {
  accountOwner: {
    fieldLabel: 'Account Owner',
    fieldName: 'Account_Owner_ID',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isRequired: true,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Account Owner is required.',
      },
    ],
  },
  rating: {
    fieldLabel: 'Rating',
    fieldName: 'Rating',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Rating is required.',
      },
    ],
  },
  accountName: {
    fieldLabel: 'Account Name',
    fieldName: 'Account_Name',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: true,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Account Name is required.',
      },
    ],
  },
  phone: {
    fieldLabel: 'Phone',
    fieldName: 'Phone',
    placeholder: '',
    fieldType: FieldTypes.NUMBER,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Phone is required.',
      },
    ],
  },
  accountSite: {
    fieldLabel: 'Account Site',
    fieldName: 'Account_Site',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Account Site is required.',
      },
    ],
  },
  fax: {
    fieldLabel: 'Fax',
    fieldName: 'Fax',
    placeholder: '',
    fieldType: FieldTypes.NUMBER,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Fax is required.',
      },
    ],
  },
  parentAccount: {
    fieldLabel: 'Parent Account',
    fieldName: 'Parent_Account_ID',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Parent Account is required.',
      },
    ],
  },
  website: {
    fieldLabel: 'Website',
    fieldName: 'Website',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Website is required.',
      },
    ],
  },
  accountNumber: {
    fieldLabel: 'Account Number',
    fieldName: 'Account_Number',
    placeholder: '',
    fieldType: FieldTypes.NUMBER,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Account Number is required.',
      },
    ],
  },
  tickerSymbol: {
    fieldLabel: 'Ticker Symbol',
    fieldName: 'Ticker_Symbol',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Ticker Symbol is required.',
      },
    ],
  },
  accountType: {
    fieldLabel: 'Account Type',
    fieldName: 'Account_Type',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Account Type is required.',
      },
    ],
  },
  ownership: {
    fieldLabel: 'Ownership',
    fieldName: 'Ownership',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Ownership is required.',
      },
    ],
  },
  industry: {
    fieldLabel: 'Industry',
    fieldName: 'Industry',
    placeholder: '',
    fieldType: FieldTypes.SELECT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Industry is required.',
      },
    ],
  },
  employees: {
    fieldLabel: 'Employees',
    fieldName: 'Employees',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Employees is required.',
      },
    ],
  },
  annualRevenue: {
    fieldLabel: 'Annual Revenue',
    fieldName: 'Annual_Revenue',
    placeholder: '',
    fieldType: FieldTypes.NUMBER,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Annual Revenue is required.',
      },
    ],
  },
  sICCode: {
    fieldLabel: 'SIC Code',
    fieldName: 'SIC_Code',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'SIC Code is required.',
      },
    ],
  },
  averageBill: {
    fieldLabel: 'Average Bill',
    fieldName: 'Average_Bill',
    placeholder: '',
    fieldType: FieldTypes.NUMBER,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Average Bill is required.',
      },
    ],
  },
  rescheduleCycleTime: {
    fieldLabel: 'Reschedule Cycle Time',
    fieldName: 'Reschedule_Cycle_Time',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Reschedule Cycle Time is required.',
      },
    ],
  },
};
export const AddressInformationLabels: { [key: string]: FormField } = {
  billingStreet: {
    fieldLabel: 'Billing Street',
    fieldName: 'Billing_Street',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Billing Street is required.',
      },
    ],
  },
  shippingStreet: {
    fieldLabel: 'Shipping Street',
    fieldName: 'Shipping_Street',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Shipping Street is required.',
      },
    ],
  },
  billingCity: {
    fieldLabel: 'Billing City',
    fieldName: 'Billing_City',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Billing City is required.',
      },
    ],
  },
  shippingCity: {
    fieldLabel: 'Shipping City',
    fieldName: 'Shipping_City',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Shipping City is required.',
      },
    ],
  },
  billingState: {
    fieldLabel: 'Billing State',
    fieldName: 'Billing_State',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Billing State is required.',
      },
    ],
  },
  shippingState: {
    fieldLabel: 'Shipping State',
    fieldName: 'Shipping_State',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Shipping State is required.',
      },
    ],
  },
  billingCode: {
    fieldLabel: 'Billing Code',
    fieldName: 'Billing_Code',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Billing Code is required.',
      },
    ],
  },
  shippingCode: {
    fieldLabel: 'Shipping Code',
    fieldName: 'Shipping_Code',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Shipping Code is required.',
      },
    ],
  },
  billingCountry: {
    fieldLabel: 'Billing Country',
    fieldName: 'Billing_Country',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Billing Country is required.',
      },
    ],
  },
  shippingCountry: {
    fieldLabel: 'Shipping Country',
    fieldName: 'Shipping_Country',
    placeholder: '',
    fieldType: FieldTypes.TEXT,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Shipping Country is required.',
      },
    ],
  },
};
export const DescriptionInformationLabels: { [key: string]: FormField } = {
  description: {
    fieldLabel: 'Description',
    fieldName: 'Description',
    placeholder: '',
    fieldType: FieldTypes.TEXTAREA,
    isRequired: false,
    isDisabled: false,
    options: [],
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Description is required.',
      },
    ],
  },
};
