import { render } from '@testing-library/react'
import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { MenuButtonIcon } from 'uikit/MenuButton/MenuButton'

import SvgIcon from './SvgIcon'

describe('SvgIcon', () => {
  test('should render SvgIcon default', () => {
    const { asFragment } = render(<SvgIcon />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "InstallButtonMode.INSTALL"', () => {
    const { asFragment } = render(<SvgIcon icon={InstallButtonMode.INSTALL} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "InstallButtonMode.INSTALLED"', () => {
    const { asFragment } = render(
      <SvgIcon icon={InstallButtonMode.INSTALLED} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "InstallButtonMode.UNINSTALL"', () => {
    const { asFragment } = render(
      <SvgIcon icon={InstallButtonMode.UNINSTALL} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.ALL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.ALL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.EDITOR_CHOICE"', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.EDITOR_CHOICE} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.ESSENTIAL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.ESSENTIAL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.FINANCIAL_DAPPLETS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.FINANCIAL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.SOCIAL_NETWORKS"', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.SOCIAL_NETWORKS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by "MenuButtonIcon.SIGN_OUT"', () => {
    const { asFragment } = render(<SvgIcon icon={MenuButtonIcon.SIGN_OUT} />)

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
