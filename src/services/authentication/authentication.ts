import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ISignUpData } from 'store/slices/authSlice'
import { resetDappletsSlice } from 'store/slices/dappletsSlice'
import { setMenuState } from 'store/slices/layoutSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data: ISignUpData, { rejectWithValue }) => {
    const auth = getAuth()
    const db = getFirestore()

    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      ).then(async user => {
        await setDoc(doc(db, 'UsersData', user.user.uid), {
          userDapplets: [],
          userTags: [],
          userLists: [],
        })
      })
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
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
      return rejectWithValue(getErrorMessage(error))
    }
  },
)

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue, dispatch }) => {
    const auth = getAuth()

    try {
      await signOut(auth)
      dispatch(setMenuState(false))
      dispatch(resetDappletsSlice())
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  },
)
