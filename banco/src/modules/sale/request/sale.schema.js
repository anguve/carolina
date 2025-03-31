import * as yup from 'yup';

export const saleSchema = yup.object({
  product: yup
    .string()
    .oneOf(['Consumer Credit', 'Free Investment Payroll Loan', 'Credit Card'])
    .required(),
  requestedLimit: yup.string().max(20).required(),
  franchise: yup.string().oneOf(['AMEX', 'VISA', 'MASTERCARD']).nullable(),
  rate: yup.number().min(0).max(99.99).nullable(),
  status: yup.string().oneOf(['Open', 'In Progress', 'Completed']).required()
});
