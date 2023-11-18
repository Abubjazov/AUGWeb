import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { screen, fireEvent, render, act } from '@testing-library/react'
import { mockDapplets } from 'mockData/mockData'
import {
  mockedReduxProvider as MProvider,
  defaultMockState,
} from 'mockData/mockedReduxProvider'
import { Provider } from 'react-redux'
import * as asyncActions from 'store/asyncThunks/userData'
import dappletsReducer from 'store/slices/dappletsSlice'
import userDataSliceReducer, {
  EDappletOperation,
} from 'store/slices/userDataSlice'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'

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
    const mockedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
        dapplets: dappletsReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMockState.userData,
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.INSTALL,
            },
          ],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mockedStore}>{children}</Provider>
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

  test('should render Dapplet when the "dappletOperationGoing" on dapplet then windowInnerWidth <= 880', () => {
    const mockedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
        dapplets: dappletsReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMockState.userData,
          dappletOperationGoing: [
            {
              dappletId: 'ECNk2nNngwGXouvMpjWt',
              operation: EDappletOperation.UNINSTALL,
            },
          ],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mockedStore}>{children}</Provider>
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

  test('should call dragOver function', () => {
    const mockFn = vi.fn()

    render(
      <MProvider>
        <Dapplet
          dapplet={mockDapplets[3]}
          dappletUserTags={''}
          dappletCommunityTags={''}
          dragOver={mockFn}
        />
      </MProvider>,
    )

    fireEvent.dragOver(screen.getByTestId('dapplet'))

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should call addUserTagToDapplet function on tag drop', () => {
    const mockedAddUserTagToDapplet = vi.spyOn(
      asyncActions,
      'addUserTagToDapplet',
    )

    const mockedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
        dapplets: dappletsReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMockState.userData,
        },
        dapplets: {
          ...defaultMockState.dapplets,
          tagDragData: {
            tagId: 'userTagId',
            mode: ESmartTagMode.MY_TAG,
          },
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mockedStore}>{children}</Provider>
    }

    act(() => {
      render(
        <NewProvider>
          <Dapplet
            dapplet={mockDapplets[0]}
            dappletUserTags={''}
            dappletCommunityTags={''}
          />
        </NewProvider>,
      )
    })

    act(() => {
      fireEvent.drop(screen.getByTestId('dapplet'))
    })

    expect(mockedAddUserTagToDapplet).toHaveBeenCalledTimes(1)
    expect(mockedAddUserTagToDapplet).toHaveBeenCalledWith({
      dappletId: 'ECNk2nNngwGXouvMpjWt',
      userTagId: 'userTagId',
    })
  })
})
