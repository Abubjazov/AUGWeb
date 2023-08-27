import React, { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
// eslint-disable-next-line import/order
import { Provider } from 'react-redux'

// import type { AppStore, RootState } from ''
// As a basic setup, import your same slice reducers
import { AppStore, RootState } from 'store/index'

import communityTagsReducer from '../store/slices/communityTagsSlice'
import dappletsReducer from '../store/slices/dappletsSlice'
import layoutReducer from '../store/slices/layoutSlice'
import myDappletsReducer from '../store/slices/myDappletsSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        layout: layoutReducer,
        dapplets: dappletsReducer,
        myDapplets: myDappletsReducer,
        communityTags: communityTagsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
