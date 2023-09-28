import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import {
  mockCommunityTags,
  mockDapplets,
  mockMyDapplets,
  mockMyTags,
} from './mockData'
import dappletsReducer from '../store/slices/dappletsSlice'
import layoutReducer from '../store/slices/layoutSlice'
import myDappletsReducer from '../store/slices/myDappletsSlice'

export const defaultMockState = {
  layout: {
    menuOpened: true,
    dappletSettingsOpened: false,
    modalState: true,
  },

  myDapplets: {
    myDapplets: [...mockMyDapplets],
    myTags: [...mockMyTags],
  },

  dapplets: {
    dapplets: [...mockDapplets],
    tags: [...mockCommunityTags],
  },
}

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    dapplets: dappletsReducer,
    myDapplets: myDappletsReducer,
  },
  preloadedState: {
    ...defaultMockState,
  },
})

export const mockedReduxProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return <Provider store={store}>{children}</Provider>
}
