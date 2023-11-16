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
      !withStartAfter && dispatch(setIsLoadingDapplets(false))
    }
  },
)

export const getCommunityTags = createAsyncThunk<void, never>(
  'auth/getCommunityTags',
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
