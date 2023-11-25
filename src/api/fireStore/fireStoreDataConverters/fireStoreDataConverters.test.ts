import { DocumentSnapshot, DocumentData } from 'firebase/firestore'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'

import { userDataConverter } from './fireStoreDataConverters'

vi.mock('firebase/firestore')

describe('fireStoreDataConverters', () => {
  test('userDataConverter "complete data"', () => {
    const mockedQuerySnapshot = {
      records: {
        userDapplets: [...mockUserDapplets],
        userTags: [...mockUserTags],
        userLists: [...mockUserLists],
      },
      data: function () {
        return this.records
      },
    }

    const convertedUserData = userDataConverter(
      mockedQuerySnapshot as unknown as DocumentSnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedUserData).toEqual(mockedQuerySnapshot.records)
  })

  test('userDataConverter "data is incomplete"', () => {
    const mackedQuerySnapshot = {
      records: {},
      data: function () {
        return this.records
      },
    }

    const convertedUserData = userDataConverter(
      mackedQuerySnapshot as unknown as DocumentSnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedUserData).toEqual({
      userDapplets: [],
      userLists: [],
      userTags: [],
    })
  })
})
