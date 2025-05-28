import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './EditableField.module.css';

type Props = {
  label: string;
  value: string;
  onSave: (newValue: string) => Promise<void> | void;
};

export const EditableField: React.FC<Props> = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (tempValue === value) return setEditing(false);
    setIsSaving(true);
    try {
      await onSave(tempValue);
      setEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>

      {!editing ? (
        <div className={styles.readBlock}>
          <span className={styles.value}>{value || '—'}</span>
          <Button className={styles.button} onClick={() => setEditing(true)}>
            Редактировать
          </Button>
        </div>
      ) : (
        <div className={styles.editBlock}>
          <div className={styles.inputWrapper}>
            <Input value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
          </div>
          <Button className={styles.button} onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Сохраняю...' : 'Сохранить'}
          </Button>
          <Button className={styles.button} onClick={handleCancel} disabled={isSaving}>
            Отмена
          </Button>
        </div>
      )}
    </div>
  );
};
