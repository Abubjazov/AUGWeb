import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import type { RootState } from '../../store/index'

export enum ELastVisible {
  NO_MORE_DAPPLETS = 'No more Dapplets',
}
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
  | ELastVisible
export interface ILoadFilter {
  withLimit: number
  withStartAfter: TLastVisible
}

type TDapplets = {
  isLoadingDapplets: boolean
  isNoMoreDapplets: boolean
  dapplets: IDapplet[] | undefined
  tags: ITag[]
  loadFilter: ILoadFilter
  lastVisible: TLastVisible
}

const initialState: TDapplets = {
  isLoadingDapplets: false,
  isNoMoreDapplets: false,
  dapplets: undefined,
  tags: [],
  loadFilter: {
    withLimit: 13,
    withStartAfter: undefined,
  },
  lastVisible: undefined,
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    setIsLoadingDapplets: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDapplets = action.payload
    },

    resetLastVisible: state => {
      state.lastVisible = undefined
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

      if (action.payload.lastVisible)
        state.lastVisible = action.payload.lastVisible

      if (!action.payload.lastVisible) {
        state.lastVisible = ELastVisible.NO_MORE_DAPPLETS
      }
    },

    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload
    },

    setLoadFilter: (state, action: PayloadAction<ILoadFilter>) => {
      state.loadFilter = action.payload
    },
  },
})

export const {
  setIsLoadingDapplets,
  setDapplets,
  setTags,
  setLoadFilter,
  resetLastVisible,
} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
