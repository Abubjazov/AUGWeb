/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as apiMethods from 'api/fireStore/fireStoreMethods'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { defaultMockState } from 'mockData/mockedReduxProvider'

import { addUserList, getUserData, removeUserList } from '../userData'

describe('userData', () => {
  describe('asyncThunk: getUserData', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        isUserAuthenticated: true,
        isInProgress: false,
        uid: 'uid',
        email: 'email@test.tst',
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
    })
  })

  describe('asyncThunk: addUserList', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        isUserAuthenticated: true,
        isInProgress: false,
        uid: 'uid',
        email: 'email@test.tst',
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
      expect(end.type).toBe('auth/addUserList/rejected')
      expect(end.payload).toBe('error')

      expect(mockedApiAddUserList).toHaveBeenCalledTimes(1)
    })
  })

  describe('asyncThunk: removeUserList', () => {
    const desiredMockState = {
      ...defaultMockState,
      auth: {
        isUserAuthenticated: true,
        isInProgress: false,
        uid: 'uid',
        email: 'email@test.tst',
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
      expect(end.type).toBe('auth/removeUserList/rejected')
      expect(end.payload).toBe('error')

      expect(mockedApiRemoveUserList).toHaveBeenCalledTimes(1)
    })
  })
})
