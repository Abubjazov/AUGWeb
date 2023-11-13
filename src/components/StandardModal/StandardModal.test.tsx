import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'

import StandardModal from './StandardModal'

describe('StandardModal', () => {
  test('should render StandardModal default', () => {
    const { asFragment } = render(
      <Provider>
        <StandardModal />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render StandardModal with "welcomeMode"', () => {
    const { asFragment } = render(
      <Provider>
        <StandardModal welcomeMode />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render StandardModal with "modalContent"', () => {
    const { asFragment } = render(
      <Provider>
        <StandardModal modalContent={<div>Modal Content</div>} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setModalState fuction', () => {
    const mockedSetModalState = vi.spyOn(actions, 'setModalState')

    render(
      <Provider>
        <StandardModal />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId('close-modal-div'))

    expect(mockedSetModalState).toHaveBeenCalledTimes(1)
    expect(mockedSetModalState).toHaveBeenCalledWith(false)
  })
})
