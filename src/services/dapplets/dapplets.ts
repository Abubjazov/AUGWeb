import { createAsyncThunk } from '@reduxjs/toolkit'
import { fireStoreGetCollection } from 'services/fireStoreAPI/fireStoreAPI'
import {
  communityTagsDataConverter,
  dappletsDataConverter,
} from 'services/fireStoreDataConverters/fireStoreDataConverters'
import {
  ITag,
  IWhere,
  TLastVisible,
  setDapplets,
  setIsLoadingDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getDapplets = createAsyncThunk<
  TLastVisible,
  {
    withLimit?: number
    withStartAfter?: TLastVisible
    withWhere?: IWhere
  },
  { rejectValue: string }
>(
  'auth/getDapplets',
  async (
    { withLimit, withStartAfter, withWhere },
    { rejectWithValue, dispatch },
  ) => {
    try {
      !withStartAfter && dispatch(setIsLoadingDapplets(true))

      const { dapplets, lastVisible } = await fireStoreGetCollection(
        'Dapplets',
        dappletsDataConverter,
        withLimit,
        withStartAfter,
        withWhere,
      )

      dispatch(
        setDapplets({
          dapplets,
          lastVisible,
          add: Boolean(withStartAfter),
        }),
      )
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    } finally {
      !withStartAfter && dispatch(setIsLoadingDapplets(false))
    }
  },
)

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
