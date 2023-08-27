import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { mockDapplets } from 'utils/mockData'

import { ITag } from './communityTagsSlice'
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

type TDapplets = { dapplets: IDapplet[] }

const initialState: TDapplets = {
  dapplets: [],
  // dapplets: mockDapplets,
}

export const dappletsSlice = createSlice({
  name: 'dapplets',
  initialState,
  reducers: {
    addDapplet: (state, action: PayloadAction<IDapplet>) => {
      state.dapplets.push(action.payload)
    },
  },
})

export const { addDapplet } = dappletsSlice.actions

export const selectDapplets = (state: RootState) => state.dapplets

export default dappletsSlice.reducer
