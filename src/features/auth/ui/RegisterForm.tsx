import React from 'react';
import cn from 'clsx';
import { RegisterFormProps } from '../model/types';
import styles from './RegisterForm.module.css';
import { Link } from 'react-router-dom';

export const RegisterForm: React.FC<RegisterFormProps> = ({ formManager }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, submitCount } = formManager;

  const hasError = (field: keyof typeof values) => (touched[field] || submitCount > 0) && Boolean(errors[field]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('email') })}
        />
        {hasError('email') && <div className={styles.error}>{errors.email}</div>}
      </div>

      {/* Password */}
      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('password') })}
        />
        {hasError('password') && <div className={styles.error}>{errors.password}</div>}
      </div>

      {/* Confirm Password */}
      <div className={styles.field}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Повторите пароль
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(styles.input, { [styles.error]: hasError('confirmPassword') })}
        />
        {hasError('confirmPassword') && <div className={styles.error}>{errors.confirmPassword}</div>}
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        Зарегистрироваться
      </button>

      <div className={styles.loginLink}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </form>
  );
};
