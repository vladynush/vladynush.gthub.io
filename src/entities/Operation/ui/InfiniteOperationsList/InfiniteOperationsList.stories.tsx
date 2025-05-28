import React from 'react';
import { InfiniteOperationsList } from './InfiniteOperationsList';

export default {
  title: 'Finance/InfiniteOperationsList',
  component: InfiniteOperationsList,
};

export const Default = () => <InfiniteOperationsList operations={[]} />;
