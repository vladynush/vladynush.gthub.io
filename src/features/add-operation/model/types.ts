import { FormProps } from 'src/shared/types/FormProps';
import { Category } from 'src/shared/api/otus';

export interface OperationFormValues {
  name: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

export interface AddOperationFormProps extends FormProps<OperationFormValues> {
  categories: Category[];
}
