import { render } from '@testing-library/react'
import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { MenuButtonIcon } from 'uikit/MenuButton/MenuButton'

import SvgIcon from './SvgIcon'

describe('SvgIcon', () => {
  test('should render SvgIcon default', () => {
    const { asFragment } = render(<SvgIcon icon={'logo'} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by InstallButtonMode', () => {
    const { asFragment } = render(
      <SvgIcon icon={InstallButtonMode.INSTALLED} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render SvgIcon by MenuButtonIcon', () => {
    const { asFragment } = render(
      <SvgIcon icon={MenuButtonIcon.ALL_DAPPLETS} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
