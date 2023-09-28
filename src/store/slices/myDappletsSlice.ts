import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ITag } from './dappletsSlice'
import type { RootState } from '../index'

export interface IMyDapplet {
  dappletId: string
  userTags: string[]
  dappletState: boolean
}

export type TMyDapplets = { myDapplets: IMyDapplet[]; myTags: ITag[] }

const initialState: TMyDapplets = {
  myDapplets: [],
  myTags: [],
}

export const myDappletsSlice = createSlice({
  name: 'myDapplets',
  initialState,
  reducers: {
    setMyDapplets: (state, action: PayloadAction<IMyDapplet[]>) => {
      state.myDapplets = action.payload
    },

    setMyTags: (state, action: PayloadAction<ITag[]>) => {
      state.myTags = action.payload
    },

    installDapplet: (
      state,
      action: PayloadAction<{
        dappletId: string
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
        dappletId: string
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      if (targetDappletIndex > -1) {
        const targetDappletMyTags =
          state.myDapplets[targetDappletIndex].userTags.length

        if (targetDappletMyTags > 0) {
          state.myDapplets[targetDappletIndex].dappletState = false
        } else {
          state.myDapplets = state.myDapplets.filter(
            dapplet => dapplet.dappletId !== action.payload.dappletId,
          )
        }
      }
    },

    addMyTagToDapplet: (
      state,
      action: PayloadAction<{
        dappletId: string
        userTag: ITag
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      if (targetDappletIndex > -1) {
        const targetTagIndex = state.myDapplets[
          targetDappletIndex
        ].userTags.findIndex(tagId => tagId === action.payload.userTag.tagId)

        if (targetTagIndex < 0) {
          state.myDapplets[targetDappletIndex].userTags.push(
            action.payload.userTag.tagId,
          )
        }
      } else
        state.myDapplets.push({
          dappletId: action.payload.dappletId,
          userTags: [action.payload.userTag.tagId],
          dappletState: false,
        })
    },

    removeMyTagFromDapplet: (
      state,
      action: PayloadAction<{
        dappletId: string
        userTagId: string
      }>,
    ) => {
      const targetDappletIndex = state.myDapplets.findIndex(
        dapplet => dapplet.dappletId === action.payload.dappletId,
      )

      if (targetDappletIndex > -1) {
        state.myDapplets[targetDappletIndex].userTags = state.myDapplets[
          targetDappletIndex
        ].userTags.filter(tagId => tagId !== action.payload.userTagId)

        if (
          !state.myDapplets[targetDappletIndex].dappletState &&
          !state.myDapplets[targetDappletIndex].userTags.length
        ) {
          state.myDapplets = state.myDapplets.filter(
            dapplet => dapplet.dappletId !== action.payload.dappletId,
          )
        }
      }
    },

    addMyTag: (state, action: PayloadAction<ITag>) => {
      state.myTags.push(action.payload)
    },

    removeMyTag: (state, action: PayloadAction<{ tagId: string }>) => {
      state.myDapplets.map(
        dapplet =>
          (dapplet.userTags = dapplet.userTags.filter(
            tagId => tagId !== action.payload.tagId,
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
  setMyDapplets,
  setMyTags,
  addMyTag,
  removeMyTag,
  installDapplet,
  unInstallDapplet,
  addMyTagToDapplet,
  removeMyTagFromDapplet,
} = myDappletsSlice.actions

export const selectMyDapplets = (state: RootState) => state.myDapplets

export default myDappletsSlice.reducer
