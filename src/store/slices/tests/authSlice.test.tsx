import { defaultMStore } from 'mockData/mockedReduxProvider'

import {
  setAuthData,
  setIsInProgress,
  setUserAuthenticated,
} from '../authSlice'

describe('authSlice', () => {
  describe('reducers', () => {
    test('setUserAuthenticated', () => {
      defaultMStore.dispatch(setUserAuthenticated(true))
      expect(defaultMStore.getState().auth.isUserAuthenticated).toBe(true)

      defaultMStore.dispatch(setUserAuthenticated(false))
      expect(defaultMStore.getState().auth.isUserAuthenticated).toBe(false)
    })

    test('setIsInProgress', () => {
      defaultMStore.dispatch(setIsInProgress(true))
      expect(defaultMStore.getState().auth.isInProgress).toBe(true)

      defaultMStore.dispatch(setIsInProgress(false))
      expect(defaultMStore.getState().auth.isInProgress).toBe(false)
    })

    test('setAuthData', () => {
      defaultMStore.dispatch(setAuthData({ uid: 'userid', email: 'email' }))

      expect(defaultMStore.getState().auth.email).toBe('email')
      expect(defaultMStore.getState().auth.uid).toBe('userid')
    })
  })
})
