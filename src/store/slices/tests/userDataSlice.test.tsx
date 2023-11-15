import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { mockedStore } from 'mockData/mockedReduxProvider'

import {
  setIsLoadingUserData,
  setUserDapplets,
  setUserLists,
  setUserTags,
} from '../userDataSlice'

describe('userDataSlice', () => {
  test('reducer: setDappletSettingsState test', () => {
    mockedStore.dispatch(setIsLoadingUserData(false))

    expect(mockedStore.getState().userData.isLoadingUserData).toBe(false)

    mockedStore.dispatch(setIsLoadingUserData(true))

    expect(mockedStore.getState().userData.isLoadingUserData).toBe(true)
  })

  test('reducer: setUserDapplets test', () => {
    mockedStore.dispatch(setUserDapplets(mockUserDapplets))

    expect(mockedStore.getState().userData.userDapplets).toEqual(
      mockUserDapplets,
    )
  })

  test('reducer: setUserTags test', () => {
    mockedStore.dispatch(setUserTags(mockUserTags))

    expect(mockedStore.getState().userData.userTags).toEqual(mockUserTags)
  })

  test('reducer: setUserLists test', () => {
    mockedStore.dispatch(setUserLists(mockUserLists))

    expect(mockedStore.getState().userData.userLists).toEqual(mockUserLists)
  })
})
