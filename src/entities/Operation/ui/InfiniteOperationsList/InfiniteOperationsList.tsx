import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Operation } from 'src/shared/types/Operation';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { OperationDetails } from 'src/features/add-operation/ui/OperationDetails';
import { OperationsList } from 'src/entities/Operation/ui/OperationsList/OperationsList';
import styles from './InfiniteOperationsList.module.css';

const BATCH_SIZE = 5;
const INITIAL_SIZE = 10;

export const InfiniteOperationsListComponent: React.FC<{ operations: Operation[] }> = ({ operations }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_SIZE);
  const [selected, setSelected] = useState<Operation | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const visibleOps = operations.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, operations.length));
  }, [operations.length]);

  useEffect(() => {
    if (visibleCount >= operations.length) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    });

    if (observerRef.current) obs.observe(observerRef.current);
    return () => obs.disconnect();
  }, [loadMore, visibleCount, operations.length]);

  const handleSelect = (op: Operation) => setSelected(op);
  const handleClose = () => setSelected(null);

  return (
    <>
      <div className={styles.wrapper}>
        <OperationsList operations={visibleOps} onSelect={handleSelect} />
        {visibleCount < operations.length && <div ref={observerRef} style={{ height: 1 }} />}
      </div>

      <Modal isOpen={!!selected} onClose={handleClose}>
        {selected && <OperationDetails {...selected} />}
      </Modal>
    </>
  );
};

export const InfiniteOperationsList = React.memo(InfiniteOperationsListComponent);
