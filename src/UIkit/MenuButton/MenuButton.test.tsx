import { render } from '@testing-library/react'

import MenuButton, { MenuButtonMode, MenuButtonIcon } from './MenuButton'

describe('MenuButton', () => {
  test('should render MenuButton default', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={MenuButtonIcon.ALL_DAPPLETS}
        menuOpened={true}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MenuButton default "menuOpened = false"', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={MenuButtonIcon.ALL_DAPPLETS}
        menuOpened={false}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MenuButton active', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={MenuButtonIcon.EDITOR_CHOICE}
        mode={MenuButtonMode.ACTIVE}
        menuOpened={true}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
