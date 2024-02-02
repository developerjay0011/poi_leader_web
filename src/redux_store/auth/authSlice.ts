import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '@/utils/typesUtils'; // Import UserDetails type

interface AuthState {
  userDetails: UserDetails | null;
}

const initialState: AuthState = {
  userDetails: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDetails | null>) {
      state.userDetails = action.payload; // Update userDetails based on the action payload
      console.log(action.payload, "action.payload");

    },
    clearUserData(state) {
      state.userDetails = null; // Clear userDetails
    },
  },
});

export const authActions = authSlice.actions;
