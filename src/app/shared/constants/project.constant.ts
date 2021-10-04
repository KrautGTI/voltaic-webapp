import { ErrorType, FieldTypes, FormField } from '../models/util.model';

export const SaleInfoLabels: { [key: string]: FormField } = {
    salesType: {
        fieldLabel: 'Type (Archive)',
        fieldName: 'sales_type',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'id' },
        errors: [{
            type: ErrorType.REQUIRED,
            message: 'This field is required.',
        }]
    },
    saleDate: {
        fieldLabel: 'Sale Date',
        fieldName: 'sale_date',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.DATE,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        errors: []
    },
    systemSize: {
        fieldLabel: 'System Size',
        fieldName: 'system_size',
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
        }
        ],
    },
    paymentMethod: {
        fieldLabel: 'Payment Method',
        fieldName: 'payment_method',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'id' },
        errors: []
    }
};

export const OtherInfoLabels: { [key: string]: FormField } = {
    utilityCompany: {
        fieldLabel: 'Utility Company',
        fieldName: 'company',
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
      hoa: {
        fieldLabel: 'HOA',
        fieldName: 'hoa',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: false,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'id' },
        errors: []
      }
  };