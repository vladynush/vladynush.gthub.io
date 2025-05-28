import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from 'src/shared/api/otus';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await registerUser(email, password);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
