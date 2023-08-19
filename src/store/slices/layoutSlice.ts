import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../index'

type TLayout = { menuOpened: boolean; dappletSettingsOpened: boolean }

const windowInnerWidth = window.innerWidth

const initialState: TLayout = {
  menuOpened: windowInnerWidth > 1300 ? true : false,
  dappletSettingsOpened: windowInnerWidth > 1600 ? true : false,
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
