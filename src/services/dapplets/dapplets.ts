import { createAsyncThunk } from '@reduxjs/toolkit'
import { fireStoreGetCollection } from 'services/fireStoreAPI/fireStoreAPI'
import {
  communityTagsDataConverter,
  dappletsDataConverter,
} from 'services/fireStoreDataConverters/fireStoreDataConverters'
import {
  IDapplet,
  ITag,
  TLastVisible,
  setDapplets,
  setIsLoadingDapplets,
  setIsLoadingMoreDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getDapplets = createAsyncThunk<
  void,
  | {
      withLimit?: number
      withStartAfter?: TLastVisible
    }
  | undefined,
  { rejectValue: string }
>('auth/getDapplets', async (queryParams, { rejectWithValue, dispatch }) => {
  try {
    queryParams?.withStartAfter
      ? dispatch(setIsLoadingMoreDapplets(true))
      : dispatch(setIsLoadingDapplets(true))

    const dapplets: {
      dapplets: IDapplet[]
      lastVisible?: TLastVisible
    } = await fireStoreGetCollection(
      'Dapplets',
      dappletsDataConverter,
      queryParams?.withLimit,
      queryParams?.withStartAfter,
    )

    if (dapplets.dapplets.length > 0) {
      dispatch(
        setDapplets({
          dapplets: dapplets.dapplets,
          withStartAfter: dapplets?.lastVisible,
        }),
      )
    }
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  } finally {
    queryParams?.withStartAfter
      ? dispatch(setIsLoadingMoreDapplets(false))
      : dispatch(setIsLoadingDapplets(false))
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
