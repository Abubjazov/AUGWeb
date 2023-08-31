import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'

import Menu from './Menu'

describe('Menu', () => {
  test('should render Menu default', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after clicking Arrow-button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-arrow-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-arrow-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after clicking Logo-button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-logo-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('menu-logo-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after removal some MyTag from My tags list', () => {
    window.innerWidth = 1301

    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    const myTagsState = store.getState().myDapplets.myTags.length

    fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])
    expect(store.getState().myDapplets.myTags.length).toEqual(myTagsState - 1)
  })

  test('should render Menu after click to menu button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('menu-button')[1])

    expect(asFragment()).toMatchSnapshot()
  })
})