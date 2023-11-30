import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import MockedProvider, { defaultMState } from 'mockData/mockedReduxProvider'
import * as asyncActions from 'store/asyncThunks/userData'
import { AppStore } from 'store/index'
import userDataSliceReducer, {
  EListOperation,
} from 'store/slices/userDataSlice'

import MyLists from './MyLists'

describe('MyLists', () => {
  test('should render MyLists default', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MyLists menuOpened={true} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the menu is closed', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MyLists menuOpened={false} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "unInstallModeId"', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MyLists menuOpened={false} />
      </MockedProvider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.mouseLeave(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "listOperationGoing"', () => {
    const desiredMockState: AppStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMState.userData,
          listOperationGoing: [
            {
              listId: 'c6rClgOltChco2XnyVDp',
              operation: EListOperation.REMOVE,
            },
          ],
        },
      },
    })

    const { asFragment } = render(
      <MockedProvider mockedStore={desiredMockState}>
        <MyLists menuOpened={false} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render MyLists when the "userLists" is empty', () => {
    const desiredMockState: AppStore = configureStore({
      reducer: {
        userData: userDataSliceReducer,
      },
      preloadedState: {
        userData: {
          ...defaultMState.userData,
          userLists: [],
        },
      },
    })
    const { asFragment } = render(
      <MockedProvider mockedStore={desiredMockState}>
        <MyLists menuOpened={false} />
      </MockedProvider>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should call installDapplet function on button click, on INSTALL mode', () => {
    const mockedInstallDapplet = vi
      .spyOn(asyncActions, 'removeUserList')
      .mockImplementation(() => vi.fn())

    const { asFragment } = render(
      <MockedProvider>
        <MyLists menuOpened={true} />
      </MockedProvider>,
    )

    fireEvent.mouseEnter(screen.getByTestId('list-c6rClgOltChco2XnyVDp'))

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByTestId('delet-list-cross-button'))

    expect(mockedInstallDapplet).toHaveBeenCalledTimes(1)
    expect(mockedInstallDapplet).toHaveBeenCalledWith('c6rClgOltChco2XnyVDp')
  })
})
