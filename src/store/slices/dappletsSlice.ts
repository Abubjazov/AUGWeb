import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import type { RootState } from '../../store/index'

export enum ELastVisible {
  NO_MORE_DAPPLETS = 'No more Dapplets',
}
export interface IDapplet {
  dappletId: string
  appOwner: string
  circulatingSupply: string
  communityTags: string[] | string
  date: string
  fullDesc: string
  fullyDilutedMarketCap: string
  logo: string
  marketCap: string
  maxSupply: string
  name: string
  shortDesc: string
  shortName: string
  totalSupply: string
  volume: string
  volumePerMarketCap: string
}

export interface ITag {
  tagId: string
  tagName: string
}

export enum EQueryOperator {
  IN = 'in',
  ARRAY_CONTAINS = 'array-contains',
}
export interface IWhere {
  field: string
  operator: EQueryOperator
  comparisonValue: string | string[]
}

export type TLastVisible =
  | QueryDocumentSnapshot<DocumentData, DocumentData>
  | undefined
  | ELastVisible
export interface ILoadFilter {
  withLimit: number
  withStartAfter: TLastVisible
  withWhere: IWhere | undefined
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
    withLimit: 12,
    withStartAfter: undefined,
    withWhere: undefined,
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

    resetDapplets: state => {
      state.dapplets = undefined
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

      if (
        action.payload.lastVisible &&
        action.payload.dapplets.length === state.loadFilter.withLimit
      ) {
        state.lastVisible = action.payload.lastVisible
      }

      if (
        !action.payload.lastVisible ||
        action.payload.dapplets.length < state.loadFilter.withLimit
      ) {
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
  resetDapplets,
} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
