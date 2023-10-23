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
  setIsLoadingDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getDapplets = createAsyncThunk<
  void,
  never,
  { rejectValue: string }
>('auth/getDapplets', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setIsLoadingDapplets(true))

    const dapplets: IDapplet[] = await fireStoreGetCollection(
      'Dapplets',
      dappletsDataConverter,
    )

    dispatch(setDapplets(dapplets))
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  } finally {
    dispatch(setIsLoadingDapplets(false))
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
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})
