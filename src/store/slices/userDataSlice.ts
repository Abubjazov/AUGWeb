import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  addUserList,
  addUserTag,
  addUserTagToDapplet,
  installDapplet,
  removeUserList,
  removeUserTag,
  removeUserTagFromDapplet,
  unInstallDapplet,
} from 'store/asyncThunks/userData'

import { ITag } from './dappletsSlice'
import type { RootState } from '../index'

export enum ETagOperation {
  ADD = 'add',
  REMOVE = 'remove',
  ADD_TO_DAPPLET = 'addToDapplet',
  REMOVE_FROM_DAPPLET = 'removeFromDapplet',
}

export enum EDappletOperation {
  INSTALL = 'install',
  UNINSTALL = 'uninstall',
  REMOVE_USER_TAG = 'removeUserTag',
}

export enum EListOperation {
  ADD = 'add',
  REMOVE = 'remove',
}
export interface IUserDapplet {
  dappletId: string
  userTags: string[]
  dappletState: boolean
}

export interface IList {
  listId: string
  listName: string
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

export interface IListOperation {
  listId: string
  operation: EListOperation
}

export interface IUserDataState {
  userDapplets: IUserDapplet[]
  userTags: ITag[]
  userLists: IList[]
  isAddingUserTag: boolean
  isAddingUserList: boolean
  isLoadingUserData: boolean
  tagOperationGoing: ITagOperation[]
  dappletOperationGoing: IDappletOperation[]
  listOperationGoing: IListOperation[]
}

const initialState: IUserDataState = {
  userDapplets: [],
  userTags: [],
  userLists: [],
  isAddingUserTag: false,
  isAddingUserList: false,
  isLoadingUserData: true,
  tagOperationGoing: [],
  dappletOperationGoing: [],
  listOperationGoing: [],
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setIsLoadingUserData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUserData = action.payload
    },

    setUserDapplets: (state, action: PayloadAction<IUserDapplet[]>) => {
      state.userDapplets = action.payload
    },

    setUserTags: (state, action: PayloadAction<ITag[]>) => {
      state.userTags = action.payload
    },

    setUserLists: (state, action: PayloadAction<IList[]>) => {
      state.userLists = action.payload
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

    builder.addCase(addUserTag.rejected, state => {
      state.isAddingUserTag = false
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
            tagOperation.tagId !== action.meta.arg ||
            tagOperation.operation !== ETagOperation.REMOVE,
        )

      state.userTags = action.payload.userTags
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTag.rejected, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagOperation =>
            tagOperation.tagId !== action.meta.arg ||
            tagOperation.operation !== ETagOperation.REMOVE,
        )
    })

    builder.addCase(addUserList.pending, state => {
      state.isAddingUserList = true
    })

    builder.addCase(addUserList.fulfilled, (state, action) => {
      state.isAddingUserList = false
      state.userLists = action.payload.userLists
    })

    builder.addCase(addUserList.rejected, state => {
      state.isAddingUserList = false
    })

    builder.addCase(removeUserList.pending, (state, action) => {
      state.listOperationGoing.push({
        listId: action.meta.arg,
        operation: EListOperation.REMOVE,
      })
    })

    builder.addCase(removeUserList.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.listOperationGoing = state.listOperationGoing.filter(
          listOperation =>
            listOperation.listId !== action.meta.arg ||
            listOperation.operation !== EListOperation.REMOVE,
        )

      state.userLists = action.payload.userLists
    })

    builder.addCase(removeUserList.rejected, (state, action) => {
      if (action.meta.arg)
        state.listOperationGoing = state.listOperationGoing.filter(
          listOperation =>
            listOperation.listId !== action.meta.arg ||
            listOperation.operation !== EListOperation.REMOVE,
        )
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
            dappletOperation.dappletId !== action.meta.arg ||
            dappletOperation.operation !== EDappletOperation.INSTALL,
        )

      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(installDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg ||
            dappletOperation.operation !== EDappletOperation.INSTALL,
        )
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
            dappletOperation.dappletId !== action.meta.arg ||
            dappletOperation.operation !== EDappletOperation.UNINSTALL,
        )

      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(unInstallDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg ||
            dappletOperation.operation !== EDappletOperation.UNINSTALL,
        )
    })

    builder.addCase(addUserTagToDapplet.pending, (state, action) => {
      state.tagOperationGoing.push({
        tagId: action.meta.arg.userTagId,
        operation: ETagOperation.ADD_TO_DAPPLET,
      })
    })

    builder.addCase(addUserTagToDapplet.fulfilled, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagOperation =>
            tagOperation.tagId !== action.meta.arg.userTagId ||
            tagOperation.operation !== ETagOperation.ADD_TO_DAPPLET,
        )

      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(addUserTagToDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.tagOperationGoing = state.tagOperationGoing.filter(
          tagOperation =>
            tagOperation.tagId !== action.meta.arg.userTagId ||
            tagOperation.operation !== ETagOperation.ADD_TO_DAPPLET,
        )
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
            dappletOperation.dappletId !== action.meta.arg.dappletId ||
            dappletOperation.userTagId !== action.meta.arg.userTagId ||
            dappletOperation.operation !== EDappletOperation.REMOVE_USER_TAG,
        )

      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTagFromDapplet.rejected, (state, action) => {
      if (action.meta.arg)
        state.dappletOperationGoing = state.dappletOperationGoing.filter(
          dappletOperation =>
            dappletOperation.dappletId !== action.meta.arg.dappletId ||
            dappletOperation.userTagId !== action.meta.arg.userTagId ||
            dappletOperation.operation !== EDappletOperation.REMOVE_USER_TAG,
        )
    })
  },
})

export const {
  setIsLoadingUserData,
  setUserDapplets,
  setUserTags,
  setUserLists,
} = userDataSlice.actions

export const selectUserData = (state: RootState) => state.userData

export default userDataSlice.reducer
