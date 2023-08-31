import { screen, fireEvent, render } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import { mockedReduxProvider as Provider } from 'mockData/mockedReduxProvider'

import Dapplet from './Dapplet'

describe('Dapplet', () => {
  test('should render Dapplet default', () => {
    const { asFragment } = render(
      <Provider>
        <Dapplet dapplet={mockDapplets[3]} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet then windowInnerWidth <= 880', () => {
    const { asFragment } = render(
      <Provider>
        <Dapplet dapplet={mockDapplets[3]} testInnerSize />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet default after clicking Burger button', () => {
    const { asFragment } = render(
      <Provider>
        <Dapplet dapplet={mockDapplets[3]} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-burger-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet after clicking on dapplet then windowInnerWidth <= 880', () => {
    const { asFragment } = render(
      <Provider>
        <Dapplet dapplet={mockDapplets[3]} testInnerSize />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet after removal some MyTag from dapplet', () => {
    const { asFragment } = render(
      <Provider>
        <Dapplet dapplet={mockDapplets[0]} />
      </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getAllByTestId('smart-tag-cross-button')[0])

    expect(asFragment()).toMatchSnapshot()
  })
})
