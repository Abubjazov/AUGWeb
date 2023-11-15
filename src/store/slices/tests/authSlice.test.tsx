/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as apiMethods from 'api/fireStore/fireStoreMethods'
import { mockedStore } from 'mockData/mockedReduxProvider'

import { createUser, logIn, logOut } from '../asyncThunks/authentication'
import {
  ISignUpData,
  setAuthData,
  setIsInProgress,
  setUserAuthenticated,
} from '../authSlice'

describe('authSlice', () => {
  describe('reducers', () => {
    test('reducer: setUserAuthenticated', () => {
      mockedStore.dispatch(setUserAuthenticated(true))
      expect(mockedStore.getState().auth.isUserAuthenticated).toBe(true)

      mockedStore.dispatch(setUserAuthenticated(false))
      expect(mockedStore.getState().auth.isUserAuthenticated).toBe(false)
    })

    test('reducer: setIsInProgress', () => {
      mockedStore.dispatch(setIsInProgress(true))
      expect(mockedStore.getState().auth.isInProgress).toBe(true)

      mockedStore.dispatch(setIsInProgress(false))
      expect(mockedStore.getState().auth.isInProgress).toBe(false)
    })

    test('reducer: setAuthData', () => {
      mockedStore.dispatch(setAuthData({ uid: 'userid', email: 'email' }))

      expect(mockedStore.getState().auth.email).toBe('email')
      expect(mockedStore.getState().auth.uid).toBe('userid')
    })
  })

  describe('asyncThunk: createUser', () => {
    const payloadData: ISignUpData = {
      email: 'email@test.tst',
      password: 'password',
    }

    const mockedApiCreateUser = vi
      .spyOn(apiMethods, 'apiCreateUser')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = createUser(payloadData)

    test('"resolved"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(createUser.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(createUser.fulfilled.type)

      expect(mockedApiCreateUser).toHaveBeenCalledTimes(1)
      expect(mockedApiCreateUser).toHaveBeenCalledWith(payloadData)

      dispatch.mockReset()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, error, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(createUser.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(createUser.fulfilled.type)
    })
  })

  describe('asyncThunk: logIn', () => {
    const payloadData: ISignUpData = {
      email: 'email@test.tst',
      password: 'password',
    }

    const mockedApiLogIn = vi
      .spyOn(apiMethods, 'apiLogIn')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = logIn(payloadData)

    test('"resolved"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(logIn.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(logIn.fulfilled.type)

      expect(mockedApiLogIn).toHaveBeenCalledTimes(1)
      expect(mockedApiLogIn).toHaveBeenCalledWith(payloadData)

      dispatch.mockReset()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, error, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(logIn.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(logIn.fulfilled.type)
    })
  })

  describe('asyncThunk: logOut', () => {
    const mockedApiLogOut = vi
      .spyOn(apiMethods, 'apiLogOut')
      .mockResolvedValueOnce()
      .mockRejectedValueOnce(new Error('Async error'))

    const dispatch = vi.fn()
    const thunk = logOut()

    test('"resolved"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(logOut.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(logOut.fulfilled.type)

      expect(mockedApiLogOut).toHaveBeenCalledTimes(1)

      dispatch.mockReset()
    })

    test('"rejected"', async () => {
      await thunk(dispatch, () => ({}), undefined)

      const [start, step1, error, step2, end] = dispatch.mock.calls.flat()

      expect(start.type).toBe(logOut.pending.type)
      expect(step1).toEqual({ type: 'auth/setIsInProgress', payload: true })
      expect(error).toEqual({
        type: 'layout/addMessage',
        payload: { messageText: 'Async error', messageType: 'error' },
      })
      expect(step2).toEqual({ type: 'auth/setIsInProgress', payload: false })
      expect(end.type).toBe(logOut.fulfilled.type)
    })
  })
})
