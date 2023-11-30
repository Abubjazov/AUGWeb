import { configureStore } from '@reduxjs/toolkit'
import { screen, fireEvent, render } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import MockedProvider, { defaultMState } from 'mockData/mockedReduxProvider'
import { AppStore } from 'store/index'
import dappletsReducer from 'store/slices/dappletsSlice'
import userDataSliceReducer, {
  EDappletOperation,
} from 'store/slices/userDataSlice'

import Dapplet from './Dapplet'

describe('Dapplet', () => {
  test('should render Dapplet default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet then windowInnerWidth <= 880', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <MockedProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet default after clicking Burger button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <MockedProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-burger-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet when the "dappletOperationGoing"', () => {
    const mockedStore: AppStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
        dapplets: dappletsReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMState.userData,
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.INSTALL,
            },
          ],
        },
      },
    })

    const { asFragment } = render(
      <MockedProvider mockedStore={mockedStore}>
        <Dapplet
          dapplet={mockDapplets[0]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet after clicking on dapplet then windowInnerWidth <= 880', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <MockedProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet when the "dappletOperationGoing" on dapplet then windowInnerWidth <= 880', () => {
    const mockedStore: AppStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
        dapplets: dappletsReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMState.userData,
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.UNINSTALL,
            },
          ],
        },
      },
    })

    const { asFragment } = render(
      <MockedProvider mockedStore={mockedStore}>
        <Dapplet
          dapplet={mockDapplets[0]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call dragOver function', () => {
    const mockFn = vi.fn()

    render(
      <MockedProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
          dragOver={mockFn}
        />
      </MockedProvider>,
    )

    fireEvent.dragOver(screen.getByTestId('dapplet'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
