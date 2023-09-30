import { createAsyncThunk } from '@reduxjs/toolkit'
import { fireStoreGetCollection } from 'services/fireStoreAPI/fireStoreAPI'
import {
  communityTagsDataConverter,
  dappletsDataConverter,
} from 'services/fireStoreDataConverters/fireStoreDataConverters'
import {
  IDapplet,
  ITag,
  setDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getDapplets = createAsyncThunk<
  void,
  never,
  { rejectValue: string }
>('auth/getDapplets', async (_, { rejectWithValue, dispatch }) => {
  try {
    const dapplets: IDapplet[] = await fireStoreGetCollection(
      'Dapplets',
      dappletsDataConverter,
    )

    dispatch(setDapplets(dapplets))
  } catch (e) {
    return rejectWithValue(getErrorMessage(e))
  }
})

export const getCommunityTags = createAsyncThunk<
  void,
  never,
  { rejectValue: string }
>('auth/getCommunityTags', async (_, { rejectWithValue, dispatch }) => {
  try {
    const tags: ITag[] = await fireStoreGetCollection(
      'CommunityTags',
      communityTagsDataConverter,
    )

    dispatch(setTags(tags))
  } catch (e) {
    return rejectWithValue(getErrorMessage(e))
  }
})
