
import { createSlice } from '@reduxjs/toolkit';
export interface GroupDetails {
  id: string,
  leaderid: string,
  name: string,
  members: [
    string
  ],
  isactive: true,
  created_date: string

}
interface GroupState {
  groups: GroupDetails[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    storeGroups(state, action) {
      state.groups = Array.isArray(action.payload) ? action.payload : []
    },
  },
});

export const groupActions = groupSlice.actions;
