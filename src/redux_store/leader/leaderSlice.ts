import { LeaderProfile } from '@/interfaces/leader';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeaderState {
  leaderProfile: LeaderProfile;
  followers: any[];
}

const initialState: LeaderState = {
  leaderProfile: {},
  followers: []
};

export const leaderSlice = createSlice({
  name: 'leader',
  initialState,
  reducers: {
    setLeaderProfile(state, action: PayloadAction<LeaderProfile>) {
      state.leaderProfile = action.payload;
    },
    setFollowers(state, action: PayloadAction<any[]>) {
      state.followers = action.payload;
    },
  },
});

export const leaderActions = leaderSlice.actions;
