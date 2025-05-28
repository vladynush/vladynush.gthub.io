import { RootState } from 'src/app/store/store';

export const selectProfile = (state: RootState) => state.profile;
export const selectIsAdmin = (state: RootState) => state.profile?.isAdmin === true;
