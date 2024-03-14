import { createSlice } from '@reduxjs/toolkit'

interface LocationState {
  location: any[]
}

const init: LocationState = {
  location: [],
}

export const locationSlice = createSlice({
  name: 'location',
  initialState: init,
  reducers: {
    storeLocation(state, action) {
      state.location = action.payload
    },
  },
})

export const locationAction = locationSlice.actions
