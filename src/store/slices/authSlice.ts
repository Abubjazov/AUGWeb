import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { convertAuthData } from 'utils/convertAuthData/convertAuthData'

import type { RootState } from '../index'

export interface IAuthState {
  token: null | string
  name: string
  email: string
  status: 'waiting' | 'error' | 'loading'
  error: null | string
}

const authDataString = localStorage.getItem('aug_web_token')
const authData = convertAuthData(authDataString)

const initialState: IAuthState = {
  token: authData?.token || null,
  name: authData?.name || '',
  email: authData?.email || '',
  status: 'waiting',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
