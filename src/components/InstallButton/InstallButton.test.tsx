import { render } from '@testing-library/react'

import InstallButton from '.'
import { ButtonMode } from './InstallButton'

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
      render(<InstallButton loading disabled mode={ButtonMode.INSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton loading mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton loading mobile mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton disabled', () => {
    expect(render(<InstallButton disabled />)).toMatchSnapshot()

    expect(
      render(<InstallButton disabled mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton disabled mobile mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "install"', () => {
    expect(
      render(<InstallButton mode={ButtonMode.INSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={ButtonMode.INSTALL} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "istalled"', () => {
    expect(
      render(<InstallButton mode={ButtonMode.INSTALLED} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={ButtonMode.INSTALLED} />),
    ).toMatchSnapshot()
  })

  test('should render InstallButton mode: "uninstall"', () => {
    expect(
      render(<InstallButton mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()

    expect(
      render(<InstallButton mobile mode={ButtonMode.UNINSTALL} />),
    ).toMatchSnapshot()
  })
})
