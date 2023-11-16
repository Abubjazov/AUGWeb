/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as apiMethods from 'api/fireStore/fireStoreMethods'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'

import { getUserData } from '../userData'

describe('userData', () => {
  describe('asyncThunk: getUserData', () => {
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
      await thunk(dispatch, () => ({}), undefined)

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
      await thunk(dispatch, () => ({}), undefined)

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
})
