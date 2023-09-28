import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { userDataConverter } from 'services/firebaseDataConverters/firebaseDataConverters'
import {
  TMyDapplets,
  setMyDapplets,
  setMyTags,
} from 'store/slices/myDappletsSlice'

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (uid: string, { rejectWithValue, dispatch }) => {
    const db = getFirestore()

    try {
      const docRef = doc(db, 'UsersData', uid)

      const docSnapshot = await getDoc(docRef)

      const userData: TMyDapplets = userDataConverter(docSnapshot)

      dispatch(setMyDapplets(userData.myDapplets))
      dispatch(setMyTags(userData.myTags))
    } catch (e) {
      return rejectWithValue(
        typeof e == 'object' && !!e && 'message' in e
          ? (e.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)
