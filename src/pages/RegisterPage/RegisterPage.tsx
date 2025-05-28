import React from 'react';
import RegisterFormContainer from 'src/features/auth/ui/RegisterFormContainer';
import styles from 'src/pages/RegisterPage/RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Регистрация</h1>
      <RegisterFormContainer />
    </div>
  );
};

export default RegisterPage;
