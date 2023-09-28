import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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

type TDapplets = { dapplets: IDapplet[]; tags: ITag[] }

const initialState: TDapplets = {
  dapplets: [],
  tags: [],
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    setDapplets: (state, action: PayloadAction<IDapplet[]>) => {
      state.dapplets = action.payload
    },

    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload
    },
  },
})

export const { setDapplets, setTags } = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
