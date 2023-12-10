import { FC, ReactNode } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { AppStore, reducers } from 'store/index'

import {
  mockCommunityTags,
  mockDapplets,
  mockUserDapplets,
  mockUserTags,
  mockUserLists,
} from './mockData'

export const defaultMState = {
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
    isLoadingMoreDapplets: false,
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
    tagDragData: undefined,
  },
}

export const defaultMStore = configureStore({
  reducer: reducers,
  preloadedState: {
    ...defaultMState,
  },
})

interface MockedProviderProps {
  children: ReactNode
  mockedStore?: AppStore
}

const MockedProvider: FC<MockedProviderProps> = ({
  children,
  mockedStore = defaultMStore,
}) => {
  return <Provider store={mockedStore}>{children}</Provider>
}

export default MockedProvider
