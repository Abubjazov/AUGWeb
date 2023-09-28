import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createUser, logIn } from 'services/authentication/authentication'
// import { convertAuthData } from 'utils/convertAuthData/convertAuthData'

import type { RootState } from '../index'

export interface ISignUpData {
  email: string
  password: string
}

export interface IAuthState {
  isFirstLoading: boolean
  isUserAuthenticated: boolean
  // token: null | string
  // email: string
  status: 'waiting' | 'error' | 'loading'
  error: undefined | string
}

// const authDataString = localStorage.getItem('aug_web_token')
// const authData = convertAuthData(authDataString)

const initialState: IAuthState = {
  isFirstLoading: true,
  isUserAuthenticated: false,
  // token: authData?.token || null,
  // email: authData?.email || '',
  status: 'waiting',
  error: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setAuthData: (state, action: PayloadAction<string | null>) => {
    //   state.token = action.payload
    // },
    setUserAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload
    },
    setFirstLoading: (state, action: PayloadAction<boolean>) => {
      state.isFirstLoading = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(createUser.fulfilled, state => {
      state.status = 'waiting'
    })

    builder.addCase(createUser.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload as string
    })

    builder.addCase(logIn.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(logIn.fulfilled, state => {
      state.status = 'waiting'
    })

    builder.addCase(logIn.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload as string
    })
  },
})

export const { setUserAuthenticated, setFirstLoading } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
