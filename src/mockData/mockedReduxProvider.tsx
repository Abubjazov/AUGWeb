import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import {
  mockCommunityTags,
  mockDapplets,
  mockUserDapplets,
  mockUserTags,
  mockUserLists,
} from './mockData'
import authReducer from '../store/slices/authSlice'
import dappletsReducer from '../store/slices/dappletsSlice'
import layoutReducer from '../store/slices/layoutSlice'
import userDataReducer from '../store/slices/userDataSlice'

export const defaultMockState = {
  auth: {
    isUserAuthenticated: false,
    isInProgress: false,
    uid: undefined,
    email: null,
  },

  layout: {
    menuOpened: true,
    menuButtonsState: 0,
    dappletSettingsOpened: false,
    modalState: false,
    modalInner: undefined,
    messages: [],
  },

  userData: {
    userDapplets: mockUserDapplets,
    userTags: mockUserTags,
    userLists: mockUserLists,
    isAddingUserTag: false,
    isAddingUserList: false,
    isLoadingUserData: false,
    tagOperationGoing: [],
    dappletOperationGoing: [],
    listOperationGoing: [],
  },

  dapplets: {
    isLoadingDapplets: false,
    isNoMoreDapplets: false,
    dapplets: mockDapplets,
    tags: mockCommunityTags,
    loadFilter: {
      withLimit: 12,
      withStartAfter: undefined,
      withWhere: undefined,
    },
    lastVisible: undefined,
    orderBy: undefined,
    searchString: '',
  },
}

export const mockedStore = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    dapplets: dappletsReducer,
    userData: userDataReducer,
  },
  preloadedState: {
    ...defaultMockState,
  },
})

export const mockedReduxProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return <Provider store={mockedStore}>{children}</Provider>
}
