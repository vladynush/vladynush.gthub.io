// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Profile = {
  email: string;
  commandId: string;
  signUpDate: string;
  isAdmin: boolean;
};

const initialState: Profile | null = null;

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<Profile>) => action.payload,
    clearProfile: () => null,
    updateProfileField: <K extends keyof Profile>(
      state: Profile | null,
      action: PayloadAction<{ key: K; value: Profile[K] }>
    ) => {
      if (state) {
        state[action.payload.key] = action.payload.value;
      }
    },
  },
});

export const { setProfile, clearProfile, updateProfileField } = profileSlice.actions;
export default profileSlice.reducer;
