import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
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
      <MockedProvider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.INFO,
          }}
        />
        ,
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Snackbar "error"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.ERROR,
          }}
        />
        ,
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call removeMessage function on input text', async () => {
    const mockedRemoveMessage = vi.spyOn(actions, 'removeMessage')

    render(
      <MockedProvider>
        <Snackbar
          message={{
            messageId: '13',
            messageText: 'Message text',
            messageType: EMessageType.ERROR,
          }}
        />
      </MockedProvider>,
    )

    await delay(3500)

    expect(mockedRemoveMessage).toHaveBeenCalledTimes(1)
    expect(mockedRemoveMessage).toHaveBeenCalledWith('13')

    fireEvent.click(screen.getByTestId('snackbar'))

    expect(mockedRemoveMessage).toHaveBeenCalledTimes(2)
    expect(mockedRemoveMessage).toHaveBeenCalledWith('13')
  })
})
