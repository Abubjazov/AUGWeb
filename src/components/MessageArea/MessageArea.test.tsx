import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { mockedReduxProvider as MProvider } from 'mockData/mockedReduxProvider'
import { Provider } from 'react-redux'
import layoutReducer, { EMessageType } from 'store/slices/layoutSlice'

import MessageArea from './MessageArea'

describe('MessageArea', () => {
  test('should render MessageArea default', () => {
    const { asFragment } = render(
      <MProvider>
        <MessageArea />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MessageArea with messages', () => {
    const mokedStore = configureStore({
      reducer: {
        layout: layoutReducer,
      },
      preloadedState: {
        layout: {
          menuOpened: true,
          menuButtonsState: 0,
          dappletSettingsOpened: false,
          modalState: false,
          modalInner: undefined,
          messages: [
            {
              messageId: '13',
              messageText: 'ERROR Message text',
              messageType: EMessageType.ERROR,
            },

            {
              messageId: '31',
              messageText: 'INFO Message text',
              messageType: EMessageType.INFO,
            },
          ],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mokedStore}>{children}</Provider>
    }

    const { asFragment } = render(
      <NewProvider>
        <MessageArea />
      </NewProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
