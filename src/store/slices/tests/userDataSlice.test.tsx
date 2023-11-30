import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { defaultMState, defaultMStore } from 'mockData/mockedReduxProvider'
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
import userDataSliceReducer, {
  EDappletOperation,
  EListOperation,
  ETagOperation,
} from 'store/slices/userDataSlice'

import {
  setIsLoadingUserData,
  setUserDapplets,
  setUserLists,
  setUserTags,
} from '../userDataSlice'

describe('userDataSlice', () => {
  describe('reducers', () => {
    test('setDappletSettingsState', () => {
      defaultMStore.dispatch(setIsLoadingUserData(false))

      expect(defaultMStore.getState().userData.isLoadingUserData).toBe(false)

      defaultMStore.dispatch(setIsLoadingUserData(true))

      expect(defaultMStore.getState().userData.isLoadingUserData).toBe(true)
    })

    test('setUserDapplets', () => {
      defaultMStore.dispatch(setUserDapplets(mockUserDapplets))

      expect(defaultMStore.getState().userData.userDapplets).toEqual(
        mockUserDapplets,
      )
    })

    test('setUserTags', () => {
      defaultMStore.dispatch(setUserTags(mockUserTags))

      expect(defaultMStore.getState().userData.userTags).toEqual(mockUserTags)
    })

    test('setUserLists', () => {
      defaultMStore.dispatch(setUserLists(mockUserLists))

      expect(defaultMStore.getState().userData.userLists).toEqual(mockUserLists)
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
          defaultMState.userData,
          addUserTag.pending('', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(true)
      })

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          addUserTag.fulfilled({ userTags: [newUserTag] }, '', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(false)
        expect(state.userTags).toEqual([newUserTag])
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          addUserTag.rejected(new Error('Rejected'), '', newUserTag),
        )

        expect(state.isAddingUserTag).toBe(false)
      })
    })

    describe('removeUserTag', () => {
      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
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
        ...defaultMState.userData,
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
              userDapplets: defaultMState.userData.userDapplets,
              userTags: defaultMState.userData.userTags,
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
        expect(state.userTags).toEqual(defaultMState.userData.userTags)
        expect(state.userDapplets).toEqual(defaultMState.userData.userDapplets)
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
          defaultMState.userData,
          addUserList.pending('', newUserList),
        )

        expect(state.isAddingUserList).toBe(true)
      })

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          addUserList.fulfilled({ userLists: [newUserList] }, '', newUserList),
        )

        expect(state.isAddingUserList).toBe(false)
        expect(state.userLists).toEqual([newUserList])
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          addUserList.rejected(new Error('Rejected'), '', newUserList),
        )

        expect(state.isAddingUserList).toBe(false)
      })
    })

    describe('removeUserList', () => {
      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          removeUserList.pending('', 'listId'),
        )

        expect(state.listOperationGoing).toEqual([
          {
            listId: 'listId',
            operation: ETagOperation.REMOVE,
          },
        ])
      })

      const testState = {
        ...defaultMState.userData,
        listOperationGoing: [
          {
            listId: 'listId',
            operation: EListOperation.REMOVE,
          },
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.REMOVE,
          },
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.ADD,
          },
          {
            listId: 'listId',
            operation: EListOperation.ADD,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserList.fulfilled(
            {
              userLists: defaultMState.userData.userLists,
            },
            '',
            'listId',
          ),
        )

        expect(state.listOperationGoing).toEqual([
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.REMOVE,
          },
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.ADD,
          },
          {
            listId: 'listId',
            operation: EListOperation.ADD,
          },
        ])
        expect(state.userLists).toEqual(defaultMState.userData.userLists)
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserList.rejected(new Error('Rejected'), '', 'listId'),
        )

        expect(state.listOperationGoing).toEqual([
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.REMOVE,
          },
          {
            listId: 'hthfhtfhtf',
            operation: EListOperation.ADD,
          },
          {
            listId: 'listId',
            operation: EListOperation.ADD,
          },
        ])
      })
    })

    describe('installDapplet', () => {
      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          installDapplet.pending('', 'dappletId'),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'dappletId',
            operation: EDappletOperation.INSTALL,
          },
        ])
      })

      const testState = {
        ...defaultMState.userData,
        dappletOperationGoing: [
          {
            dappletId: 'dappletId',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          installDapplet.fulfilled(
            {
              userDapplets: defaultMState.userData.userDapplets,
            },
            '',
            'dappletId',
          ),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ])
        expect(state.userDapplets).toEqual(defaultMState.userData.userDapplets)
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          installDapplet.rejected(new Error('Rejected'), '', 'dappletId'),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ])
      })
    })

    describe('unInstallDapplet', () => {
      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          unInstallDapplet.pending('', 'dappletId'),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'dappletId',
            operation: EDappletOperation.UNINSTALL,
          },
        ])
      })

      const testState = {
        ...defaultMState.userData,
        dappletOperationGoing: [
          {
            dappletId: 'dappletId',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          unInstallDapplet.fulfilled(
            {
              userDapplets: defaultMState.userData.userDapplets,
            },
            '',
            'dappletId',
          ),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ])
        expect(state.userDapplets).toEqual(defaultMState.userData.userDapplets)
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          unInstallDapplet.rejected(new Error('Rejected'), '', 'dappletId'),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.INSTALL,
          },
          {
            dappletId: 'hthfhtfhtf',
            operation: EDappletOperation.UNINSTALL,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'tagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ])
      })
    })

    describe('addUserTagToDapplet', () => {
      const payLoad = {
        dappletId: 'dappletId',
        userTagId: 'userTagId',
      }

      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          addUserTagToDapplet.pending('', payLoad),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'userTagId',
            operation: ETagOperation.ADD_TO_DAPPLET,
          },
        ])
      })

      const testState = {
        ...defaultMState.userData,
        tagOperationGoing: [
          {
            tagId: 'userTagId',
            operation: ETagOperation.ADD_TO_DAPPLET,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'userTagId',
            operation: ETagOperation.REMOVE,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          addUserTagToDapplet.fulfilled(
            {
              userDapplets: defaultMState.userData.userDapplets,
            },
            '',
            payLoad,
          ),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'userTagId',
            operation: ETagOperation.REMOVE,
          },
        ])
        expect(state.userDapplets).toEqual(defaultMState.userData.userDapplets)
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          addUserTagToDapplet.rejected(new Error('Rejected'), '', payLoad),
        )

        expect(state.tagOperationGoing).toEqual([
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.ADD,
          },
          {
            tagId: 'hthfhtfhtf',
            operation: ETagOperation.REMOVE,
          },
          {
            tagId: 'userTagId',
            operation: ETagOperation.REMOVE,
          },
        ])
      })
    })

    describe('removeUserTagFromDapplet', () => {
      const payLoad = {
        dappletId: 'dappletId',
        userTagId: 'userTagId',
      }

      test('pending', () => {
        const state = userDataSliceReducer(
          defaultMState.userData,
          removeUserTagFromDapplet.pending('', payLoad),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'dappletId',
            userTagId: 'userTagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
        ])
      })

      const testState = {
        ...defaultMState.userData,
        dappletOperationGoing: [
          {
            dappletId: 'dappletId',
            userTagId: 'userTagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'werrewqrwqe',
            userTagId: 'userTagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'ewrwerewrwe',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'userTagId',
            operation: EDappletOperation.INSTALL,
          },
        ],
      }

      test('fulfilled', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserTagFromDapplet.fulfilled(
            {
              userDapplets: defaultMState.userData.userDapplets,
            },
            '',
            payLoad,
          ),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'werrewqrwqe',
            userTagId: 'userTagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'ewrwerewrwe',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'userTagId',
            operation: EDappletOperation.INSTALL,
          },
        ])
        expect(state.userDapplets).toEqual(defaultMState.userData.userDapplets)
      })

      test('rejected', () => {
        const state = userDataSliceReducer(
          testState,
          removeUserTagFromDapplet.rejected(new Error('Rejected'), '', payLoad),
        )

        expect(state.dappletOperationGoing).toEqual([
          {
            dappletId: 'werrewqrwqe',
            userTagId: 'userTagId',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'ewrwerewrwe',
            operation: EDappletOperation.REMOVE_USER_TAG,
          },
          {
            dappletId: 'dappletId',
            userTagId: 'userTagId',
            operation: EDappletOperation.INSTALL,
          },
        ])
      })
    })
  })
})
