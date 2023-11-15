import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  mockedStore,
} from 'mockData/mockedReduxProvider'

import Header from './Header'

describe('Header', () => {
  test('should render Header default: windowInnerWidth = 1920px', () => {
    const { asFragment } = render(
      <Provider>
        <Header windowInnerWidth={1920} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const dsoState = mockedStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(mockedStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })

  test('should render Header default: windowInnerWidth = 1300px', () => {
    const { asFragment } = render(
      <Provider>
        <Header windowInnerWidth={1300} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const moState = mockedStore.getState().layout.menuOpened

    fireEvent.click(screen.getByTestId('header-burger-button'))
    expect(mockedStore.getState().layout.menuOpened).toEqual(!moState)

    const dsoState = mockedStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(mockedStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })

  test('should render Header default: windowInnerWidth = 880px', () => {
    const { asFragment } = render(
      <Provider>
        <Header windowInnerWidth={880} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const moState = mockedStore.getState().layout.menuOpened

    fireEvent.click(screen.getByTestId('header-burger-button'))
    expect(mockedStore.getState().layout.menuOpened).toEqual(!moState)

    const dsoState = mockedStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(mockedStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })
})
