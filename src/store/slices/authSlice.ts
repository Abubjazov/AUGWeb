import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  createUser,
  logIn,
  logOut,
} from 'services/authentication/authentication'

import type { RootState } from '../index'

export interface ISignUpData {
  email: string
  password: string
}

export interface IAuthState {
  isUserAuthenticated: boolean
  uid: undefined | string
  email: null | string
  status: 'waiting' | 'error' | 'loading'
  error: undefined | string
}

const initialState: IAuthState = {
  isUserAuthenticated: false,
  uid: undefined,
  email: null,
  status: 'waiting',
  error: undefined,
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

    builder.addCase(logOut.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(logOut.fulfilled, state => {
      state.status = 'waiting'
    })

    builder.addCase(logOut.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload as string
    })
  },
})

export const { setUserAuthenticated, setAuthData } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
