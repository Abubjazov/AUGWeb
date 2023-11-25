import { render } from '@testing-library/react'

import MenuButton, { EMenuButtonIcon, EMenuButtonMode } from './MenuButton'

describe('MenuButton', () => {
  test('should render MenuButton default', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={EMenuButtonIcon.ALL_DAPPLETS}
        menuOpened={true}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MenuButton default "menuOpened = false"', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={EMenuButtonIcon.ALL_DAPPLETS}
        menuOpened={false}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MenuButton active', () => {
    const { asFragment } = render(
      <MenuButton
        text={'Menu button'}
        icon={EMenuButtonIcon.EDITOR_CHOICE}
        mode={EMenuButtonMode.ACTIVE}
        menuOpened={true}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
