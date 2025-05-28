import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'src/shared/ui/Layout/Layout';
import Button from 'src/shared/ui/Button/Button';
import { RootState } from 'src/app/store/store';
import { updateProfileField } from 'src/entities/Profile/model/profileSlice';
import { updateProfileFieldApi } from 'src/shared/api/otus';
import { EditableField } from 'src/shared/ui/EditableField/EditableField';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { ChangePasswordModal } from 'src/features/profile-form/ui/ChangePasswordModal';
import styles from './ProfilePage.module.css';

const ProfilePage: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const dispatch = useDispatch();
  if (!profile) {
    return <Layout>Профиль не найден</Layout>;
  }

  const handleSaveField = async (key: 'email' | 'commandId', value: string) => {
    await updateProfileFieldApi(key, value);
    dispatch(updateProfileField({ key, value }));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Профиль</h1>

        <EditableField label="Email" value={profile.email} onSave={(value) => handleSaveField('email', value)} />

        <EditableField
          label="ID команды"
          value={profile.commandId}
          onSave={(value) => handleSaveField('commandId', value)}
        />

        <div className={styles.field}>
          <label className={styles.label}>Дата регистрации</label>
          <div>{new Date(profile.signUpDate).toLocaleString('ru-RU')}</div>
        </div>

        {profile.isAdmin && <p className={styles.admin}>Вы администратор</p>}

        <Button className={styles.passwordButton} onClick={() => setShowPasswordModal(true)}>
          Сменить пароль
        </Button>

        {showPasswordModal && (
          <Modal isOpen onClose={() => setShowPasswordModal(false)}>
            <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
