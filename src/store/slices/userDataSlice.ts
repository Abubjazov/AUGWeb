import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  addUserTag,
  addUserTagToDapplet,
  installDapplet,
  removeUserTag,
  removeUserTagFromDapplet,
  unInstallDapplet,
} from 'services/userData/userData'

import { ITag } from './dappletsSlice'
import type { RootState } from '../index'

export interface IUserDapplet {
  dappletId: string
  userTags: string[]
  dappletState: boolean
}

export interface IUserDataState {
  userDapplets: IUserDapplet[]
  userTags: ITag[]
  isAddingUserTag: boolean
  tagOperationGoing: string[]
  dappletOperationGoing: string[]
  error: string[]
}

const initialState: IUserDataState = {
  userDapplets: [],
  userTags: [],
  isAddingUserTag: false,
  tagOperationGoing: [],
  dappletOperationGoing: [],
  error: [],
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserDapplets: (state, action: PayloadAction<IUserDapplet[]>) => {
      state.userDapplets = action.payload
    },

    setUserTags: (state, action: PayloadAction<ITag[]>) => {
      state.userTags = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(addUserTag.pending, state => {
      state.isAddingUserTag = true
    })

    builder.addCase(addUserTag.fulfilled, (state, action) => {
      state.isAddingUserTag = false
      state.userTags = action.payload.userTags
    })

    builder.addCase(addUserTag.rejected, (state, action) => {
      state.isAddingUserTag = false
      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(removeUserTag.pending, (state, action) => {
      state.tagOperationGoing.push(action.meta.arg)
    })

    builder.addCase(removeUserTag.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagId => tagId !== action.meta.arg,
        )

      state.userTags = action.payload.userTags
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTag.rejected, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagId => tagId !== action.meta.arg,
        )

      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(installDapplet.pending, (state, action) => {
      state.dappletOperationGoing.push(action.meta.arg)
    })

    builder.addCase(installDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.tagOperationGoing.filter(
          dappletId => dappletId !== action.meta.arg,
        )

      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(installDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.tagOperationGoing.filter(
          dappletId => dappletId !== action.meta.arg,
        )

      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(unInstallDapplet.pending, (state, action) => {
      state.dappletOperationGoing.push(action.meta.arg)
    })

    builder.addCase(unInstallDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.tagOperationGoing.filter(
          dappletId => dappletId !== action.meta.arg,
        )

      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(unInstallDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.tagOperationGoing.filter(
          dappletId => dappletId !== action.meta.arg,
        )

      if (action.payload) state.error.push(action.payload)
    })

    // builder.addCase(addUserTagToDapplet.pending, state => {
    // state.error = undefined
    // state.status = 'loading'
    // })

    builder.addCase(addUserTagToDapplet.fulfilled, (state, action) => {
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(addUserTagToDapplet.rejected, (state, action) => {
      // state.status = 'error'
      // state.error = action.payload
    })

    builder.addCase(removeUserTagFromDapplet.pending, state => {
      // state.error = undefined
      // state.status = 'loading'
    })

    builder.addCase(removeUserTagFromDapplet.fulfilled, (state, action) => {
      // state.status = 'waiting'
      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTagFromDapplet.rejected, (state, action) => {
      // state.status = 'error'
      // state.error = action.payload
    })
  },
})

export const { setUserDapplets, setUserTags } = userDataSlice.actions

export const selectUserData = (state: RootState) => state.userData

export default userDataSlice.reducer
