import WelcomeModalContent from 'components/WelcomeModalContent'
import { mokedStore } from 'mockData/mockedReduxProvider'

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
    mokedStore.dispatch(setDappletSettingsState(false))

    expect(mokedStore.getState().layout.dappletSettingsOpened).toBe(false)

    mokedStore.dispatch(setDappletSettingsState(true))

    expect(mokedStore.getState().layout.dappletSettingsOpened).toBe(true)
  })

  test('reducer: setMenuState test', () => {
    mokedStore.dispatch(setMenuState(false))

    expect(mokedStore.getState().layout.menuOpened).toBe(false)

    mokedStore.dispatch(setMenuState(true))

    expect(mokedStore.getState().layout.menuOpened).toBe(true)
  })

  test('reducer: setMenuButtonsState test', () => {
    mokedStore.dispatch(setMenuButtonsState(1))

    expect(mokedStore.getState().layout.menuButtonsState).toBe(1)

    mokedStore.dispatch(setMenuButtonsState(0))

    expect(mokedStore.getState().layout.menuButtonsState).toBe(0)
  })

  test('reducer: setModalState test', () => {
    mokedStore.dispatch(setModalState(true))

    expect(mokedStore.getState().layout.modalState).toBe(true)

    mokedStore.dispatch(setModalState(false))

    expect(mokedStore.getState().layout.modalState).toBe(false)
  })

  test('reducer: setModalInner test', () => {
    mokedStore.dispatch(setModalInner(<WelcomeModalContent />))

    expect(mokedStore.getState().layout.modalInner).toEqual(
      <WelcomeModalContent />,
    )

    mokedStore.dispatch(setModalInner(undefined))

    expect(mokedStore.getState().layout.modalInner).toBe(undefined)
  })

  test('reducer: addMessage & removeMessage test', () => {
    const msg = { messageText: 'Msg text', messageType: EMessageType.ERROR }

    mokedStore.dispatch(addMessage(msg))

    expect(mokedStore.getState().layout.messages[0].messageText).toBe(
      msg.messageText,
    )
    expect(mokedStore.getState().layout.messages[0].messageType).toBe(
      msg.messageType,
    )

    mokedStore.dispatch(
      removeMessage(mokedStore.getState().layout.messages[0].messageId),
    )

    expect(mokedStore.getState().layout.messages.length).toBe(0)
  })
})
