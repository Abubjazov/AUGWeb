import { render } from '@testing-library/react'

import MyLists from './MyLists'

describe('MyLists', () => {
  test('should render MyLists default', () => {
    const { asFragment } = render(<MyLists menuOpened={true} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the menu is closed', () => {
    const { asFragment } = render(<MyLists menuOpened={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
