import { screen, fireEvent, render } from '@testing-library/react'
import * as asyncActions from 'asyncThunks/userData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import DappletSettings from './DappletSettings'

describe('DappletSettings', () => {
  test('should render DappletSettings default', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletSettings then windowInner is true', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings windowInner />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletSettings after arrow-button click', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-settings-arrow-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-settings-arrow-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call addUserList function on button click', () => {
    const mockedAddUserTag = vi
      .spyOn(asyncActions, 'addUserList')
      .mockImplementation(() => vi.fn())

    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    fireEvent.change(screen.getAllByTestId('create-name-input')[0], {
      target: { value: 'New list' },
    })

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('base-button')[0])

    expect(mockedAddUserTag).toHaveBeenCalledTimes(1)
  })

  test('should call addUserTag function on button click', () => {
    const mockedAddUserTag = vi
      .spyOn(asyncActions, 'addUserTag')
      .mockImplementation(() => vi.fn())

    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    fireEvent.change(screen.getAllByTestId('create-name-input')[1], {
      target: { value: 'New tag' },
    })

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('base-button')[1])

    expect(mockedAddUserTag).toHaveBeenCalledTimes(1)
  })
})
