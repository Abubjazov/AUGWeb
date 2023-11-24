import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiAddUserList } from '../apiAddUserList'

describe('apiAddUserList', () => {
  test('apiAddUserList call resolved', async () => {
    const newData = {
      userLists: [
        {
          listId: 'listId',
          listName: 'listName',
        },
      ],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiAddUserList(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
