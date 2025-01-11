import { createSlice } from '@reduxjs/toolkit'


interface AccessState {
  accesstabs: []
  usertype: string,
  loader: boolean
}

const init: AccessState = {
  usertype: '',
  accesstabs: [],
  loader: true
}

export const accessSlice = createSlice({
  name: 'accesstab',
  initialState: init,
  reducers: {
    storeAccesstabs(state, action: any) {
      state.accesstabs = Array.isArray(action.payload) ? action.payload : []
    },
    storeUsertype(state, action) {
      state.usertype = action.payload
    },
    storeLoader(state, action) {
      state.loader = action.payload
    },
  },
})

export const accessAction = accessSlice.actions
