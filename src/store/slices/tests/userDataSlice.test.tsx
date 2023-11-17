import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { defaultMockState, mockedStore } from 'mockData/mockedReduxProvider'
import { addUserTag, removeUserTag } from 'store/asyncThunks/userData'
import userDataSliceReducer, { ETagOperation } from 'store/slices/userDataSlice'

import {
  setIsLoadingUserData,
  setUserDapplets,
  setUserLists,
  setUserTags,
} from '../userDataSlice'

describe('userDataSlice', () => {
  describe('reducers', () => {
    test('setDappletSettingsState', () => {
      mockedStore.dispatch(setIsLoadingUserData(false))

      expect(mockedStore.getState().userData.isLoadingUserData).toBe(false)

      mockedStore.dispatch(setIsLoadingUserData(true))

      expect(mockedStore.getState().userData.isLoadingUserData).toBe(true)
    })

    test('setUserDapplets', () => {
      mockedStore.dispatch(setUserDapplets(mockUserDapplets))

      expect(mockedStore.getState().userData.userDapplets).toEqual(
        mockUserDapplets,
      )
    })

    test('setUserTags', () => {
      mockedStore.dispatch(setUserTags(mockUserTags))

      expect(mockedStore.getState().userData.userTags).toEqual(mockUserTags)
    })

    test('setUserLists', () => {
      mockedStore.dispatch(setUserLists(mockUserLists))

      expect(mockedStore.getState().userData.userLists).toEqual(mockUserLists)
    })
  })

  describe('extraReducers', () => {
    describe('addUserTag', () => {
      const newUserTag = {
        tagId: 'tagId',
        tagName: 'tagName',
      }

      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserTag.pending('', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(true)
      })

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserTag.fulfilled({ userTags: [newUserTag] }, '', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(false)
        expect(state.userTags).toEqual([newUserTag])
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserTag.rejected(new Error('Rejected'), '', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(false)
      })
    })
  })
})
