import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import { EMessageType } from 'store/slices/layoutSlice'

import Snackbar from './Snackbar'

describe('Snackbar', () => {
  test('should render Snackbar "info"', () => {
    const { asFragment } = render(
      <Provider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.INFO,
          }}
        />
        ,
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Snackbar "error"', () => {
    const { asFragment } = render(
      <Provider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.ERROR,
          }}
        />
        ,
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
