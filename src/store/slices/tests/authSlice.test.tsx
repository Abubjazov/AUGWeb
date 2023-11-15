import { mockedStore } from 'mockData/mockedReduxProvider'

import {
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
})
