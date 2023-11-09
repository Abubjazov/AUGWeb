import WelcomeModalContent from 'components/WelcomeModalContent'
import { store } from 'mockData/mockedReduxProvider'

import {
  EMessageType,
  addMessage,
  removeMessage,
  setDappletSettingsState,
  setMenuButtonsState,
  setMenuState,
  setModalInner,
  setModalState,
} from '../layoutSlice'

describe('layoutSlice', () => {
  test('reducer: setDappletSettingsState test', () => {
    store.dispatch(setDappletSettingsState(false))

    expect(store.getState().layout.dappletSettingsOpened).toBe(false)

    store.dispatch(setDappletSettingsState(true))

    expect(store.getState().layout.dappletSettingsOpened).toBe(true)
  })

  test('reducer: setMenuState test', () => {
    store.dispatch(setMenuState(false))

    expect(store.getState().layout.menuOpened).toBe(false)

    store.dispatch(setMenuState(true))

    expect(store.getState().layout.menuOpened).toBe(true)
  })

  test('reducer: setMenuButtonsState test', () => {
    store.dispatch(setMenuButtonsState(1))

    expect(store.getState().layout.menuButtonsState).toBe(1)

    store.dispatch(setMenuButtonsState(0))

    expect(store.getState().layout.menuButtonsState).toBe(0)
  })

  test('reducer: setModalState test', () => {
    store.dispatch(setModalState(true))

    expect(store.getState().layout.modalState).toBe(true)

    store.dispatch(setModalState(false))

    expect(store.getState().layout.modalState).toBe(false)
  })

  test('reducer: setModalInner test', () => {
    store.dispatch(setModalInner(<WelcomeModalContent />))

    expect(store.getState().layout.modalInner).toEqual(<WelcomeModalContent />)

    store.dispatch(setModalInner(undefined))

    expect(store.getState().layout.modalInner).toBe(undefined)
  })

  test('reducer: addMessage & removeMessage test', () => {
    const msg = { messageText: 'Msg text', messageType: EMessageType.ERROR }

    store.dispatch(addMessage(msg))

    expect(store.getState().layout.messages[0].messageText).toBe(
      msg.messageText,
    )
    expect(store.getState().layout.messages[0].messageType).toBe(
      msg.messageType,
    )

    store.dispatch(removeMessage(store.getState().layout.messages[0].messageId))

    expect(store.getState().layout.messages.length).toBe(0)
  })
})
