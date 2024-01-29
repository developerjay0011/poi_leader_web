import { UserDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  userDetails: UserDetails | null
  isLoggedIn: boolean
}

const init: AuthState = {
  isLoggedIn: false,
  userDetails: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    logIn(state, action: PayloadAction<UserDetails>) {
      state.isLoggedIn = true
      state.userDetails = action.payload
    },
    logOut(state) {
      state.isLoggedIn = false
      state.userDetails = null
      localStorage.clear()
    },
  },
})

export const authActions = authSlice.actions
