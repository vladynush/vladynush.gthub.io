import React, { FC, memo } from 'react';
import styles from './OperationDetails.module.css';
import { Operation } from 'src/shared/types/Operation';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from 'src/entities/Profile/model/selectors';

export type OperationDetailsProps = Operation & {
  variant?: 'card' | 'modal';
};

const OperationDetailsComponent: FC<OperationDetailsProps> = ({
  name,
  category,
  description,
  amount,
  date,
  variant = 'card',
}) => {
  const isAdmin = useSelector(selectIsAdmin);
  return (
    <div className={`${styles.details} ${styles[variant]}`}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.category}>{category.name}</div>
      <div className={styles.amount}>{amount > 0 ? `+${amount}` : amount} ₽</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.date}>📅 {date}</div>
      {isAdmin && (
        <button className={styles.button} disabled>
          ✏️ Редактировать
        </button>
      )}
    </div>
  );
};

export const OperationDetails = memo(OperationDetailsComponent);
