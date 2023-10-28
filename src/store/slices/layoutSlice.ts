import { ReactNode } from 'react'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getInitialState } from 'utils/getInItialState/getInItialState'

import type { RootState } from '../index'

type TLayout = {
  menuOpened: boolean
  dappletSettingsOpened: boolean
  modalState: boolean
  modalInner: undefined | ReactNode
}

const windowInnerWidth = window.innerWidth

const initialState: TLayout = {
  menuOpened: getInitialState(windowInnerWidth, 1300, true),
  dappletSettingsOpened: getInitialState(windowInnerWidth, 1600),
  modalState: false,
  modalInner: undefined,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setDappletSettingsState: (state, action: PayloadAction<boolean>) => {
      state.dappletSettingsOpened = action.payload
    },

    setMenuState: (state, action: PayloadAction<boolean>) => {
      state.menuOpened = action.payload
    },

    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modalState = action.payload
    },

    setModalInner: (state, action: PayloadAction<undefined | ReactNode>) => {
      state.modalInner = action.payload
    },
  },
})

export const {
  setDappletSettingsState,
  setMenuState,
  setModalState,
  setModalInner,
} = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
