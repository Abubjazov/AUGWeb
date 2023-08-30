import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'

import DappletsGroup from './DappletsGroup'

describe('DappletsGroup', () => {
  test('should render DappletsGroup default', () => {
    const { asFragment } = render(
      <Provider>
        <DappletsGroup />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletsGroup after clicking Burger button on some dapplet', () => {
    const { asFragment } = render(
      <Provider>
        <DappletsGroup />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('dapplet-burger-button')[0])

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletsGroup after removal some MyTag from some dapplet', () => {
    render(
      <Provider>
        <DappletsGroup />
      </Provider>,
    )

    const myTagsState =
      store.getState().myDapplets.myDapplets[0].userTags.length

    fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])
    expect(store.getState().myDapplets.myDapplets[0].userTags.length).toEqual(
      myTagsState - 1,
    )
  })
})
