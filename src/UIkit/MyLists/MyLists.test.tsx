import { PropsWithChildren } from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as asyncActions from 'asyncThunks/userData'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { mockedReduxProvider as MProvider } from 'mockData/mockedReduxProvider'
import { Provider } from 'react-redux'
import userDataSliceReducer, {
  EListOperation,
} from 'store/slices/userDataSlice'

import MyLists from './MyLists'

describe('MyLists', () => {
  test('should render MyLists default', () => {
    const { asFragment } = render(
      <MProvider>
        <MyLists menuOpened={true} />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the menu is closed', () => {
    const { asFragment } = render(
      <MProvider>
        <MyLists menuOpened={false} />
      </MProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "unInstallModeId"', () => {
    const { asFragment } = render(
      <MProvider>
        <MyLists menuOpened={false} />
      </MProvider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.mouseLeave(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "listOperationGoing"', () => {
    const mockedStore = configureStore({
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
          dappletOperationGoing: [],
          listOperationGoing: [
            {
              listId: 'c6rClgOltChco2XnyVDp',
              operation: EListOperation.REMOVE,
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
        <MyLists menuOpened={false} />
      </NewProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "userLists" is empty', () => {
    const mockedStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
      },
      preloadedState: {
        userData: {
          userDapplets: mockUserDapplets,
          userTags: mockUserTags,
          userLists: [],
          isAddingUserTag: false,
          isAddingUserList: false,
          isLoadingUserData: false,
          tagOperationGoing: [],
          dappletOperationGoing: [],
          listOperationGoing: [],
        },
      },
    })

    const NewProvider = ({ children }: PropsWithChildren<object>) => {
      return <Provider store={mockedStore}>{children}</Provider>
    }

    const { asFragment } = render(
      <NewProvider>
        <MyLists menuOpened={true} />
      </NewProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call installDapplet function on button click, on INSTALL mode', () => {
    const mockedInstallDapplet = vi
      .spyOn(asyncActions, 'removeUserList')
      .mockImplementation(() => vi.fn())

    const { asFragment } = render(
      <MProvider>
        <MyLists menuOpened={true} />
      </MProvider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('delet-list-cross-button'))

    expect(mockedInstallDapplet).toHaveBeenCalledTimes(1)
    expect(mockedInstallDapplet).toHaveBeenCalledWith('c6rClgOltChco2XnyVDp')
  })
})
