import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DirectoryDetails {
  id: string
  leaderid: string
  name: string
  mobile: string
  email: string
  isactive: boolean
  createddate: string
}

interface DirectoryState {
  directory: DirectoryDetails[]
}

const init: DirectoryState = {
  directory: [],
}

export const directorySlice = createSlice({
  name: 'directory',
  initialState: init,
  reducers: {
    storedirectory(state, action: PayloadAction<DirectoryDetails[]>) {
      state.directory = action.payload
    },
   
  },
})

export const directoryAction = directorySlice.actions
