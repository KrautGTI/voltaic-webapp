import {
  ErrorType,
  FieldTypes,
  FormField,
  ModuleRef,
  RoutingStep,
} from '../models/util.model';

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
  reportType: {
    fieldLabel: '',
    fieldName: 'reportType',
    placeholder: '',
    fieldType: FieldTypes.RADIO,
    isEditable: true,
    isRequired: true,
    isDisabled: false,
    options: [],
    optionConfig: { labelKey: 'name', valueKey: 'id' },
    errors: [
      {
        type: ErrorType.REQUIRED,
        message: 'Please select a Report Type.',
      },
    ],
  },
};

export const ModuleData: ModuleRef[] = [
  {
    id: 'Contacts',
    name: 'Contacts',
    columns: [
      {
        id: '2nd Marketer',
        name: '2nd Marketer',
        active: false,
      },
      {
        id: 'Average Bill(Contact)',
        name: 'Average Bill(Contact)',
        active: false,
      },
      {
        id: 'Average Time Spent(Minutes)',
        name: 'Average Time Spent(Minutes)',
        active: false,
      },
      {
        id: 'Contact Owner',
        name: 'Contact Owner',
        active: false,
      },
      {
        id: 'Created By(Contact)',
        name: 'Created By(Contact)',
        active: false,
      },
      {
        id: 'Created Time(Contact)',
        name: 'Created Time(Contact)',
        active: false,
      },
      {
        id: 'Date Created',
        name: 'Date Created',
        active: false,
      },
      {
        id: 'Date/Time Schedule',
        name: 'Date/Time Schedule',
        active: false,
      },
      {
        id: 'Days Visited',
        name: 'Days Visited',
        active: false,
      },
      {
        id: 'Description(Contact)',
        name: 'Description(Contact)',
        active: false,
      },
      {
        id: 'Email',
        name: 'Email',
        active: false,
      },
      {
        id: 'Emergency Consultant',
        name: 'Emergency Consultant',
        active: false,
      },
      {
        id: 'First Name',
        name: 'First Name',
        active: false,
      },
      {
        id: 'First Page Visited',
        name: 'First Page Visited',
        active: false,
      },
      {
        id: 'First Visit',
        name: 'First Visit',
        active: false,
      },
      {
        id: 'Freedom ID',
        name: 'Freedom ID',
        active: false,
      },
      {
        id: 'Full Name',
        name: 'Full Name',
        active: false,
      },
      {
        id: 'Home Sq Ft',
        name: 'Home Sq Ft',
        active: false,
      },
      {
        id: 'Last Activity Time(Contact)',
        name: 'Last Activity Time(Contact)',
        active: false,
      },
      {
        id: 'Last Name',
        name: 'Last Name',
        active: false,
      },
      {
        id: 'Lead Source',
        name: 'Lead Source',
        active: false,
      },
      {
        id: 'LeadIdCPY',
        name: 'LeadIdCPY',
        active: false,
      },
      {
        id: 'Mailing City',
        name: 'Mailing City',
        active: false,
      },
      {
        id: 'Mailing State',
        name: 'Mailing State',
        active: false,
      },
      {
        id: 'Mailing Street',
        name: 'Mailing Street',
        active: false,
      },
      {
        id: 'Mailing Zip',
        name: 'Mailing Zip',
        active: false,
      },
      {
        id: 'Marketer',
        name: 'Marketer',
        active: false,
      },
      {
        id: 'Modified By(Contact)',
        name: 'Modified By(Contact)',
        active: false,
      },
      {
        id: 'Modified Time(Contact)',
        name: 'Modified Time(Contact)',
        active: false,
      },
      {
        id: 'Most Recent Visit',
        name: 'Most Recent Visit',
        active: false,
      },
      {
        id: 'Number Of Chats',
        name: 'Number Of Chats',
        active: false,
      },
      {
        id: 'Phone(Contact)',
        name: 'Phone(Contact)',
        active: false,
      },
      {
        id: 'Qualified By',
        name: 'Qualified By',
        active: false,
      },
      {
        id: 'Referrer',
        name: 'Referrer',
        active: false,
      },
      {
        id: 'Salutation',
        name: 'Salutation',
        active: false,
      },
      {
        id: 'Spouse Name',
        name: 'Spouse Name',
        active: false,
      },
      {
        id: 'Tag(Contact)',
        name: 'Tag(Contact)',
        active: false,
      },
      {
        id: 'Unsubscribed Mode',
        name: 'Unsubscribed Mode',
        active: false,
      },
      {
        id: 'Unsubscribed Time',
        name: 'Unsubscribed Time',
        active: false,
      },
      {
        id: 'Visitor Score',
        name: 'Visitor Score',
        active: false,
      },
    ],
  },
  {
    id: 'Accounts',
    name: 'Accounts',
    columns: [
      {
        id: 'Account Name',
        name: 'Account Name',
        active: false,
      },
      {
        id: 'Account Number',
        name: 'Account Number',
        active: false,
      },
      {
        id: 'Account Owner',
        name: 'Account Owner',
        active: false,
      },
      {
        id: 'Account Site',
        name: 'Account Site',
        active: false,
      },
      {
        id: 'Account Type',
        name: 'Account Type',
        active: false,
      },
      {
        id: 'Annual Revenue',
        name: 'Annual Revenue',
        active: false,
      },
      {
        id: 'Average Bill',
        name: 'Average Bill',
        active: false,
      },
      {
        id: 'Bill City',
        name: 'Bill City',
        active: false,
      },
      {
        id: 'Bill Code',
        name: 'Bill Code',
        active: false,
      },
      {
        id: 'Bill Country',
        name: 'Bill Country',
        active: false,
      },
      {
        id: 'Bill State',
        name: 'Bill State',
        active: false,
      },
      {
        id: 'Bill Street',
        name: 'Bill Street',
        active: false,
      },
      {
        id: 'Created By',
        name: 'Created By',
        active: false,
      },
      {
        id: 'Created Time',
        name: 'Created Time',
        active: false,
      },
      {
        id: 'Description',
        name: 'Description',
        active: false,
      },
      {
        id: 'Employees',
        name: 'Employees',
        active: false,
      },
      {
        id: 'Fax',
        name: 'Fax',
        active: false,
      },
      {
        id: 'Industry',
        name: 'Industry',
        active: false,
      },
      {
        id: 'Last Activity Time',
        name: 'Last Activity Time',
        active: false,
      },
      {
        id: 'Modified By',
        name: 'Modified By',
        active: false,
      },
      {
        id: 'Modified Time',
        name: 'Modified Time',
        active: false,
      },
      {
        id: 'Ownership',
        name: 'Ownership',
        active: false,
      },
      {
        id: 'Parent Account',
        name: 'Parent Account',
        active: false,
      },
      {
        id: 'Phone',
        name: 'Phone',
        active: false,
      },
      {
        id: 'Rating',
        name: 'Rating',
        active: false,
      },
      {
        id: 'Reschedule Cycle Time',
        name: 'Reschedule Cycle Time',
        active: false,
      },
      {
        id: 'Shipping City',
        name: 'Shipping City',
        active: false,
      },
      {
        id: 'Shipping Code',
        name: 'Shipping Code',
        active: false,
      },
      {
        id: 'Shipping Country',
        name: 'Shipping Country',
        active: false,
      },
      {
        id: 'Shipping State',
        name: 'Shipping State',
        active: false,
      },
      {
        id: 'Shipping Street',
        name: 'Shipping Street',
        active: false,
      },
      {
        id: 'SIC Code',
        name: 'SIC Code',
        active: false,
      },
      {
        id: 'Tag',
        name: 'Tag',
        active: false,
      },
      {
        id: 'Ticker Symbol',
        name: 'Ticker Symbol',
        active: false,
      },
      {
        id: 'Website',
        name: 'Website',
        active: false,
      },
    ],
  },
  {
    id: 'Deals',
    name: 'Deals',
    columns: [],
  },
  {
    id: 'Notes',
    name: 'Notes',
    columns: [
      {
        id: 'Created By(Note)',
        name: 'Created By(Note)',
        active: false,
      },
      {
        id: 'Created Time(Note)',
        name: 'Created Time(Note)',
        active: false,
      },
      {
        id: 'Modified By(Note)',
        name: 'Modified By(Note)',
        active: false,
      },
      {
        id: 'Modified Time(Note)',
        name: 'Modified Time(Note)',
        active: false,
      },
      {
        id: 'Note Content',
        name: 'Note Content',
        active: false,
      },
      {
        id: 'Note Owner',
        name: 'Note Owner',
        active: false,
      },
      {
        id: 'Note Title',
        name: 'Note Title',
        active: false,
      },
    ],
  },
  {
    id: 'Emails',
    name: 'Emails',
    columns: [],
  },
  {
    id: 'Users',
    name: 'Users',
    columns: [],
  },
];

export const RoutingStepsData: RoutingStep[] = [
  {
    stepId: 'moduleInfo',
    stepName: 'Module Information',
    isVisible: true,
  },
  {
    stepId: 'reportType',
    stepName: 'Report Type',
    isVisible: false,
  },
  {
    stepId: 'reportRepresentation',
    stepName: 'Report Representation',
    isVisible: false,
  },
  {
    stepId: 'reportFilter',
    stepName: 'Report Filter',
    isVisible: false,
  },

  {
    stepId: 'basicInfo',
    stepName: 'Basic Information',
    isVisible: false,
  },
];
