import { PollDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PollState {
  polls: PollDetails[]
}

const init: PollState = {
  polls: [],
}

export const pollSlice = createSlice({
  initialState: init,
  name: 'polls',
  reducers: {
    storeAllPolls(state, action: PayloadAction<PollDetails[]>) {
      state.polls = action.payload
    },
  },
})
