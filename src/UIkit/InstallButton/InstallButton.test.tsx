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

  test('should render InstallButton with UNINSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={1} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()
  })
})
