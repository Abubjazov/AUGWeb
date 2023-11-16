/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as apiMethods from 'api/fireStore/fireStoreMethods'
import { mockCommunityTags, mockDapplets } from 'mockData/mockData'
import { EQueryOperator } from 'store/slices/dappletsSlice'

import { IGetDappletOptions, getCommunityTags, getDapplets } from '../dapplets'

describe('dapplets', () => {
  describe('asyncThunk: getDapplets', () => {
    const payloadData: IGetDappletOptions = {
      withLimit: 3,
      withStartAfter: undefined,
      withWhere: undefined,
    }

    const mockedApiGetDapplets = vi
      .spyOn(apiMethods, 'apiGetDapplets')
      .mockResolvedValueOnce({
        dapplets: mockDapplets.slice(0, 3),
        lastVisible: undefined,
      })
      .mockRejectedValueOnce(new Error('Async error'))
      .mockResolvedValueOnce({
        dapplets: [],
        lastVisible: undefined,
      })

    const dispatch = vi.fn()
    const thunk = getDapplets(payloadData)

    test('"resolved"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, step2, step3, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getDapplets.pending.type)
      expect(step1).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: true,
      })
      expect(step2).toEqual({
        type: 'dapplets/setDapplets',
        payload: {
          dapplets: mockDapplets.slice(0, 3),
          lastVisible: undefined,
          add: false,
        },
      })
      expect(step3).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: false,
      })
      expect(end.type).toBe(getDapplets.fulfilled.type)

      expect(mockedApiGetDapplets).toHaveBeenCalledTimes(1)
      expect(mockedApiGetDapplets).toHaveBeenCalledWith(payloadData)

      dispatch.mockReset()
      mockedApiGetDapplets.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, error, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getDapplets.pending.type)
      expect(step1).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: true,
      })
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(step2).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: false,
      })
      expect(end.type).toBe(getDapplets.fulfilled.type)

      expect(mockedApiGetDapplets).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiGetDapplets.mockClear()
    })

    test('withWhere "resolved"', async () => {
      const thunk = getDapplets({
        ...payloadData,
        withWhere: {
          field: 'string',
          operator: EQueryOperator.ARRAY_CONTAINS,
          comparisonValue: '',
        },
      })

      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, step2, step3, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getDapplets.pending.type)
      expect(step1).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: true,
      })
      expect(step2).toEqual({
        type: 'dapplets/setDapplets',
        payload: { dapplets: [], lastVisible: undefined, add: false },
      })
      expect(step3).toEqual({
        type: 'dapplets/setIsLoadingDapplets',
        payload: false,
      })
      expect(end.type).toBe(getDapplets.fulfilled.type)

      expect(mockedApiGetDapplets).toHaveBeenCalledTimes(0)

      dispatch.mockReset()
    })
  })

  describe('asyncThunk: getCommunityTags', () => {
    const mockedApiGetCommunityTags = vi
      .spyOn(apiMethods, 'apiGetCommunityTags')
      .mockResolvedValueOnce(mockCommunityTags)
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = getCommunityTags()

    test('"resolved"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getCommunityTags.pending.type)
      expect(step).toEqual({
        type: 'dapplets/setTags',
        payload: mockCommunityTags,
      })
      expect(end.type).toBe(getCommunityTags.fulfilled.type)

      expect(mockedApiGetCommunityTags).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
      mockedApiGetCommunityTags.mockClear()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, error, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(getCommunityTags.pending.type)
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(end.type).toBe(getCommunityTags.fulfilled.type)

      expect(mockedApiGetCommunityTags).toHaveBeenCalledTimes(1)
    })
  })
})
