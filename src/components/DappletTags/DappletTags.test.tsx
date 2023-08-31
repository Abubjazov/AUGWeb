import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockedReduxProvider as Provider,
  store,
} from 'mockData/mockedReduxProvider'

import DappletTags from './DappletTags'

describe('DappletTags', () => {
  test('should render DappletTags default', () => {
    const { asFragment } = render(
      <Provider>
        <DappletTags dappletId={1} dappletState={false} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletTags then windowInnerWidth <= 880 & dappletState is false', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <Provider>
        <DappletTags dappletId={1} dappletState={false} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletTags then windowInnerWidth <= 880 & dappletState is true', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <Provider>
        <DappletTags dappletId={1} dappletState={true} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render DappletTags after removal some MyTag from dapplet', () => {
    render(
      <Provider>
        <DappletTags dappletId={1} dappletState={false} />
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
