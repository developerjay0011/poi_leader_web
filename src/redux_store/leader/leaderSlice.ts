import { LeaderProfile } from '@/interfaces/leader';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

interface LeaderState {
  leaderProfile: LeaderProfile;
  followers: any[];
}

let userDetails: any = getCookie("userData");
userDetails = userDetails && JSON.parse(userDetails) || { leader_detail: {} };

const initialState: LeaderState = {
  leaderProfile: {
    ...userDetails.leader_detail
  },
  followers: []
};

export const leaderSlice = createSlice({
  name: 'leader',
  initialState,
  reducers: {
    setLeaderProfile(state, action: PayloadAction<LeaderProfile>) {
      state.leaderProfile = {
        ...state.leaderProfile,
        ...action.payload
      };
    },
    setFollowers(state, action: PayloadAction<any[]>) {
      state.followers = action.payload;
    },
  },
});

export const leaderActions = leaderSlice.actions;
