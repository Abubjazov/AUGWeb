import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'

import AddUserTagModalContent from './AddUserTagModalContent'

describe('AddUserTagModalContent', () => {
  test('should render AddUserTagModalContent default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setModalState function on Close button click', () => {
    const mockedSetModalState = vi.spyOn(actions, 'setModalState')

    render(
      <MockedProvider>
        <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MockedProvider>,
    )

    fireEvent.click(screen.getByText('Close'))

    expect(mockedSetModalState).toHaveBeenCalledTimes(1)
    expect(mockedSetModalState).toHaveBeenCalledWith(false)
  })
})
