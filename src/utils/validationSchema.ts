import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  documentStatus: yup.string().required('Status is required'),
  documentName: yup.string().required('Name is required'),

  companySigDate: yup
    .string()
    .transform((value) =>
      value instanceof Date ? value.toISOString().split('T')[0] : String(value)
    )
    .default(''),

  employeeSigDate: yup
    .string()
    .transform((value) =>
      value instanceof Date ? value.toISOString().split('T')[0] : String(value)
    )
    .default(''),

  companySignatureName: yup.string(),
  employeeNumber: yup.number().min(1),
  employeeSignatureName: yup.string(),
  documentType: yup.string(),
});
