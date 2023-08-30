import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../index'

type TLayout = { menuOpened: boolean; dappletSettingsOpened: boolean }

const windowInnerWidth = window.innerWidth

export const getInitialState = (windowInnerWidth: number, setPoint: number) =>
  windowInnerWidth > setPoint ? true : false

const initialState: TLayout = {
  menuOpened: getInitialState(windowInnerWidth, 1300),
  dappletSettingsOpened: getInitialState(windowInnerWidth, 1600),
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
  },
})

export const { setDappletSettingsState, setMenuState } = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
