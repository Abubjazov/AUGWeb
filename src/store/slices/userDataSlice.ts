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
  status: 'waiting' | 'error' | 'loading'
  error: undefined | string
}

const initialState: IUserDataState = {
  userDapplets: [],
  userTags: [],
  status: 'waiting',
  error: undefined,
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
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(addUserTag.fulfilled, (state, action) => {
      state.status = 'waiting'
      state.userTags = action.payload.userTags
    })

    builder.addCase(addUserTag.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })

    builder.addCase(removeUserTag.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(removeUserTag.fulfilled, (state, action) => {
      state.status = 'waiting'
      state.userTags = action.payload.userTags
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTag.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })

    builder.addCase(installDapplet.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(installDapplet.fulfilled, (state, action) => {
      state.status = 'waiting'
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(installDapplet.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })

    builder.addCase(unInstallDapplet.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(unInstallDapplet.fulfilled, (state, action) => {
      state.status = 'waiting'
      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(unInstallDapplet.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })

    builder.addCase(addUserTagToDapplet.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(addUserTagToDapplet.fulfilled, (state, action) => {
      state.status = 'waiting'
      state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(addUserTagToDapplet.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })

    builder.addCase(removeUserTagFromDapplet.pending, state => {
      state.error = undefined
      state.status = 'loading'
    })

    builder.addCase(removeUserTagFromDapplet.fulfilled, (state, action) => {
      state.status = 'waiting'
      if (action.payload) state.userDapplets = action.payload.userDapplets
    })

    builder.addCase(removeUserTagFromDapplet.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })
  },
})

export const { setUserDapplets, setUserTags } = userDataSlice.actions

export const selectUserData = (state: RootState) => state.userData

export default userDataSlice.reducer

// removeMyTagFromDapplet: (
//   state,
//   action: PayloadAction<{
//     dappletId: string
//     userTagId: string
//   }>,
// ) => {
//   const targetDappletIndex = state.myDapplets.findIndex(
//     dapplet => dapplet.dappletId === action.payload.dappletId,
//   )

//   if (targetDappletIndex > -1) {
// state.myDapplets[targetDappletIndex].userTags = state.myDapplets[
//   targetDappletIndex
// ].userTags.filter(tagId => tagId !== action.payload.userTagId)

//     if (
// !state.myDapplets[targetDappletIndex].dappletState &&
//   !state.myDapplets[targetDappletIndex].userTags.length
//     ) {
// state.myDapplets = state.myDapplets.filter(
//   dapplet => dapplet.dappletId !== action.payload.dappletId,
// )
//     }
//   }
// },
