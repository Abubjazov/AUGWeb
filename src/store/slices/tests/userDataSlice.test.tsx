import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'
import { mokedStore } from 'mockData/mockedReduxProvider'

import {
  setIsLoadingUserData,
  setUserDapplets,
  setUserLists,
  setUserTags,
} from '../userDataSlice'

describe('userDataSlice', () => {
  test('reducer: setDappletSettingsState test', () => {
    mokedStore.dispatch(setIsLoadingUserData(false))

    expect(mokedStore.getState().userData.isLoadingUserData).toBe(false)

    mokedStore.dispatch(setIsLoadingUserData(true))

    expect(mokedStore.getState().userData.isLoadingUserData).toBe(true)
  })

  test('reducer: setUserDapplets test', () => {
    mokedStore.dispatch(setUserDapplets(mockUserDapplets))

    expect(mokedStore.getState().userData.userDapplets).toEqual(
      mockUserDapplets,
    )
  })

  test('reducer: setUserTags test', () => {
    mokedStore.dispatch(setUserTags(mockUserTags))

    expect(mokedStore.getState().userData.userTags).toEqual(mockUserTags)
  })

  test('reducer: setUserLists test', () => {
    mokedStore.dispatch(setUserLists(mockUserLists))

    expect(mokedStore.getState().userData.userLists).toEqual(mockUserLists)
  })
})
