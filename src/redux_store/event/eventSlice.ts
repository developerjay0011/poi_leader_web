import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventDetails {
  id: string
  leaderid: string
  name: string
  mobile: string
  email: string
  isactive: boolean
  createddate: string
}

interface EventState {
  event: EventDetails[]
}

const init: EventState = {
  event: [],
}

export const eventSlice = createSlice({
  name: 'event',
  initialState: init,
  reducers: {
    storeEvent(state, action: PayloadAction<EventDetails[]>) {
      state.event = action.payload
    },
   
  },
})

export const eventAction = eventSlice.actions
