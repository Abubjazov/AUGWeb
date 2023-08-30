import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'

import Menu from './Menu'

describe('Menu', () => {
  test('should render Menu default', () => {
    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Menu after clicking Arrow-button', () => {
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

  // test('should render DappletsGroup after removal some MyTag from My tags list', () => {
  //   const { asFragment } = render(
  //     <Provider>
  //       <Menu />
  //     </Provider>,
  //   )

  //   expect(asFragment()).toMatchSnapshot()

  // const myTagsState = store.getState().myDapplets.myTags.length

  // fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])
  // expect(store.getState().myDapplets.myTags.length).toEqual(myTagsState - 1)
  // })
})
