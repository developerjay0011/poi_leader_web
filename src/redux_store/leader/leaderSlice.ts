import { USER_INFO } from '@/constants/common';
import { LeaderProfile } from '@/interfaces/leader';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';


interface LeaderState {
  leaderProfile: LeaderProfile;
  followers: any[];
  following: any[];
  trendingLeader: any[];
  notification: any[];
  reasons: any[];
}

let userDetails: any = getCookie(USER_INFO);
userDetails = userDetails && JSON.parse(userDetails);

const initialState: LeaderState = {
  leaderProfile: { id: userDetails?.leaderId },
  followers: [],
  trendingLeader: [],
  following: [],
  notification: [],
  reasons: []
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
    setReason(state, action: any) {
      state.reasons = action.payload
    },
    setFollowers(state, action) {
      state.followers = action.payload;
    },
    setFollowing(state, action) {
      state.following = action.payload;
    },
    setTrendingLeader(state, action: any) {
      state.trendingLeader = action.payload;
    },
    setNotification(state, action: any) {
      state.notification = action.payload;
    },
  },
});

export const leaderActions = leaderSlice.actions;
