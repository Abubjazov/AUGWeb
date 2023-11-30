import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'

import StandardModal from './StandardModal'

describe('StandardModal', () => {
  test('should render StandardModal default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <StandardModal />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render StandardModal with "welcomeMode"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <StandardModal welcomeMode />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render StandardModal with "modalContent"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <StandardModal modalContent={<div>Modal Content</div>} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setModalState fuction', () => {
    const mockedSetModalState = vi.spyOn(actions, 'setModalState')

    render(
      <MockedProvider>
        <StandardModal />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByTestId('close-modal-div'))

    expect(mockedSetModalState).toHaveBeenCalledTimes(1)
    expect(mockedSetModalState).toHaveBeenCalledWith(false)
  })
})
