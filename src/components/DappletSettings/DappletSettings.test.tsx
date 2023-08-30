import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'

import DappletSettings from './DappletSettings'

describe('DappletSettings', () => {
  test('should render DappletSettings default', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletSettings then windowInner is true', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings windowInner />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletSettings after arrow-button click', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-settings-arrow-button'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-settings-arrow-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletSettings after removal some MyTag from MY TAGS list', () => {
    render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    const myTagsState = store.getState().myDapplets.myTags.length

    fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])
    expect(store.getState().myDapplets.myTags.length).toEqual(myTagsState - 1)
  })

  test('should render DappletSettings after adding new MyTag to MY TAGS list', () => {
    const { asFragment } = render(
      <Provider>
        <DappletSettings />
      </Provider>,
    )

    const myTagsState = store.getState().myDapplets.myTags.length

    fireEvent.change(screen.getAllByTestId('create-input')[1], {
      target: { value: 'New tag' },
    })

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('base-button')[1])

    expect(store.getState().myDapplets.myTags.length).toEqual(myTagsState + 1)
  })
})
