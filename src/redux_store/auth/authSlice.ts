import { deleteCookie, getCookie } from "cookies-next";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '@/utils/typesUtils'; // Import UserDetails type
import { TOKEN_KEY, USER_INFO } from "@/constants/common";

interface AuthState {
  userDetails: UserDetails | null;
}

let userDetails: any = getCookie(USER_INFO);
userDetails = userDetails && JSON.parse(userDetails);

const initialState: AuthState = {
  userDetails
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<any | null>) {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    clearUserData(state) {
      state.userDetails = null;
    },
    logout(state) {
      state.userDetails = null;
      deleteCookie(TOKEN_KEY);
      deleteCookie(USER_INFO);
    }
  },
});

export const authActions = authSlice.actions;
