import {
  DocumentSnapshot,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore'
import {
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'

import { tagsDataConverter, userDataConverter } from './fireStoreDataConverters'

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
    const mackedDocumentSnapshot = {
      records: {},
      data: function () {
        return this.records
      },
    }

    const convertedUserData = userDataConverter(
      mackedDocumentSnapshot as unknown as DocumentSnapshot<
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

  test('tagsDataConverter', () => {
    const mockedQuerySnapshot = {
      docs: mockUserTags.map(tag => {
        return {
          id: tag.tagId,
          records: { tagName: tag.tagName },
          data: function () {
            return this.records
          },
        }
      }),
    }

    const convertedTagsData = tagsDataConverter(
      mockedQuerySnapshot as unknown as QuerySnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedTagsData).toEqual(
      mockUserTags.map(tag => ({ tagId: tag.tagId, tagName: tag.tagName })),
    )
  })
})
