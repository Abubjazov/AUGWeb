import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ISignUpData } from 'store/slices/authSlice'
import { EMessageType, addMessage } from 'store/slices/layoutSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data: ISignUpData, { dispatch }) => {
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
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    }
  },
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data: ISignUpData, { dispatch }) => {
    const auth = getAuth()

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    }
  },
)

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch }) => {
    const auth = getAuth()

    try {
      await signOut(auth)
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    }
  },
)
