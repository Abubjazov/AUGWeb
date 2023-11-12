import { fireEvent, render, screen } from '@testing-library/react'
import { mockedReduxProvider as MProvider } from 'mockData/mockedReduxProvider'
import * as actions from 'store/slices/layoutSlice'

import AddUserTagModalContent from './AddUserTagModalContent'

describe('AddUserTagModalContent', () => {
  test('should render AddUserTagModalContent default', () => {
    const { asFragment } = render(
      <MProvider>
        <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setModalState function on Close button click', () => {
    const mockedSetModalState = vi.spyOn(actions, 'setModalState')

    render(
      <MProvider>
        <AddUserTagModalContent dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MProvider>,
    )

    fireEvent.click(screen.getByText('Close'))

    expect(mockedSetModalState).toHaveBeenCalledTimes(1)
    expect(mockedSetModalState).toHaveBeenCalledWith(false)
  })
})
