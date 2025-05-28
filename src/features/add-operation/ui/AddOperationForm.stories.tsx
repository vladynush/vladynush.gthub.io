import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { AddOperationForm } from './AddOperationForm';
import { OperationFormValues } from '../model/types';
import { validateOperationForm } from 'src/features/add-operation/model/validate';

const meta: Meta<typeof AddOperationForm> = {
  title: 'Features/AddOperationForm',
  component: AddOperationForm,
};

export default meta;
type Story = StoryObj<typeof AddOperationForm>;

export const Default: Story = {
  render: () => {
    const initialValues: OperationFormValues = {
      name: '',
      amount: 0,
      category: '',
      date: '',
    };

    return (
      <Formik<OperationFormValues>
        initialValues={initialValues}
        validate={validateOperationForm}
        onSubmit={(values, { resetForm }) => {
          console.log('Operation submit:', values);
          resetForm();
        }}
      >
        {(fm) => <AddOperationForm formManager={fm} categories={[]} />}
      </Formik>
    );
  },
};
