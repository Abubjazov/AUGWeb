import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import type { RootState } from '../../store/index'

export interface IDapplet {
  dappletId: string
  logo: string
  name: string
  date: number
  shortDesc: string
  fullDesc: string
  appOwner: string
  communityTags: string[]
  semperNeque: string
  aliquam: string
  urna: string
  leoIpsum: string
  inEuismod: string
  namDiam: string
  elitSagittis: string
  justoAmet: string
}

export interface ITag {
  tagId: string
  tagName: string
}

export type TLastVisible =
  | QueryDocumentSnapshot<DocumentData, DocumentData>
  | undefined

type TDapplets = {
  isLoadingDapplets: boolean
  isLoadingMoreDapplets: boolean
  dapplets: IDapplet[]
  tags: ITag[]
  lastVisible: TLastVisible
}

const initialState: TDapplets = {
  isLoadingDapplets: true,
  isLoadingMoreDapplets: false,
  dapplets: [],
  tags: [],
  lastVisible: undefined,
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    setIsLoadingDapplets: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDapplets = action.payload
    },

    setIsLoadingMoreDapplets: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMoreDapplets = action.payload
    },

    setDapplets: (
      state,
      action: PayloadAction<{
        dapplets: IDapplet[]
        withStartAfter: TLastVisible
      }>,
    ) => {
      if (action.payload?.withStartAfter) {
        state.dapplets.push(...action.payload.dapplets)
      } else {
        state.dapplets = action.payload.dapplets
      }

      state.lastVisible = action.payload?.withStartAfter
    },

    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload
    },

    resetDappletsSlice: state => {
      state.isLoadingDapplets = true
      state.dapplets = []
      state.tags = []
      state.lastVisible = undefined
    },
  },
})

export const {
  setIsLoadingDapplets,
  setIsLoadingMoreDapplets,
  setDapplets,
  setTags,
  resetDappletsSlice,
} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
