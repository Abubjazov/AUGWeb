import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { defaultMockState, mockedStore } from 'mockData/mockedReduxProvider'
import {
  addUserList,
  addUserTag,
  removeUserTag,
} from 'store/asyncThunks/userData'
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

    describe('removeUserTag', () => {
      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          removeUserTag.pending('', 'tagId'),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'tagId',
            operation: ETagOperation.REMOVE,
          },
        ])
      })

      const testState = {
        ...defaultMockState.userData,
        tagOperationGoing: [
          {
            tagId: 'tagId',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD_TO_DAPPLET,
          },
          {
            tagId: 'tagId',
            operation: ETagOperation.ADD,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserTag.fulfilled(
            {
              userDapplets: defaultMockState.userData.userDapplets,
              userTags: defaultMockState.userData.userTags,
            },
            '',
            'tagId',
          ),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD_TO_DAPPLET,
          },
          {
            tagId: 'tagId',
            operation: ETagOperation.ADD,
          },
        ])
        expect(state.userTags).toEqual(defaultMockState.userData.userTags)
        expect(state.userDapplets).toEqual(
          defaultMockState.userData.userDapplets,
        )
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserTag.rejected(new Error('Rejected'), '', 'tagId'),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD_TO_DAPPLET,
          },
          {
            tagId: 'tagId',
            operation: ETagOperation.ADD,
          },
        ])
      })
    })

    describe('addUserList', () => {
      const newUserList = { listId: 'listId', listName: 'listName' }

      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserList.pending('', newUserList),
        )

        expect(state.isAddingUserList).toBe(true)
      })

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserList.fulfilled({ userLists: [newUserList] }, '', newUserList),
        )

        expect(state.isAddingUserList).toBe(false)
        expect(state.userLists).toEqual([newUserList])
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          defaultMockState.userData,
          addUserList.rejected(new Error('Rejected'), '', newUserList),
        )

        expect(state.isAddingUserList).toBe(false)
      })
    })
  })
})
