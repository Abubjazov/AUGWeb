import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../index'

export interface ISignUpData {
  email: string
  password: string
}

export interface IAuthState {
  isUserAuthenticated: boolean
  isInProgress: boolean
  uid: undefined | string
  email: null | string
}

const initialState: IAuthState = {
  isUserAuthenticated: false,
  isInProgress: false,
  uid: undefined,
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<Pick<IAuthState, 'uid' | 'email'>>,
    ) => {
      state.email = action.payload.email
      state.uid = action.payload.uid
    },

    setUserAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload
    },

    setIsInProgress: (state, action: PayloadAction<boolean>) => {
      state.isInProgress = action.payload
    },
  },
})

export const { setIsInProgress, setUserAuthenticated, setAuthData } =
  authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
