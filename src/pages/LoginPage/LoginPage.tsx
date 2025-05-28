import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { LoginForm } from 'src/features/auth/ui/LoginForm';
import { login } from 'src/entities/Auth/model/authSlice';
import { loginUser } from 'src/shared/api/otus';
import { ErrorModal } from 'src/shared/ui/ErrorModal/ErrorModal';
import { parseServerErrors } from 'src/shared/lib/parseServerErrors';
import { ServerErrorCode } from 'src/shared/lib/serverErrorCodes';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors }: { setErrors: (e: Record<string, string>) => void }
  ) => {
    try {
      const token = await loginUser(values.email, values.password);
      dispatch(login(token));
      navigate('/operations');
    } catch (err: any) {
      const server = parseServerErrors(err);
      if (server) {
        const fieldErrors: Record<string, string> = {};
        let modalError: string | null = null;

        server.errors.forEach((e) => {
          if (e.extensions.code === ServerErrorCode.INCORRECT_EMAIL_OR_PASSWORD) {
            modalError = 'Неверный email или пароль';
          } else if (e.extensions.code === ServerErrorCode.FIELD_REQUIRED && e.fieldName) {
            fieldErrors[e.fieldName] = 'Обязательное поле';
          } else {
            modalError = e.message;
          }
        });

        if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors);
        if (modalError) setError(modalError);
      } else {
        setError('Ошибка входа. Попробуйте позже.');
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {(formManager) => <LoginForm formManager={formManager} />}
      </Formik>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
};

export default LoginPage;
