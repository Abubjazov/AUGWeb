import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { getOrderBy } from 'utils/getOrderBy/getOrderBy'

import type { RootState } from '../../store/index'

export enum ELastVisible {
  NO_MORE_DAPPLETS = 'No more Dapplets',
}
export interface IDapplet {
  dappletId: string
  appOwner: string
  circulatingSupply: string
  communityTags: string[]
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

export enum EOrderBy {
  ASC_BY_NAME = 'ASC by name',
  DESC_BY_NAME = 'DESC by name',
  ASC_BY_MARKET_CAP = 'ASC by market cap',
  DESC_BY_MARKET_CAP = 'DESC by market cap',
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

export type TDapplets = {
  isLoadingDapplets: boolean
  isNoMoreDapplets: boolean
  dapplets: IDapplet[] | undefined
  tags: ITag[]
  loadFilter: ILoadFilter
  lastVisible: TLastVisible
  orderBy: EOrderBy | undefined
  searchString: string
}

const initialState: TDapplets = {
  isLoadingDapplets: false,
  isNoMoreDapplets: false,
  dapplets: undefined,
  tags: [],
  loadFilter: {
    withLimit: 13,
    withStartAfter: undefined,
    withWhere: undefined,
  },
  lastVisible: undefined,
  orderBy: undefined,
  searchString: '',
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    setIsLoadingDapplets: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDapplets = action.payload
    },

    setLastVisible: (state, action: PayloadAction<TLastVisible>) => {
      state.lastVisible = action.payload
    },

    resetDapplets: state => {
      state.dapplets = undefined
    },

    orderDapplets: state => {
      if (state?.dapplets && state.orderBy)
        state.dapplets = state.dapplets.sort(getOrderBy(state.orderBy))
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
        state.dapplets = state.orderBy
          ? [...state.dapplets, ...action.payload.dapplets].sort(
              getOrderBy(state.orderBy),
            )
          : [...state.dapplets, ...action.payload.dapplets]
      } else {
        state.dapplets = state.orderBy
          ? [...action.payload.dapplets].sort(getOrderBy(state.orderBy))
          : [...action.payload.dapplets]
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

    setOrderBy: (state, action: PayloadAction<EOrderBy | undefined>) => {
      state.orderBy = action.payload
    },

    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload
    },
  },
})

export const {
  setIsLoadingDapplets,
  setDapplets,
  setTags,
  setLoadFilter,
  setLastVisible,
  resetDapplets,
  setOrderBy,
  orderDapplets,
  setSearchString,
} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
