import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OperationCard.module.css';
import { Tip } from 'src/widgets/Tip/Tip';
import { Operation } from 'src/shared/types/Operation';
import { removeOperation } from 'src/entities/Operation/model/operationsSlice';
import { selectIsAdmin } from 'src/entities/Profile/model/selectors';

export type OperationCardProps = Operation & {
  onClick?: () => void;
  index?: number;
};

const OperationCardComponent: FC<OperationCardProps> = ({
  id,
  name,
  category,
  description,
  amount,
  onClick,
  index,
}) => {
  const descRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const isOverflowing = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
    setIsTruncated(isOverflowing);
  }, [description]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeOperation(id));
  };

  return (
    <div className={styles.card} onClick={onClick} style={{ animationDelay: `${(index ?? 0) * 50}ms` }}>
      {isAdmin && (
        <button className={styles.deleteButton} onClick={handleDelete}>
          Удалить
        </button>
      )}
      <div className={styles.info}>
        <h4 className={styles.title}>{name}</h4>
        <div className={styles.category}>{category.name}</div>
        {isTruncated ? (
          <Tip title={description}>
            <div className={styles.description}>{description}</div>
          </Tip>
        ) : (
          <div ref={descRef} className={styles.description}>
            {description}
          </div>
        )}
      </div>
      <div className={styles.amount}>{amount > 0 ? `+${amount}` : amount} ₽</div>
    </div>
  );
};

export const OperationCard = memo(OperationCardComponent);
