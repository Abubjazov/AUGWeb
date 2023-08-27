import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { mockMyDapplets, mockMyTags } from 'utils/mockData'

import type { RootState } from '../index'

export interface IMyDapplet {
  dappletId: number
  userTags: ITag[]
  dappletState: boolean
}

export interface ITag {
  tagId: number
  tagName: string
}

type TMyDapplets = { myDapplets: IMyDapplet[]; myTags: ITag[] }

const initialState: TMyDapplets = {
  myDapplets: [],
  myTags: [],
  // myDapplets: mockMyDapplets,
  // myTags: mockMyTags,
}

export const myDappletsSlice = createSlice({
  name: 'myDapplets',
  initialState,
  reducers: {
    installDapplet: (
      state,
      action: PayloadAction<{
        dappletId: number
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      if (targetDappletIndex < 0) {
        state.myDapplets.push({
          dappletId: action.payload.dappletId,
          userTags: [],
          dappletState: true,
        })
      } else {
        state.myDapplets[targetDappletIndex].dappletState = true
      }
    },

    unInstallDapplet: (
      state,
      action: PayloadAction<{
        dappletId: number
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      const targetDappletMyTags =
        state.myDapplets[targetDappletIndex].userTags.length

      if (targetDappletMyTags > 0) {
        state.myDapplets[targetDappletIndex].dappletState = false
      } else {
        state.myDapplets = state.myDapplets.filter(
          dapplet => dapplet.dappletId !== action.payload.dappletId,
        )
      }
    },

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

    addMyTag: (state, action: PayloadAction<ITag>) => {
      state.myTags.push(action.payload)
    },

    removeMyTag: (state, action: PayloadAction<{ tagId: number }>) => {
      state.myDapplets.map(
        dapplet =>
          (dapplet.userTags = dapplet.userTags.filter(
            myTag => myTag.tagId !== action.payload.tagId,
          )),
      )

      state.myDapplets = state.myDapplets.filter(
        dapplet => dapplet.dappletState || dapplet.userTags.length,
      )

      state.myTags = state.myTags.filter(
        myTag => myTag.tagId !== action.payload.tagId,
      )
    },
  },
})

export const {
  addMyTag,
  removeMyTag,
  installDapplet,
  unInstallDapplet,
  addMyTagToDapplet,
  removeMyTagFromDapplet,
} = myDappletsSlice.actions

export const selectMyDapplets = (state: RootState) => state.myDapplets

export default myDappletsSlice.reducer
