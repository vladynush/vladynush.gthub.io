import React, { useState } from 'react';
import { OperationsList } from './OperationsList';
import { Operation } from 'src/shared/types/Operation';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { OperationDetails } from '../../../../features/add-operation/ui/OperationDetails';

export default {
  title: 'Finance/OperationsList',
  component: OperationsList,
};

const mockOperations: Operation[] = [
  {
    id: '1',
    name: 'Кофе',
    categoryId: 'Еда',
    amount: -250,
    description: 'Утренний капучино',
    date: '2024-04-01',
  },
  {
    id: '2',
    name: 'Зарплата',
    categoryId: 'Доход',
    amount: 120000,
    description: 'Основной доход',
    date: '2024-04-05',
  },
];

export const ClickToShowDetails = () => {
  const [selected, setSelected] = useState<Operation | null>(null);

  return (
    <>
      <OperationsList operations={mockOperations} onSelect={(op) => setSelected(op)} />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        <OperationDetails {...selected} variant="modal" />
      </Modal>
    </>
  );
};
