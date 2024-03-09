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
  dashboardevents: any
}

const init: EventState = {
  event: [],
  dashboardevents: []
}

export const eventSlice = createSlice({
  name: 'event',
  initialState: init,
  reducers: {
    storeEvent(state, action) {
      state.event = action.payload
    },
    storeDashboardevents(state, action) {
      state.dashboardevents = action.payload
    },
  },
})

export const eventAction = eventSlice.actions
