import { store } from 'mockData/mockedReduxProvider'

import { setDappletSettingsState, setMenuState } from '../layoutSlice'

describe('layoutSlice', () => {
  test('reducer: setDappletSettingsState test', () => {
    store.dispatch(setDappletSettingsState(false))

    expect(store.getState().layout.dappletSettingsOpened).toEqual(false)

    store.dispatch(setDappletSettingsState(true))

    expect(store.getState().layout.dappletSettingsOpened).toEqual(true)
  })

  test('reducer: setMenuState test', () => {
    store.dispatch(setMenuState(false))

    expect(store.getState().layout.menuOpened).toEqual(false)

    store.dispatch(setMenuState(true))

    expect(store.getState().layout.menuOpened).toEqual(true)
  })
})
