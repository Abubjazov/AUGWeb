import { createAsyncThunk } from '@reduxjs/toolkit'
import { fireStoreSetDoc } from 'api/fireStore/fireStoreAPI'
import { apiAddUserList, apiGetUserData } from 'api/fireStore/fireStoreMethods'
import { RootState } from 'store/index'
import { ITag } from 'store/slices/dappletsSlice'
import { EMessageType, addMessage } from 'store/slices/layoutSlice'
import {
  IList,
  IUserDapplet,
  setIsLoadingUserData,
  setUserDapplets,
  setUserLists,
  setUserTags,
} from 'store/slices/userDataSlice'
import { getErrorMessage } from 'utils/getErrorMessage/getErrorMessage'

export const getUserData = createAsyncThunk<void, never, { state: RootState }>(
  'auth/getUserData',
  async (_, { dispatch, getState }) => {
    const uid = getState().auth.uid

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to get user data')
      }

      dispatch(setIsLoadingUserData(true))

      const { userDapplets, userTags, userLists } = await apiGetUserData(uid)

      dispatch(setUserDapplets(userDapplets))
      dispatch(setUserTags(userTags))
      dispatch(setUserLists(userLists))
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )
    } finally {
      dispatch(setIsLoadingUserData(false))
    }
  },
)

export const addUserList = createAsyncThunk<
  {
    userLists: IList[]
  },
  IList,
  { state: RootState; rejectValue: string }
>('auth/addUserList', async (list, { rejectWithValue, getState, dispatch }) => {
  const uid = getState().auth.uid
  const state = getState().userData.userLists

  try {
    if (!uid) {
      throw new Error('An error occurred while trying to add new user tag')
    }

    const newData = {
      userLists: [...state, list],
    }

    await apiAddUserList(newData, uid)

    return newData
  } catch (error) {
    dispatch(
      addMessage({
        messageText: getErrorMessage(error),
        messageType: EMessageType.ERROR,
      }),
    )

    return rejectWithValue('error')
  }
})

export const removeUserList = createAsyncThunk<
  {
    userLists: IList[]
  },
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/removeUserList',
  async (listId, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    const state = getState().userData.userLists

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      const newData = {
        userLists: state.filter(list => list.listId !== listId),
      }

      await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

      return newData
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)

export const addUserTag = createAsyncThunk<
  {
    userTags: ITag[]
  },
  ITag,
  { state: RootState; rejectValue: string }
>('auth/addUserTag', async (tag, { rejectWithValue, getState, dispatch }) => {
  const uid = getState().auth.uid
  const state = getState().userData.userTags

  try {
    if (!uid) {
      throw new Error('An error occurred while trying to add new user tag')
    }

    const newData = {
      userTags: [...state, tag],
    }

    await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

    return newData
  } catch (error) {
    dispatch(
      addMessage({
        messageText: getErrorMessage(error),
        messageType: EMessageType.ERROR,
      }),
    )

    return rejectWithValue('error')
  }
})

export const removeUserTag = createAsyncThunk<
  {
    userDapplets: IUserDapplet[]
    userTags: ITag[]
  },
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/removeUserTag',
  async (tagId, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    const stateClone = structuredClone(getState().userData)

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      stateClone.userDapplets.map(dapplet => {
        dapplet.userTags = dapplet.userTags.filter(tag => tag !== tagId)
      })

      const newData = {
        userDapplets: stateClone.userDapplets.filter(
          dapplet => dapplet.dappletState || dapplet.userTags.length,
        ),
        userTags: stateClone.userTags.filter(myTag => myTag.tagId !== tagId),
      }

      await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

      return newData
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)

export const installDapplet = createAsyncThunk<
  {
    userDapplets: IUserDapplet[]
  },
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/installDapplet',
  async (dappletId, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    const stateClone = structuredClone(getState().userData.userDapplets)

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      const incomingDappletIndex = stateClone.findIndex(
        dapplet => dapplet.dappletId === dappletId,
      )

      if (incomingDappletIndex < 0) {
        stateClone.push({
          dappletId: dappletId,
          userTags: [],
          dappletState: true,
        })
      } else {
        stateClone[incomingDappletIndex].dappletState = true
      }

      const newData = {
        userDapplets: stateClone,
      }

      await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

      return newData
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)

export const unInstallDapplet = createAsyncThunk<
  {
    userDapplets: IUserDapplet[]
  } | void,
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/unInstallDapplet',
  async (dappletId, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    let stateClone = structuredClone(getState().userData.userDapplets)

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      const incomingDappletIndex = stateClone.findIndex(
        dapplet => dapplet.dappletId === dappletId,
      )

      if (incomingDappletIndex > -1) {
        const dappletUserTagsLength =
          stateClone[incomingDappletIndex].userTags.length

        if (dappletUserTagsLength) {
          stateClone[incomingDappletIndex].dappletState = false
        } else {
          stateClone = stateClone.filter(
            dapplet => dapplet.dappletId !== dappletId,
          )
        }

        const newData = {
          userDapplets: stateClone,
        }

        await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

        return newData
      }
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)

export const addUserTagToDapplet = createAsyncThunk<
  {
    userDapplets: IUserDapplet[]
  },
  { dappletId: string; userTag: ITag },
  { state: RootState; rejectValue: string }
>(
  'auth/addUserTagToDapplet',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    const stateClone = structuredClone(getState().userData.userDapplets)

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      const incomingDappletIndex = stateClone.findIndex(
        dapplet => dapplet.dappletId === data.dappletId,
      )

      if (incomingDappletIndex > -1) {
        const dappletIncomingUserTagIndex = stateClone[
          incomingDappletIndex
        ].userTags.findIndex(tagId => tagId === data.userTag.tagId)

        if (dappletIncomingUserTagIndex < 0) {
          stateClone[incomingDappletIndex].userTags.push(data.userTag.tagId)
        }
      } else {
        stateClone.push({
          dappletId: data.dappletId,
          userTags: [data.userTag.tagId],
          dappletState: false,
        })
      }

      const newData = {
        userDapplets: stateClone,
      }

      await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

      return newData
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)

export const removeUserTagFromDapplet = createAsyncThunk<
  {
    userDapplets: IUserDapplet[]
  } | void,
  { dappletId: string; userTagId: string },
  { state: RootState; rejectValue: string }
>(
  'auth/removeUserTagFromDapplet',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const uid = getState().auth.uid
    let stateClone = structuredClone(getState().userData.userDapplets)

    try {
      if (!uid) {
        throw new Error('An error occurred while trying to remove user tag')
      }

      const incomingDappletIndex = stateClone.findIndex(
        dapplet => dapplet.dappletId === data.dappletId,
      )

      if (incomingDappletIndex > -1) {
        stateClone[incomingDappletIndex].userTags = stateClone[
          incomingDappletIndex
        ].userTags.filter(tagId => tagId !== data.userTagId)

        if (
          !stateClone[incomingDappletIndex].dappletState &&
          !stateClone[incomingDappletIndex].userTags.length
        ) {
          stateClone = stateClone.filter(
            dapplet => dapplet.dappletId !== data.dappletId,
          )
        }

        const newData = {
          userDapplets: stateClone,
        }

        await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })

        return newData
      }
    } catch (error) {
      dispatch(
        addMessage({
          messageText: getErrorMessage(error),
          messageType: EMessageType.ERROR,
        }),
      )

      return rejectWithValue('error')
    }
  },
)
