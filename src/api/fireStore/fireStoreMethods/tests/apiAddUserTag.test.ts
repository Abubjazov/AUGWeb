import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiAddUserTag } from '../apiAddUserTag'

describe('apiAddUserTag', () => {
  test('apiAddUserTag call resolved', async () => {
    const newData = {
      userTags: [
        {
          tagId: 'tagId',
          tagName: 'tagName',
        },
      ],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiAddUserTag(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
