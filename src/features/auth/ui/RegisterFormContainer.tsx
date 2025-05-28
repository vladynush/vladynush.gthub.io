import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RegisterForm } from './RegisterForm';
import { useNavigate } from 'react-router-dom';
import { ErrorModal } from 'src/shared/ui/ErrorModal/ErrorModal';
import { parseServerErrors } from 'src/shared/lib/parseServerErrors';
import { ServerErrorCode } from 'src/shared/lib/serverErrorCodes';
import { registerThunk } from 'src/entities/Auth/model/authThunks';
import { useAppDispatch } from 'src/shared/lib/hooks/useApiDispatch';

const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Невалидный email').required('Обязательно'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательно'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли не совпадают')
      .required('Обязательно'),
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues, { setErrors, setSubmitting }: any) => {
    try {
      const action = await dispatch(registerThunk({ email: values.email, password: values.password }));

      if (registerThunk.fulfilled.match(action)) {
        navigate('/profile');
      } else if (registerThunk.rejected.match(action)) {
        const server = parseServerErrors(action.payload);
        if (server) {
          const fieldErrors: Record<string, string> = {};
          let modalError: string | null = null;

          server.errors.forEach((e) => {
            if (e.extensions.code === ServerErrorCode.ACCOUNT_ALREADY_EXIST) {
              fieldErrors.email = 'Пользователь уже существует';
            } else if (e.extensions.code === ServerErrorCode.FIELD_REQUIRED && e.fieldName) {
              fieldErrors[e.fieldName] = 'Обязательное поле';
            } else {
              modalError = e.message;
            }
          });

          if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors);
          if (modalError) setError(modalError);
        } else {
          setError('Ошибка регистрации. Попробуйте позже.');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formManager) => <RegisterForm formManager={formManager} />}
      </Formik>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
};

export default RegisterFormContainer;
