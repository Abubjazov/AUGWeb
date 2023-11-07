import { createAsyncThunk } from '@reduxjs/toolkit'
import { fireStoreGetCollection } from 'api/fireStoreAPI'
import {
  tagsDataConverter,
  dappletsDataConverter,
} from 'api/fireStoreDataConverters/fireStoreDataConverters'
import {
  ITag,
  IWhere,
  TLastVisible,
  setDapplets,
  setIsLoadingDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { EMessageType, addMessage } from 'store/slices/layoutSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getDapplets = createAsyncThunk<
  void,
  {
    withLimit?: number
    withStartAfter?: TLastVisible
    withWhere?: IWhere
  }
>(
  'auth/getDapplets',
  async ({ withLimit, withStartAfter, withWhere }, { dispatch }) => {
    try {
      !withStartAfter && dispatch(setIsLoadingDapplets(true))

      if (withWhere && !withWhere?.comparisonValue.length) {
        dispatch(
          setDapplets({
            dapplets: [],
            lastVisible: undefined,
            add: false,
          }),
        )

        return
      }

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
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    } finally {
      !withStartAfter && dispatch(setIsLoadingDapplets(false))
    }
  },
)

export const getCommunityTags = createAsyncThunk<void, never>(
  'auth/getCommunityTags',
  async (_, { dispatch }) => {
    try {
      const tags: ITag[] = await fireStoreGetCollection(
        'CommunityTags',
        tagsDataConverter,
      )

      dispatch(setTags(tags))
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
