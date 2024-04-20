import { deleteCookie, getCookie } from "cookies-next";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '@/utils/typesUtils'; // Import UserDetails type
import { LEADER_ID, TAB_ACCESS, TOKEN_KEY, USER_INFO, USER_TYPE, USER_VERIFY } from "@/constants/common";
// import { deleteToken, getMessaging } from "@firebase/messaging";
// import firebaseApp from "@/utils/firebase/firebase";
import { sendlocalnoti } from "../notification/notification";

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

async function clearFCMToken() {
  try {
    // const messaging = getMessaging(firebaseApp);
    // await deleteToken(messaging);
  } catch (error) {
    console.error('Error clearing FCM token:', error);
  }
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData(state) {
      state.userDetails = null;
    },
    logout(state, action?: any) {
      clearFCMToken()
      state.userDetails = null;
      deleteCookie(TOKEN_KEY);
      deleteCookie(USER_INFO);
      deleteCookie(USER_VERIFY);
      deleteCookie(USER_TYPE);
      deleteCookie(TAB_ACCESS);
      deleteCookie(LEADER_ID);
      if (action.payload != false) {
        sendlocalnoti({
          message: "You have logged out of your account. See you soon for more updates.",
          title: "Logout activity."
        })
      }
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
