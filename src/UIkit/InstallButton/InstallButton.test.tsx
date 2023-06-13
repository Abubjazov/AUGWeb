import { render } from '@testing-library/react'

import InstallButton, { InstallButtonMode } from './InstallButton'

describe('InstallButton', () => {
  test('should render InstallButton default', () => {
    expect(render(<InstallButton />)).toMatchSnapshot()
  })

  test('should render InstallButton skeleton', () => {
    expect(render(<InstallButton loading />)).toMatchSnapshot()

    expect(render(<InstallButton loading mobile />)).toMatchSnapshot()

    expect(render(<InstallButton loading disabled />)).toMatchSnapshot()

    expect(render(<InstallButton loading disabled mobile />)).toMatchSnapshot()

    expect(
      render(
        <InstallButton loading disabled mode={InstallButtonMode.INSTALL} />,
      ),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton loading mode={InstallButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(
        <InstallButton loading mobile mode={InstallButtonMode.UNINSTALL} />,
      ),
    ).toMatchSnapshot()
  })

  test('should render InstallButton disabled', () => {
    expect(render(<InstallButton disabled />)).toMatchSnapshot()

    expect(
      render(<InstallButton disabled mode={InstallButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(
        <InstallButton disabled mobile mode={InstallButtonMode.UNINSTALL} />,
      ),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "install"', () => {
    expect(
      render(<InstallButton mode={InstallButtonMode.INSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={InstallButtonMode.INSTALL} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "istalled"', () => {
    expect(
      render(<InstallButton mode={InstallButtonMode.INSTALLED} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={InstallButtonMode.INSTALLED} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "uninstall"', () => {
    expect(
      render(<InstallButton mode={InstallButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={InstallButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()
  })
})
