import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { screen, fireEvent, render } from '@testing-library/react'
import {
  mockDapplets,
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { mockedReduxProvider as MProvider } from 'mockData/mockedReduxProvider'
import { Provider } from 'react-redux'
import userDataSliceReducer, {
  EDappletOperation,
} from 'store/slices/userDataSlice'

import Dapplet from './Dapplet'

describe('Dapplet', () => {
  test('should render Dapplet default', () => {
    const { asFragment } = render(
      <MProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet then windowInnerWidth <= 880', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <MProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet default after clicking Burger button', () => {
    window.innerWidth = 1601

    const { asFragment } = render(
      <MProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet-burger-button'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet when the "dappletOperationGoing"', () => {
    const mokedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
      },
      preloadedState: {
        userData: {
          userDapplets: mockUserDapplets,
          userTags: mockUserTags,
          userLists: mockUserLists,
          isAddingUserTag: false,
          isAddingUserList: false,
          isLoadingUserData: false,
          tagOperationGoing: [],
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.INSTALL,
            },
          ],
          listOperationGoing: [],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mokedStore}>{children}</Provider>
    }

    const { asFragment } = render(
      <NewProvider>
        <Dapplet
          dapplet={mockDapplets[0]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </NewProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet after clicking on dapplet then windowInnerWidth <= 880', () => {
    window.innerWidth = 880

    const { asFragment } = render(
      <MProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('dapplet'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render Dapplet when the "dappletOperationGoing"', () => {
    const mokedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
      },
      preloadedState: {
        userData: {
          userDapplets: mockUserDapplets,
          userTags: mockUserTags,
          userLists: mockUserLists,
          isAddingUserTag: false,
          isAddingUserList: false,
          isLoadingUserData: false,
          tagOperationGoing: [],
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.UNINSTALL,
            },
          ],
          listOperationGoing: [],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mokedStore}>{children}</Provider>
    }

    const { asFragment } = render(
      <NewProvider>
        <Dapplet
          dapplet={mockDapplets[0]}
          dappletUserTags={''}
          dappletCommunityTags={''}
        />
      </NewProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
