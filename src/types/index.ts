export interface TableRowData {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: number;
  employeeSigDate: string;
  employeeSignatureName: string;
  actions: string;
}

export type EditedData = Omit<Partial<TableRowData>, 'actions'> & {
  documentStatus: string;
  documentName: string;
  companySigDate: string;
  employeeSigDate: string;
};
