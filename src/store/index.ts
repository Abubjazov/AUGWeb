import { configureStore } from '@reduxjs/toolkit'

import communityTagsReducer from './slices/communityTagsSlice'
import dappletsReducer from './slices/dappletsSlice'
import layoutReducer from './slices/layoutSlice'
import myDappletsReducer from './slices/myDappletsSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    dapplets: dappletsReducer,
    myDapplets: myDappletsReducer,
    communityTags: communityTagsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
