import { screen, fireEvent, render } from '@testing-library/react'
import MockedProvider, { defaultMStore } from 'mockData/mockedReduxProvider'

import Header from './Header'

describe('Header', () => {
  test('should render Header default: windowInnerWidth = 1920px', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Header windowInnerWidth={1920} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const dsoState = defaultMStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(defaultMStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })

  test('should render Header default: windowInnerWidth = 1300px', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Header windowInnerWidth={1300} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const moState = defaultMStore.getState().layout.menuOpened

    fireEvent.click(screen.getByTestId('header-burger-button'))
    expect(defaultMStore.getState().layout.menuOpened).toEqual(!moState)

    const dsoState = defaultMStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(defaultMStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })

  test('should render Header default: windowInnerWidth = 880px', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Header windowInnerWidth={880} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const moState = defaultMStore.getState().layout.menuOpened

    fireEvent.click(screen.getByTestId('header-burger-button'))
    expect(defaultMStore.getState().layout.menuOpened).toEqual(!moState)

    const dsoState = defaultMStore.getState().layout.dappletSettingsOpened

    fireEvent.click(screen.getByTestId('header-settings-button'))
    expect(defaultMStore.getState().layout.dappletSettingsOpened).toEqual(
      !dsoState,
    )
  })
})
