import WelcomeModalContent from 'components/WelcomeModalContent'
import { mockedStore } from 'mockData/mockedReduxProvider'

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
  test('reducer: setDappletSettingsState', () => {
    mockedStore.dispatch(setDappletSettingsState(false))

    expect(mockedStore.getState().layout.dappletSettingsOpened).toBe(false)

    mockedStore.dispatch(setDappletSettingsState(true))

    expect(mockedStore.getState().layout.dappletSettingsOpened).toBe(true)
  })

  test('reducer: setMenuState', () => {
    mockedStore.dispatch(setMenuState(false))

    expect(mockedStore.getState().layout.menuOpened).toBe(false)

    mockedStore.dispatch(setMenuState(true))

    expect(mockedStore.getState().layout.menuOpened).toBe(true)
  })

  test('reducer: setMenuButtonsState', () => {
    mockedStore.dispatch(setMenuButtonsState(1))

    expect(mockedStore.getState().layout.menuButtonsState).toBe(1)

    mockedStore.dispatch(setMenuButtonsState(0))

    expect(mockedStore.getState().layout.menuButtonsState).toBe(0)
  })

  test('reducer: setModalState', () => {
    mockedStore.dispatch(setModalState(true))

    expect(mockedStore.getState().layout.modalState).toBe(true)

    mockedStore.dispatch(setModalState(false))

    expect(mockedStore.getState().layout.modalState).toBe(false)
  })

  test('reducer: setModalInner', () => {
    mockedStore.dispatch(setModalInner(<WelcomeModalContent />))

    expect(mockedStore.getState().layout.modalInner).toEqual(
      <WelcomeModalContent />,
    )

    mockedStore.dispatch(setModalInner(undefined))

    expect(mockedStore.getState().layout.modalInner).toBe(undefined)
  })

  test('reducer: addMessage & removeMessage', () => {
    const msg = { messageText: 'Msg text', messageType: EMessageType.ERROR }

    mockedStore.dispatch(addMessage(msg))

    expect(mockedStore.getState().layout.messages[0].messageText).toBe(
      msg.messageText,
    )
    expect(mockedStore.getState().layout.messages[0].messageType).toBe(
      msg.messageType,
    )

    mockedStore.dispatch(
      removeMessage(mockedStore.getState().layout.messages[0].messageId),
    )

    expect(mockedStore.getState().layout.messages.length).toBe(0)
  })
})
