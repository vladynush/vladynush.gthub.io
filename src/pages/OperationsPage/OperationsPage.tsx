import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'src/shared/ui/Button/Button';
import Layout from 'src/shared/ui/Layout/Layout';
import styles from './OperationsPage.module.css';
import { InfiniteOperationsList } from 'src/entities/Operation/ui/InfiniteOperationsList/InfiniteOperationsList';
import { getOperations } from 'src/shared/api/otus';
import { Operation } from 'src/shared/types/Operation';

export const OperationsPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    getOperations()
      .then(setOperations)
      .catch((err) => {
        console.error('Ошибка загрузки операций:', err);
        setOperations([]);
      });
  }, []);

  const openModal = (id?: string) =>
    navigate(`/operations/${id ?? 'new'}`, {
      state: {
        backgroundLocation: location,
        fromOperationsPage: true,
      },
    });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Операции</h1>
          <Button className={styles.createButton} onClick={() => openModal()}>
            Добавить
          </Button>
        </div>
        <InfiniteOperationsList operations={operations} />
      </div>
    </Layout>
  );
};
