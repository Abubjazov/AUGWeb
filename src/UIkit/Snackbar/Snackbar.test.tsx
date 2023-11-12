import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'
import { EMessageType } from 'store/slices/layoutSlice'

import Snackbar from './Snackbar'

function delay(timeout: number | undefined) {
  return new Promise((resolve: (value: unknown) => void) => {
    setTimeout(resolve, timeout)
  })
}

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

  test('should call removeMessage function on input text', async () => {
    const mockedRemoveMessage = vi.spyOn(actions, 'removeMessage')

    render(
      <Provider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.ERROR,
          }}
        />
      </Provider>,
    )

    await delay(3500)

    expect(mockedRemoveMessage).toHaveBeenCalledTimes(1)
    expect(mockedRemoveMessage).toHaveBeenCalledWith('13')
  })
})
