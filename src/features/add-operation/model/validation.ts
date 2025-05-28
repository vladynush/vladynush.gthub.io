import * as Yup from 'yup';

export const operationFormSchema = Yup.object({
  name: Yup.string().required('Название обязательно').min(2, 'Слишком короткое название'),

  amount: Yup.number()
    .typeError('Введите сумму')
    .positive('Сумма должна быть положительной')
    .required('Сумма обязательна'),

  category: Yup.string().required('Категория обязательна'),

  date: Yup.string()
    .required('Дата обязательна')
    .matches(/\d{4}-\d{2}-\d{2}/, 'Некорректный формат даты'),
});
