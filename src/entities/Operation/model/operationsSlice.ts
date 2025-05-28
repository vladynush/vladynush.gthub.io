// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operation } from 'src/shared/types/Operation';

const initialState: Operation[] = (() => {
  const raw = localStorage.getItem('operations');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
})();

function saveToLocalStorage(ops: Operation[]) {
  localStorage.setItem('operations', JSON.stringify(ops));
}

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<Operation>) => {
      const updated = [...state, action.payload];
      saveToLocalStorage(updated);
      return updated;
    },

    updateOperation: (state, action: PayloadAction<Operation>) => {
      const updated = state.map((op) => (op.id === action.payload.id ? action.payload : op));
      saveToLocalStorage(updated);
      return updated;
    },

    clearOperations: () => {
      localStorage.removeItem('operations');
      return [];
    },

    removeOperation: (state, action: PayloadAction<string>) => {
      const updated = state.filter((op) => op.id !== action.payload);
      saveToLocalStorage(updated);
      return updated;
    },
  },
});

export const { addOperation, updateOperation, clearOperations, removeOperation } = operationsSlice.actions;
export default operationsSlice.reducer;
