
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface PollDetails {
  id: string,
  leaderid: string,
  title: string,
  polltype: string,
  access: string,
  view_access: string,
  publish_date: string,
  close_date: string,
  poll_options: [
    {
      id: string,
      image: string,
      text: string,
      votes: number
    }
  ],
  votes_by: [
    {
      userid: string,
      usertype: string,
      optionid: string
    }
  ],
  created_date: string,
  created_by: string,
  created_by_type: string,
  modified_date: string,
  modified_by: string,
  modified_by_type: string
}
interface PollState {
  poll: PollDetails[];
}

const initialState: PollState = {
  poll: [],
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    storePoll(state, action: PayloadAction<PollDetails[]>) {
      state.poll = action.payload
    },
  },
});

export const pollActions = pollSlice.actions;
