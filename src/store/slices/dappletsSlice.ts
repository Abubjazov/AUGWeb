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

export interface ILoadFilter {
  withLimit: number
  withStartAfter: TLastVisible
}

type TDapplets = {
  isLoadingDapplets: boolean
  dapplets: IDapplet[] | undefined
  tags: ITag[]
  loadFilter: ILoadFilter
}

const initialState: TDapplets = {
  isLoadingDapplets: false,
  dapplets: undefined,
  tags: [],
  loadFilter: {
    withLimit: 13,
    withStartAfter: undefined,
  },
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    setIsLoadingDapplets: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDapplets = action.payload
    },

    setDapplets: (
      state,
      action: PayloadAction<{
        dapplets: IDapplet[]
        lastVisible: TLastVisible
        add: boolean
      }>,
    ) => {
      if (action.payload.add && state.dapplets?.length) {
        state.dapplets = [...state.dapplets, ...action.payload.dapplets]
      } else {
        state.dapplets = action.payload.dapplets
      }
    },

    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload
    },

    setLoadFilter: (state, action: PayloadAction<ILoadFilter>) => {
      state.loadFilter = action.payload
    },

    resetDappletsSlice: state => {
      state.dapplets = undefined
      state.tags = []
    },

    clearDapplets: state => {
      state.dapplets = undefined
    },
  },
})

export const {
  setIsLoadingDapplets,
  setDapplets,
  setTags,
  setLoadFilter,
  resetDappletsSlice,
  clearDapplets,
} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
