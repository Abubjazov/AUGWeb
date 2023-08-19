import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { mockMyDapplets } from 'utils/mockData'

import { ITag } from './communityTagsSlice'
import type { RootState } from '../index'

export interface IMyDapplet {
  dappletId: number
  userTags: ITag[]
  dappletState: boolean
}

type TMyDapplets = { myDapplets: IMyDapplet[] }

const initialState: TMyDapplets = {
  myDapplets: mockMyDapplets,
}

export const myDappletsSlice = createSlice({
  name: 'myDapplets',
  initialState,
  reducers: {
    addMyTagToDapplet: (
      state,
      action: PayloadAction<{
        dappletId: number
        userTag: ITag
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      if (targetDappletIndex > -1) {
        const targetTagIndex = state.myDapplets[
          targetDappletIndex
        ].userTags.findIndex(tag => tag.tagId === action.payload.userTag.tagId)

        if (targetTagIndex < 0) {
          state.myDapplets[targetDappletIndex].userTags.push(
            action.payload.userTag,
          )
        }
      } else
        state.myDapplets.push({
          dappletId: action.payload.dappletId,
          userTags: [action.payload.userTag],
          dappletState: false,
        })
    },

    removeMyTagFromDapplet: (
      state,
      action: PayloadAction<{
        dappletId: number
        userTagId: number
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      state.myDapplets[targetDappletIndex].userTags = state.myDapplets[
        targetDappletIndex
      ].userTags.filter(tag => tag.tagId !== action.payload.userTagId)

      if (
        !state.myDapplets[targetDappletIndex].dappletState &&
        !state.myDapplets[targetDappletIndex].userTags.length
      ) {
        state.myDapplets = state.myDapplets.filter(
          dapplet => dapplet.dappletId !== action.payload.dappletId,
        )
      }
    },
  },
})

export const { addMyTagToDapplet, removeMyTagFromDapplet } =
  myDappletsSlice.actions

export const selectMyDapplets = (state: RootState) => state.myDapplets

export default myDappletsSlice.reducer
