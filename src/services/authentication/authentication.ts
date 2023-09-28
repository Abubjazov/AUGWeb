import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { ISignUpData } from 'store/slices/authSlice'

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data: ISignUpData, { rejectWithValue }) => {
    const auth = getAuth()

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      return rejectWithValue(
        typeof error == 'object' && !!error && 'message' in error
          ? (error.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data: ISignUpData, { rejectWithValue }) => {
    const auth = getAuth()

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      return rejectWithValue(
        typeof error == 'object' && !!error && 'message' in error
          ? (error.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    const auth = getAuth()

    try {
      await signOut(auth)
    } catch (error) {
      return rejectWithValue(
        typeof error == 'object' && !!error && 'message' in error
          ? (error.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)
