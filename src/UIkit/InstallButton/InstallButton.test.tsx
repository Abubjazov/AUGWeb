import { screen, fireEvent, render } from '@testing-library/react'
import * as asyncActions from 'store/asyncThunks/userData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'
import * as reduxHooks from 'store/hooks'

import InstallButton, { InstallButtonMode } from './InstallButton'

describe('InstallButton', () => {
  test('should render InstallButton with INSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALL mode mobile', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} mobile />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALL mode mobile setMode = InstallButtonMode.DISPLAY_NONE', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton
          dappletId={'QbWG3sKvfgFcP5RtskMp'}
          mobile
          setMode={InstallButtonMode.DISPLAY_NONE}
        />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALLED mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "loading"', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} loading />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "disabled"', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} disabled />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "loading" mobile', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} loading mobile />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with UNINSTALL mode', () => {
    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.mouseLeave(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call installDapplet function on button click, on INSTALL mode', () => {
    const dispatchFn = vi.fn()

    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatchFn)

    const mockedInstallDapplet = vi.spyOn(asyncActions, 'installDapplet')

    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('install-button'))

    expect(dispatchFn).toHaveBeenCalledTimes(1)
    expect(mockedInstallDapplet).toHaveBeenCalledWith('QbWG3sKvfgFcP5RtskMp')
  })

  test('should call installDapplet function on button click, on UNISTALL mode', () => {
    const dispatchFn = vi.fn()

    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatchFn)

    const mockedUnInstallDapplet = vi.spyOn(asyncActions, 'unInstallDapplet')

    const { asFragment } = render(
      <Provider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </Provider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('install-button'))

    expect(dispatchFn).toHaveBeenCalledTimes(1)
    expect(mockedUnInstallDapplet).toHaveBeenCalledWith('ECNk2nNngwGXouvMpjWt')
  })
})
