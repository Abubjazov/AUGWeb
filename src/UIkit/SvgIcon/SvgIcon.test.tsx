import { render } from '@testing-library/react'
import { EInstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { EMenuButtonMode } from 'uikit/MenuButton/MenuButton'

import SvgIcon from './SvgIcon'

describe('SvgIcon', () => {
  test('should render SvgIcon default', () => {
    const { asFragment } = render(<SvgIcon />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EInstallButtonMode.INSTALL"', () => {
    const { asFragment } = render(<SvgIcon icon={EInstallButtonMode.INSTALL} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EInstallButtonMode.INSTALLED"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EInstallButtonMode.INSTALLED} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EInstallButtonMode.UNINSTALL"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EInstallButtonMode.UNINSTALL} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.ALL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EMenuButtonMode.ALL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.EDITOR_CHOICE"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EMenuButtonMode.EDITOR_CHOICE} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.ESSENTIAL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EMenuButtonMode.ESSENTIAL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.FINANCIAL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EMenuButtonMode.FINANCIAL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.SOCIAL_NETWORKS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={EMenuButtonMode.SOCIAL_NETWORKS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "EMenuButtonMode.SIGN_OUT"', () => {
    const { asFragment } = render(<SvgIcon icon={EMenuButtonMode.SIGN_OUT} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "smarttagcross"', () => {
    const { asFragment } = render(<SvgIcon icon={'smarttagcross'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "redcross"', () => {
    const { asFragment } = render(<SvgIcon icon={'redcross'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "logo"', () => {
    const { asFragment } = render(<SvgIcon icon={'logo'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "arrowLeft"', () => {
    const { asFragment } = render(<SvgIcon icon={'arrowLeft'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "arrowRight"', () => {
    const { asFragment } = render(<SvgIcon icon={'arrowRight'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "cloudNetwork"', () => {
    const { asFragment } = render(<SvgIcon icon={'cloudNetwork'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "settings"', () => {
    const { asFragment } = render(<SvgIcon icon={'settings'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "glass"', () => {
    const { asFragment } = render(<SvgIcon icon={'glass'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "selectArrow"', () => {
    const { asFragment } = render(<SvgIcon icon={'selectArrow'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon "burger"', () => {
    const { asFragment } = render(<SvgIcon icon={'burger'} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
