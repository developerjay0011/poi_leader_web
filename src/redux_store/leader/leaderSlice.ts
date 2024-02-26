import { LeaderProfile } from '@/interfaces/leader';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

interface LeaderState {
  leaderProfile: LeaderProfile;
  followers: any[];
  following: any[];
  trendingLeader: any[];
  notification: any[];
}

let userDetails: any = getCookie("userData");
userDetails = userDetails && JSON.parse(userDetails) || { leader_detail: {} };

const initialState: LeaderState = {
  leaderProfile: {
    id: userDetails?.leaderId
  },
  followers: [],
  trendingLeader: [],
  following: [],
  notification:[]
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
    setFollowing(state, action: PayloadAction<any[]>) {
      state.following = action.payload;
    },
    setTrendingLeader(state, action: PayloadAction<any[]>) {
      state.trendingLeader = action.payload;
    },
    setNotification(state, action: PayloadAction<any[]>) {
      state.notification = action.payload;
    },
  },
});

export const leaderActions = leaderSlice.actions;
