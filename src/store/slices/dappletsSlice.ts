import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { mockDapplets } from 'mockData/mockData'

import type { RootState } from '../../store/index'

export interface IDapplet {
  dappletId: number
  logo: string
  name: string
  date: number
  shortDesc: string
  fullDesc: string
  appOwner: string
  communityTags: ITag[]
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
  tagId: number
  tagName: string
}

type TDapplets = { dapplets: IDapplet[]; tags: ITag[] }

const initialState: TDapplets = {
  dapplets: [],
  // dapplets: mockDapplets,
  tags: [],
  // tags: mockCommunityTags,
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {},
})

// eslint-disable-next-line no-empty-pattern
export const {} = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
