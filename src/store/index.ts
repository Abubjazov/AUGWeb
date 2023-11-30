import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import dappletsReducer from './slices/dappletsSlice'
import layoutReducer from './slices/layoutSlice'
import userDataSliceReducer from './slices/userDataSlice'

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  userData: userDataSliceReducer,
  dapplets: dappletsReducer,
}

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof configureStore>
