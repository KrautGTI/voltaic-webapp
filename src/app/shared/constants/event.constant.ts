import { ErrorType, FieldTypes, FormField } from '../models/util.model';

export const CreateEvent: { [key: string]: FormField } = {
    task: {
        fieldLabel: 'Task',
        fieldName: 'task',
        placeholder: 'Select Task',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'name', valueKey: 'name'},
        errors: []
    },
    assignedTo : {
        fieldLabel: 'Assigned To',
        fieldName: 'assignedTo',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'name', valueKey: 'name' },
        errors: []
    },
    status : {
        fieldLabel: 'Status',
        fieldName: 'status',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'value' },
        errors: []
    },
    date : {
        fieldLabel: 'Date',
        fieldName: 'date',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.DATE,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'name', valueKey: 'name' },
        errors: []
    },
    time : {
        fieldLabel: 'Time',
        fieldName: 'time',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.SELECT,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        options: [],
        optionConfig: { labelKey: 'value', valueKey: 'value' },
        errors: []
    },
    notes: {
        fieldLabel: 'Notes',
        fieldName: 'notes',
        placeholder: '',
        associatedfieldName: '',
        fieldType: FieldTypes.TEXTAREA,
        isEditable: false,
        isRequired: true,
        isDisabled: false,
        errors: [],
      }
};