import { render } from '@testing-library/react'

import MenuButton, { MenuButtonMode, MenuButtonIcon } from './MenuButton'

describe('MenuButton', () => {
  test('should render MenuButton default', () => {
    expect(
      render(
        <MenuButton text={'Menu button'} icon={MenuButtonIcon.ALL_DAPPLETS} />,
      ),
    ).toMatchSnapshot()
  })

  test('should render MenuButton active', () => {
    expect(
      render(
        <MenuButton
          text={'Menu button'}
          icon={MenuButtonIcon.EDITOR_CHOICE}
          mode={MenuButtonMode.ACTIVE}
        />,
      ),
    ).toMatchSnapshot()
  })
})
