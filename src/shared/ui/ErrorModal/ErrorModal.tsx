import React from 'react';
import { Modal } from '../Modal/Modal';
import styles from './ErrorModal.module.css';

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <Modal isOpen onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Ошибка</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          Ок
        </button>
      </div>
    </Modal>
  );
};
