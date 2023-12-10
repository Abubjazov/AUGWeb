import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetCommunityTags,
  apiGetDapplets,
} from 'api/fireStore/fireStoreMethods'
import {
  ITag,
  IWhere,
  TLastVisible,
  setDapplets,
  setIsLoadingDapplets,
  setIsLoadingMoreDapplets,
  setTags,
} from 'store/slices/dappletsSlice'
import { EMessageType, addMessage } from 'store/slices/layoutSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export interface IGetDappletOptions {
  withLimit?: number
  withStartAfter?: TLastVisible
  withWhere?: IWhere
}

export const getDapplets = createAsyncThunk<void, IGetDappletOptions>(
  'dapplets/getDapplets',
  async ({ withLimit, withStartAfter, withWhere }, { dispatch }) => {
    try {
      withStartAfter
        ? dispatch(setIsLoadingMoreDapplets(true))
        : dispatch(setIsLoadingDapplets(true))

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

      const { dapplets, lastVisible } = await apiGetDapplets({
        withLimit,
        withStartAfter,
        withWhere,
      })

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
      withStartAfter
        ? dispatch(setIsLoadingMoreDapplets(false))
        : dispatch(setIsLoadingDapplets(false))
    }
  },
)

export const getCommunityTags = createAsyncThunk<void, never>(
  'dapplets/getCommunityTags',
  async (_, { dispatch }) => {
    try {
      const tags: ITag[] = await apiGetCommunityTags()

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
