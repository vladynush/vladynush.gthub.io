import { Category } from 'src/shared/api/otus';

export type Operation = {
  id: string;
  name: string;
  categoryId: string;
  category?: Category;
  amount: number;
  description?: string;
  date: string;
};
