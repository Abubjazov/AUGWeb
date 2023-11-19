/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as apiMethods from 'api/fireStore/fireStoreMethods'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { defaultMockState } from 'mockData/mockedReduxProvider'

import {
  addUserList,
  addUserTag,
  addUserTagToDapplet,
  getUserData,
  installDapplet,
  removeUserList,
  removeUserTag,
  removeUserTagFromDapplet,
  unInstallDapplet,
} from '../userData'

describe('userData', () => {
  const noUidMockState = {
    ...defaultMockState,
    auth: {
      ...defaultMockState.auth,
      uid: undefined,
    },
  }

  describe('asyncThunk: getUserData', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const returnData = {
      userDapplets: mockUserDapplets,
      userTags: mockUserTags,
      userLists: mockUserLists,
    }

    const mockedApiGetUserData = vi
      .spyOn(apiMethods, 'apiGetUserData')
      .mockResolvedValueOnce(returnData)
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = getUserData()

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, step1, step2, step3, step4, step5, end] =
        dispatch.mock.calls.flat()

      expect(start.type).toBe(getUserData.pending.type)
      expect(step1).toEqual({
        type: 'userData/setIsLoadingUserData',
        payload: true,
      })

      expect(step2).toEqual({
        type: 'userData/setUserDapplets',
        payload: mockUserDapplets,
      })
      expect(step3).toEqual({
        type: 'userData/setUserTags',
        payload: mockUserTags,
      })
      expect(step4).toEqual({
        type: 'userData/setUserLists',
        payload: mockUserLists,
      })

      expect(step5).toEqual({
        type: 'userData/setIsLoadingUserData',
        payload: false,
      })
      expect(end.type).toBe(getUserData.fulfilled.type)

      expect(mockedApiGetUserData).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiGetUserData.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, step1, error, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getUserData.pending.type)
      expect(step1).toEqual({
        type: 'userData/setIsLoadingUserData',
        payload: true,
      })
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(step2).toEqual({
        type: 'userData/setIsLoadingUserData',
        payload: false,
      })
      expect(end.type).toBe(getUserData.fulfilled.type)

      expect(mockedApiGetUserData).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiGetUserData.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, setLoading, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getUserData.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to get user data',
          messageType: 'error',
        },
      })
      expect(setLoading).toEqual({
        type: 'userData/setIsLoadingUserData',
        payload: false,
      })
      expect(end.type).toBe(getUserData.fulfilled.type)

      expect(mockedApiGetUserData).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: addUserList', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const newList = {
      listId: 'listId',
      listName: 'listName',
    }

    const mockedApiAddUserList = vi
      .spyOn(apiMethods, 'apiAddUserList')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = addUserList(newList)

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserList.pending.type)
      expect(end.type).toBe(addUserList.fulfilled.type)
      expect(end.payload).toEqual({ userLists: [...mockUserLists, newList] })

      expect(mockedApiAddUserList).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserList.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserList.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(addUserList.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserList).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserList.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserList.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to add new user list',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(addUserList.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserList).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: removeUserList', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const mockedApiRemoveUserList = vi
      .spyOn(apiMethods, 'apiRemoveUserList')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = removeUserList('listId')

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserList.pending.type)
      expect(end.type).toBe(removeUserList.fulfilled.type)
      expect(end.payload).toEqual({ userLists: [...mockUserLists] })

      expect(mockedApiRemoveUserList).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserList.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserList.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(removeUserList.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserList).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserList.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserList.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to remove user list',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(removeUserList.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserList).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: addUserTag', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const newTag = {
      tagId: 'tagId',
      tagName: 'tagName',
    }

    const mockedApiAddUserTag = vi
      .spyOn(apiMethods, 'apiAddUserTag')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = addUserTag(newTag)

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTag.pending.type)
      expect(end.type).toBe(addUserTag.fulfilled.type)
      expect(end.payload).toEqual({ userTags: [...mockUserTags, newTag] })

      expect(mockedApiAddUserTag).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserTag.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTag.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(addUserTag.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserTag).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserTag.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTag.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to add new user tag',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(addUserTag.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserTag).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: removeUserTag', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const tagId = 'tagId'

    const mockedApiRemoveUserTag = vi
      .spyOn(apiMethods, 'apiRemoveUserTag')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = removeUserTag(tagId)

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTag.pending.type)
      expect(end.type).toBe(removeUserTag.fulfilled.type)
      expect(end.payload).toEqual({
        userTags: [...mockUserTags],
        userDapplets: [...mockUserDapplets],
      })

      expect(mockedApiRemoveUserTag).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserTag.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTag.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(removeUserTag.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserTag).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserTag.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTag.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to remove user tag',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(removeUserTag.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserTag).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: installDapplet', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const dappletId = 'dappletId'

    const mockedApiInstallDapplet = vi
      .spyOn(apiMethods, 'apiInstallDapplet')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = installDapplet(dappletId)

    test('"resolved"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(installDapplet.pending.type)
      expect(end.type).toBe(installDapplet.fulfilled.type)
      expect(end.payload).toEqual({
        userDapplets: [
          ...mockUserDapplets,
          {
            dappletId: 'dappletId',
            dappletState: true,
            userTags: [],
          },
        ],
      })

      expect(mockedApiInstallDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiInstallDapplet.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(installDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(installDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiInstallDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiInstallDapplet.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(installDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to install dapplet',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(installDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiInstallDapplet).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: unInstallDapplet', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const dappletId = 'dappletId'

    const mockedApiUnInstallDapplet = vi
      .spyOn(apiMethods, 'apiUnInstallDapplet')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = unInstallDapplet(dappletId)

    test('"resolved" when incomingDappletIndex === -1', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(unInstallDapplet.pending.type)
      expect(end.type).toBe(unInstallDapplet.fulfilled.type)
      expect(end.payload).toBe(undefined)

      expect(mockedApiUnInstallDapplet).toHaveBeenCalledTimes(0)

      dispatch.mockReset()
      mockedApiUnInstallDapplet.mockClear()
    })

    const newDesiredMockState = {
      ...desiredMockState,
      userData: {
        ...desiredMockState.userData,
        userDapplets: [
          ...mockUserDapplets,
          {
            dappletId: 'dappletId',
            dappletState: true,
            userTags: [],
          },
        ],
      },
    }

    test('"resolved" when incomingDappletIndex > -1', async () => {
      await thunk(dispatch, () => newDesiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(unInstallDapplet.pending.type)
      expect(end.type).toBe(unInstallDapplet.fulfilled.type)
      expect(end.payload).toEqual({ userDapplets: mockUserDapplets })

      expect(mockedApiUnInstallDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiUnInstallDapplet.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => newDesiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(unInstallDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(unInstallDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiUnInstallDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiUnInstallDapplet.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(unInstallDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText: 'An error occurred while trying to uninstall dapplet',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(unInstallDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiUnInstallDapplet).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: addUserTagToDapplet', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const payLoad = { dappletId: 'dappletId', userTagId: 'userTagId' }

    const mockedApiAddUserTagToDapplet = vi
      .spyOn(apiMethods, 'apiAddUserTagToDapplet')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = addUserTagToDapplet(payLoad)

    test('"resolved" when incomingDappletIndex === -1', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTagToDapplet.pending.type)
      expect(end.type).toBe(addUserTagToDapplet.fulfilled.type)
      expect(end.payload).toEqual({
        userDapplets: [
          ...mockUserDapplets,
          {
            dappletId: 'dappletId',
            dappletState: false,
            userTags: ['userTagId'],
          },
        ],
      })

      expect(mockedApiAddUserTagToDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserTagToDapplet.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTagToDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(addUserTagToDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserTagToDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiAddUserTagToDapplet.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(addUserTagToDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText:
            'An error occurred while trying to add user tag to dapplet',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(addUserTagToDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserTagToDapplet).toHaveBeenCalledTimes(0)
    })
  })

  describe('asyncThunk: removeUserTagFromDapplet', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        ...defaultMockState.auth,
        uid: 'uid',
      },
    }

    const payLoad = { dappletId: 'dappletId', userTagId: 'userTagId' }

    const mockedApiRemoveUserTagFromDapplet = vi
      .spyOn(apiMethods, 'apiRemoveUserTagFromDapplet')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = removeUserTagFromDapplet(payLoad)

    test('"resolved" when incomingDappletIndex === -1', async () => {
      await thunk(dispatch, () => desiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTagFromDapplet.pending.type)
      expect(end.type).toBe(removeUserTagFromDapplet.fulfilled.type)
      expect(end.payload).toBe(undefined)

      expect(mockedApiRemoveUserTagFromDapplet).toHaveBeenCalledTimes(0)

      dispatch.mockReset()
      mockedApiRemoveUserTagFromDapplet.mockClear()
    })

    const newDesiredMockState = {
      ...desiredMockState,
      userData: {
        ...desiredMockState.userData,
        userDapplets: [
          ...mockUserDapplets,
          {
            dappletId: 'dappletId',
            dappletState: true,
            userTags: ['userTagId'],
          },
        ],
      },
    }

    test('"resolved" when incomingDappletIndex > -1', async () => {
      await thunk(dispatch, () => newDesiredMockState, undefined)

      const [start, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTagFromDapplet.pending.type)
      expect(end.type).toBe(removeUserTagFromDapplet.fulfilled.type)
      expect(end.payload).toEqual({
        userDapplets: [
          ...mockUserDapplets,
          {
            dappletId: 'dappletId',
            dappletState: true,
            userTags: [],
          },
        ],
      })

      expect(mockedApiRemoveUserTagFromDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserTagFromDapplet.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => newDesiredMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTagFromDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(removeUserTagFromDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserTagFromDapplet).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiRemoveUserTagFromDapplet.mockClear()
    })

    test('uid "undefined" error', async () => {
      await thunk(dispatch, () => noUidMockState, undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(removeUserTagFromDapplet.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: {
          messageText:
            'An error occurred while trying to remove user tag from dapplet',
          messageType: 'error',
        },
      })
      expect(end.type).toBe(removeUserTagFromDapplet.rejected.type)
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserTagFromDapplet).toHaveBeenCalledTimes(0)
    })
  })
})
