import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { AddOperationForm } from './AddOperationForm';
import { Category, createOperation, getCategories, updateOperation } from 'src/shared/api/otus';
import { OperationFormValues } from 'src/features/add-operation/model/types';

export const OperationFormModal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id?: string }>();
  const isNew = !id || id === 'new';

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => {
        console.error('Ошибка загрузки категорий:', err);
        setCategories([]);
      });
  }, []);

  const initialValues: OperationFormValues = {
    name: '',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  };

  const handleSubmit = async (values: OperationFormValues, helpers: any) => {
    try {
      const { category, ...rest } = values;
      const operationType = rest.amount > 0 ? 'Profit' : 'Cost';

      const payload = {
        ...rest,
        categoryId: category,
        type: operationType,
      };

      if (isNew) {
        await createOperation(payload);
      } else if (id) {
        await updateOperation(id, payload);
      }

      const cameFromOperations = location.state?.fromOperationsPage;

      if (cameFromOperations) {
        navigate('/operations', { replace: true });
        window.location.reload();
      } else {
        navigate(-1);
      }
    } catch (error: any) {
      console.error('Ошибка при сохранении:', error);
      const apiError = error?.response?.data?.errors?.[0]?.message ?? 'Неизвестная ошибка при сохранении';
      alert(apiError);
      helpers.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen onClose={() => navigate(-1)}>
      <Formik<OperationFormValues>
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Record<keyof OperationFormValues, string>> = {};
          if (!values.name) errors.name = 'Название обязательно';
          if (!values.amount && values.amount !== 0) errors.amount = 'Сумма обязательна';
          if (!values.category) errors.category = 'Категория обязательна';
          if (!values.date) errors.date = 'Дата обязательна';
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(formManager) => <AddOperationForm formManager={formManager} categories={categories} />}
      </Formik>
    </Modal>
  );
};
