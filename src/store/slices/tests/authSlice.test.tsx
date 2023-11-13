import { mokedStore } from 'mockData/mockedReduxProvider'

import { setAuthData, setUserAuthenticated } from '../authSlice'

describe('authSlice', () => {
  test('reducer: setUserAuthenticated test', () => {
    mokedStore.dispatch(setUserAuthenticated(true))

    expect(mokedStore.getState().auth.isUserAuthenticated).toBe(true)

    mokedStore.dispatch(setUserAuthenticated(false))

    expect(mokedStore.getState().auth.isUserAuthenticated).toBe(false)
  })

  test('reducer: setAuthData test', () => {
    mokedStore.dispatch(setAuthData({ uid: 'userid', email: 'email' }))

    expect(mokedStore.getState().auth.email).toBe('email')
    expect(mokedStore.getState().auth.uid).toBe('userid')
  })
})
