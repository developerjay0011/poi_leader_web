import { createSlice } from '@reduxjs/toolkit'

interface FileState {
  filestype: any[]
}

const init: FileState = {
  filestype: [],
}

export const fileSlice = createSlice({
  name: 'file',
  initialState: init,
  reducers: {
    storeFiles(state, action) {
      state.filestype = Array.isArray(action.payload) ? action.payload : []
    },
  },
})

export const fileAction = fileSlice.actions
