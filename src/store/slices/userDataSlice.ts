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

export enum ETagOperation {
  ADD = 'add',
  REMOVE = 'remove',
  REMOVE_FROM_DAPPLET = 'removeFromDapplet',
}

export enum EDappletOperation {
  INSTALL = 'install',
  UNINSTALL = 'uninstall',
  REMOVE_USER_TAG = 'removeUserTag',
}
export interface IUserDapplet {
  dappletId: string
  userTags: string[]
  dappletState: boolean
}

export interface ITagOperation {
  tagId: string
  operation: ETagOperation
}

export interface IDappletOperation {
  dappletId: string
  userTagId?: string
  operation: EDappletOperation
}

export interface IUserDataState {
  userDapplets: IUserDapplet[]
  userTags: ITag[]
  isAddingUserTag: boolean
  tagOperationGoing: ITagOperation[]
  dappletOperationGoing: IDappletOperation[]
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
      state.tagOperationGoing.push({
        tagId: action.meta.arg,
        operation: ETagOperation.REMOVE,
      })
    })

    builder.addCase(removeUserTag.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagOperation =>
            tagOperation.tagId !== action.meta.arg &&
            tagOperation.operation !== ETagOperation.REMOVE,
        )

      state.userTags = action.payload.userTags
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTag.rejected, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagOperation =>
            tagOperation.tagId !== action.meta.arg &&
            tagOperation.operation !== ETagOperation.REMOVE,
        )

      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(installDapplet.pending, (state, action) => {
      state.dappletOperationGoing.push({
        dappletId: action.meta.arg,
        operation: EDappletOperation.INSTALL,
      })
    })

    builder.addCase(installDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg &&
            dappletOperation.operation !== EDappletOperation.INSTALL,
        )

      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(installDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg &&
            dappletOperation.operation !== EDappletOperation.INSTALL,
        )

      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(unInstallDapplet.pending, (state, action) => {
      state.dappletOperationGoing.push({
        dappletId: action.meta.arg,
        operation: EDappletOperation.UNINSTALL,
      })
    })

    builder.addCase(unInstallDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg &&
            dappletOperation.operation !== EDappletOperation.UNINSTALL,
        )

      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(unInstallDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg &&
            dappletOperation.operation !== EDappletOperation.UNINSTALL,
        )

      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(addUserTagToDapplet.fulfilled, (state, action) => {
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(addUserTagToDapplet.rejected, (state, action) => {
      if (action.payload) state.error.push(action.payload)
    })

    builder.addCase(removeUserTagFromDapplet.pending, (state, action) => {
      state.dappletOperationGoing.push({
        dappletId: action.meta.arg.dappletId,
        userTagId: action.meta.arg.userTagId,
        operation: EDappletOperation.REMOVE_USER_TAG,
      })
    })

    builder.addCase(removeUserTagFromDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg.dappletId &&
            dappletOperation.dappletId !== action.meta.arg.dappletId &&
            dappletOperation.operation !== EDappletOperation.REMOVE_USER_TAG,
        )

      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTagFromDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg.dappletId &&
            dappletOperation.dappletId !== action.meta.arg.dappletId &&
            dappletOperation.operation !== EDappletOperation.REMOVE_USER_TAG,
        )

      if (action.payload) state.error.push(action.payload)
    })
  },
})

export const { setUserDapplets, setUserTags } = userDataSlice.actions

export const selectUserData = (state: RootState) => state.userData

export default userDataSlice.reducer
