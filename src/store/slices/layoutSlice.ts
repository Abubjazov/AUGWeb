import { ReactNode } from 'react'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { getInitialState } from 'utils/getInItialState/getInItialState'

import type { RootState } from '../index'

export enum EMessageType {
  ERROR = 'error',
  INFO = 'info',
}
export interface IMessage {
  messageId: string
  messageText: string
  messageType: EMessageType
}

export type TLayout = {
  menuOpened: boolean
  menuButtonsState: number
  dappletSettingsOpened: boolean
  modalState: boolean
  modalInner: undefined | ReactNode
  messages: IMessage[]
}

const windowInnerWidth = window.innerWidth

const initialState: TLayout = {
  menuOpened: getInitialState(windowInnerWidth, 1300),
  menuButtonsState: 0,
  dappletSettingsOpened: getInitialState(windowInnerWidth, 1600),
  modalState: false,
  modalInner: undefined,
  messages: [],
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

    setMenuButtonsState: (state, action: PayloadAction<number>) => {
      state.menuButtonsState = action.payload
    },

    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modalState = action.payload
    },

    setModalInner: (state, action: PayloadAction<undefined | ReactNode>) => {
      state.modalInner = action.payload
    },

    addMessage: (
      state,
      action: PayloadAction<{ messageText: string; messageType: EMessageType }>,
    ) => {
      state.messages.push({
        messageId: nanoid(),
        messageText: action.payload.messageText,
        messageType: action.payload.messageType,
      })
    },

    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        message => message.messageId !== action.payload,
      )
    },
  },
})

export const {
  setDappletSettingsState,
  setMenuState,
  setMenuButtonsState,
  setModalState,
  setModalInner,
  addMessage,
  removeMessage,
} = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
