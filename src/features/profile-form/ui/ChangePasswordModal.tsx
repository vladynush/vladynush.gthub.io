import React, { useState } from 'react';
import Input from 'src/shared/ui/Input/Input';
import Button from 'src/shared/ui/Button/Button';
import { changePasswordApi } from 'src/shared/api/otus';
import styles from './ChangePasswordModal.module.css';

type Props = {
  onClose: () => void;
};

export const ChangePasswordModal: React.FC<Props> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await changePasswordApi({ password, newPassword });
      onClose();
    } catch (err: any) {
      const message =
        err?.response?.data?.errors?.[0]?.message || err?.response?.data?.message || 'Не удалось сменить пароль';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Сменить пароль</h3>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Текущий пароль"
        required
      />
      <Input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Новый пароль"
        required
      />
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохраняю...' : 'Сменить'}
        </Button>
        <Button type="button" onClick={onClose} className={styles.cancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};
