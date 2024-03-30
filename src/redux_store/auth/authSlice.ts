import { deleteCookie, getCookie } from "cookies-next";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '@/utils/typesUtils'; // Import UserDetails type
import { EMPLOYEE_ID, LEADER_ID, TAB_ACCESS, TOKEN_KEY, USER_INFO, USER_TYPE, USER_VERIFY } from "@/constants/common";

interface AuthState {
  userDetails: UserDetails | null | any;
  leaderData: any
}

let userDetails: any = getCookie(USER_INFO);
userDetails = userDetails && JSON.parse(userDetails);

const initialState: AuthState = {
  userDetails,
  leaderData: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData(state) {
      state.userDetails = null;
    },
    logout(state) {
      state.userDetails = null;
      deleteCookie(TOKEN_KEY);
      deleteCookie(USER_INFO);
      deleteCookie(USER_VERIFY);
      deleteCookie(USER_TYPE);
      deleteCookie(EMPLOYEE_ID);
      deleteCookie(TAB_ACCESS);
      deleteCookie(LEADER_ID);
      window.location.href = '/'
    },
    setUserData(state, action: PayloadAction<any | null>) {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    setLeaderData(state, action: PayloadAction<any | null>) {
      state.leaderData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
