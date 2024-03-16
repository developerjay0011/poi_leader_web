import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface CommonState {
  leaderOptions: {
    assemblies: any[];
    designations: any[];
    districts: any[];
    ministries: any[];
    parliamentries: any[];
    politicalparty: any[];
    states: any[];
    categories: any[];
  }
}

const initialState: CommonState = {
  leaderOptions: {
    assemblies: [],
    designations: [],
    districts: [],
    ministries: [],
    parliamentries: [],
    politicalparty: [],
    states: [],
    categories: []
  }
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLeaderOptions(state, action: PayloadAction<any>) {
      state.leaderOptions = action.payload;
    },
    showNotification(state, action: PayloadAction<{ message: string, type: 'success' | 'error' }>) {
      toast[action.payload.type](action.payload.message);
    }
  },
});

export const commonActions = commonSlice.actions;
