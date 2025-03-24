import { TableRowData } from '../../../../types';

export const columns: { label: string; key: keyof TableRowData; width: string }[] = [
  { label: 'Company Sig Date', key: 'companySigDate', width: '114px' },
  { label: 'Company Signature Name', key: 'companySignatureName', width: '146px' },
  { label: 'Document Name', key: 'documentName', width: '126px' },
  { label: 'Document Status', key: 'documentStatus', width: '126px' },
  { label: 'Document Type', key: 'documentType', width: '164px' },
  { label: 'Employee Number', key: 'employeeNumber', width: '126px' },
  { label: 'Employee Sig Date', key: 'employeeSigDate', width: '114px' },
  { label: 'Employee Signature Name', key: 'employeeSignatureName', width: '146px' },
  { label: 'Actions', key: 'actions', width: '88px' },
];
