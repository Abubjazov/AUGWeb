import { screen, fireEvent, render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import InstallButton from './InstallButton'

describe('InstallButton', () => {
  test('should render InstallButton with INSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={4} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALL mode mobile', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={4} mobile />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALLED mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with skeleton', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} loading />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with disabled', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} disabled />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with skeleton mobile', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} loading mobile />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with UNINSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.mouseLeave(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton click on INSTALL & UNINSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()
  })
})
