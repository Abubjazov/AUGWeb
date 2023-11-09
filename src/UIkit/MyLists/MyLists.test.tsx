import { render } from '@testing-library/react'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import MyLists from './MyLists'

describe('MyLists', () => {
  test('should render MyLists default', () => {
    const { asFragment } = render(
      <Provider>
        <MyLists menuOpened={true} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the menu is closed', () => {
    const { asFragment } = render(
      <Provider>
        <MyLists menuOpened={false} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
