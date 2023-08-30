import { configureStore } from '@reduxjs/toolkit'

import dappletsReducer from './slices/dappletsSlice'
import layoutReducer from './layoutSlice/layoutSlice'
import myDappletsReducer from './slices/myDappletsSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    dapplets: dappletsReducer,
    myDapplets: myDappletsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof configureStore>
