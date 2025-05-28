import { OperationFormValues } from './types';

export function validateOperationForm(values: OperationFormValues) {
  const errors: Partial<Record<keyof OperationFormValues, string>> = {};
  if (!values.name) errors.name = 'Обязательное поле';
  if (!values.category) errors.category = 'Обязательное поле';
  if (!values.date) errors.date = 'Обязательное поле';
  if (values.amount <= 0) errors.amount = 'Введите сумму больше 0';
  return errors;
}
