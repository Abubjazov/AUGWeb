import { screen, fireEvent, render } from '@testing-library/react'
import MockedProvider from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/userData'
import * as reduxHooks from 'store/hooks'

import InstallButton, { EInstallButtonMode } from './InstallButton'

describe('InstallButton', () => {
  test('should render InstallButton with INSTALL mode', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALL mode mobile', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} mobile />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALL mode mobile setMode = EInstallButtonMode.DISPLAY_NONE', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton
          dappletId={'QbWG3sKvfgFcP5RtskMp'}
          mobile
          setMode={EInstallButtonMode.DISPLAY_NONE}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with INSTALLED mode', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "loading"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} loading />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "disabled"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} disabled />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with "loading" mobile', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} loading mobile />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render InstallButton with UNINSTALL mode', () => {
    const { asFragment } = render(
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MockedProvider>,
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
      <MockedProvider>
        <InstallButton dappletId={'QbWG3sKvfgFcP5RtskMp'} />
      </MockedProvider>,
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
      <MockedProvider>
        <InstallButton dappletId={'ECNk2nNngwGXouvMpjWt'} />
      </MockedProvider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('install-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('install-button'))

    expect(dispatchFn).toHaveBeenCalledTimes(1)
    expect(mockedUnInstallDapplet).toHaveBeenCalledWith('ECNk2nNngwGXouvMpjWt')
  })
})
