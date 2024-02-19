import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  leaderOptions: {
    assemblies: any[];
    designations: any[];
    districts: any[];
    ministries: any[];
    parliamentries: any[];
    politicalparty: any[];
    states: any[];
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
  }
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLeaderOptions(state, action: PayloadAction<any>) {
      state.leaderOptions = action.payload;
    }
  },
});

export const commonActions = commonSlice.actions;
