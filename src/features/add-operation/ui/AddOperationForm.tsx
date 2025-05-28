// src/features/add-operation/ui/AddOperationForm.tsx
import React from 'react';
import cn from 'clsx';
import styles from './AddOperationForm.module.css';
import { AddOperationFormProps } from 'src/features/add-operation/model/types';

export const AddOperationForm: React.FC<AddOperationFormProps> = ({ formManager, categories }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, submitCount } = formManager;

  const hasError = (field: keyof typeof values) => (touched[field] || submitCount > 0) && Boolean(errors[field]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Название */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Название
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Что за операция?"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('name') })}
        />
        {hasError('name') && <div className={styles.error}>{errors.name}</div>}
      </div>

      {/* Сумма */}
      <div className={styles.field}>
        <label htmlFor="amount" className={styles.label}>
          Сумма
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="0"
          value={values.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('amount') })}
        />
        {hasError('amount') && <div className={styles.error}>{errors.amount}</div>}
      </div>

      {/* Категория */}
      <div className={styles.field}>
        <label htmlFor="category" className={styles.label}>
          Категория
        </label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('category') })}
        >
          <option value="">-- Выберите категорию --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {hasError('category') && <div className={styles.error}>{errors.category}</div>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Комментарий к операции"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('description') })}
        />
        {hasError('description') && <div className={styles.error}>{errors.description}</div>}
      </div>

      {/* Дата */}
      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          Дата
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('date') })}
        />
        {hasError('date') && <div className={styles.error}>{errors.date}</div>}
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {values.name ? 'Сохранить' : 'Добавить'}
      </button>
    </form>
  );
};
