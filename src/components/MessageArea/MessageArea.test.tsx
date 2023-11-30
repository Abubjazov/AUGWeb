import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import MockedProvider, { defaultMState } from 'mockData/mockedReduxProvider'
import { AppStore } from 'store/index'
import layoutReducer, { EMessageType } from 'store/slices/layoutSlice'

import MessageArea from './MessageArea'

describe('MessageArea', () => {
  test('should render MessageArea default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MessageArea />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MessageArea with messages', () => {
    const mockedStore: AppStore = configureStore({
      reducer: {
        layout: layoutReducer,
      },
      preloadedState: {
        layout: {
          ...defaultMState.layout,
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

    const { asFragment } = render(
      <MockedProvider mockedStore={mockedStore}>
        <MessageArea />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
