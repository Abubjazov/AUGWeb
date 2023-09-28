import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {
  communityTagsDataConverter,
  dappletsDataConverter,
} from 'services/firebaseDataConverters/firebaseDataConverters'
import {
  IDapplet,
  ITag,
  setDapplets,
  setTags,
} from 'store/slices/dappletsSlice'

export const getDapplets = createAsyncThunk(
  'auth/getDapplets',
  async (_, { rejectWithValue, dispatch }) => {
    const db = getFirestore()

    try {
      const collectionRef = collection(db, 'Dapplets')

      const querySnapshot = await getDocs(collectionRef)

      const dapplets: IDapplet[] = await dappletsDataConverter(querySnapshot)

      dispatch(setDapplets(dapplets))
    } catch (e) {
      return rejectWithValue(
        typeof e == 'object' && !!e && 'message' in e
          ? (e.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)

export const getCommunityTags = createAsyncThunk(
  'auth/getCommunityTags',
  async (_, { rejectWithValue, dispatch }) => {
    const db = getFirestore()

    try {
      const collectionRef = collection(db, 'CommunityTags')

      const querySnapshot = await getDocs(collectionRef)

      const tags: ITag[] = communityTagsDataConverter(querySnapshot)

      dispatch(setTags(tags))
    } catch (e) {
      return rejectWithValue(
        typeof e == 'object' && !!e && 'message' in e
          ? (e.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)
