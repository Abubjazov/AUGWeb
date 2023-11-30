import WelcomeModalContent from 'components/WelcomeModalContent'
import { defaultMStore } from 'mockData/mockedReduxProvider'

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
  describe('reducers', () => {
    test('setDappletSettingsState', () => {
      defaultMStore.dispatch(setDappletSettingsState(false))

      expect(defaultMStore.getState().layout.dappletSettingsOpened).toBe(false)

      defaultMStore.dispatch(setDappletSettingsState(true))

      expect(defaultMStore.getState().layout.dappletSettingsOpened).toBe(true)
    })

    test('setMenuState', () => {
      defaultMStore.dispatch(setMenuState(false))

      expect(defaultMStore.getState().layout.menuOpened).toBe(false)

      defaultMStore.dispatch(setMenuState(true))

      expect(defaultMStore.getState().layout.menuOpened).toBe(true)
    })

    test('setMenuButtonsState', () => {
      defaultMStore.dispatch(setMenuButtonsState(1))

      expect(defaultMStore.getState().layout.menuButtonsState).toBe(1)

      defaultMStore.dispatch(setMenuButtonsState(0))

      expect(defaultMStore.getState().layout.menuButtonsState).toBe(0)
    })

    test('setModalState', () => {
      defaultMStore.dispatch(setModalState(true))

      expect(defaultMStore.getState().layout.modalState).toBe(true)

      defaultMStore.dispatch(setModalState(false))

      expect(defaultMStore.getState().layout.modalState).toBe(false)
    })

    test('setModalInner', () => {
      defaultMStore.dispatch(setModalInner(<WelcomeModalContent />))

      expect(defaultMStore.getState().layout.modalInner).toEqual(
        <WelcomeModalContent />,
      )

      defaultMStore.dispatch(setModalInner(undefined))

      expect(defaultMStore.getState().layout.modalInner).toBe(undefined)
    })

    test('addMessage & removeMessage', () => {
      const msg = { messageText: 'Msg text', messageType: EMessageType.ERROR }

      defaultMStore.dispatch(addMessage(msg))

      expect(defaultMStore.getState().layout.messages[0].messageText).toBe(
        msg.messageText,
      )
      expect(defaultMStore.getState().layout.messages[0].messageType).toBe(
        msg.messageType,
      )

      defaultMStore.dispatch(
        removeMessage(defaultMStore.getState().layout.messages[0].messageId),
      )

      expect(defaultMStore.getState().layout.messages.length).toBe(0)
    })
  })
})
