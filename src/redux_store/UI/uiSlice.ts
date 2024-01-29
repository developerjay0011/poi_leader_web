import { ErrObj, UserDetails, UserType } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isLoggedIn: boolean
  showAdminMenu: boolean
  showBriefNoti: boolean
  logErr: ErrObj
  logging: boolean
  registering: boolean
  verifyingOTP: boolean
  otpErr: ErrObj
  otpVerified: boolean
  userDetails: UserDetails | null
  jsonWebToken: string
  userType: UserType
}

const init: UIState = {
  isLoggedIn: false,
  showAdminMenu: false,
  showBriefNoti: false,
  logErr: { errTxt: '', isErr: false },
  logging: false,
  registering: false,
  verifyingOTP: false,
  otpErr: {
    isErr: false,
    errTxt: '',
  },
  otpVerified: false,
  userDetails: null,
  jsonWebToken: '',
  userType: '',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: init,
  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      // if user logged out
      if (!action.payload) localStorage.clear()
      state.isLoggedIn = action.payload
    },
    setShowAdminMenu(state, action: PayloadAction<boolean>) {
      state.showAdminMenu = action.payload
    },
    setShowBriefNoti(state, action: PayloadAction<boolean>) {
      state.showBriefNoti = action.payload
    },
    setLogErr(state, action: PayloadAction<ErrObj>) {
      state.logErr = action.payload
    },
    setLogging(state, action: PayloadAction<boolean>) {
      state.logging = action.payload
    },
    setRegistering(state, action: PayloadAction<boolean>) {
      state.registering = action.payload
    },
    setVerifying(state, action: PayloadAction<boolean>) {
      state.verifyingOTP = action.payload
    },
    setVetifyOtp(state, action: PayloadAction<boolean>) {
      state.otpVerified = action.payload
    },
    setOtpErr(state, action: PayloadAction<ErrObj>) {
      state.otpErr = action.payload
    },
    storeUserDetails(state, action: PayloadAction<UserDetails>) {
      state.userDetails = action.payload
    },
    setJWT(state, action: PayloadAction<string>) {
      state.jsonWebToken = action.payload
    },
    setUserType(state, action: PayloadAction<UserType>) {
      state.userType = action.payload
    },
  },
})

export const uiActions = uiSlice.actions
