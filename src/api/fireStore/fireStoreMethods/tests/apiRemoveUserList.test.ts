import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiRemoveUserList } from '../apiRemoveUserList'

describe('apiRemoveUserList', () => {
  test('apiRemoveUserList call resolved', async () => {
    const newData = {
      userLists: [],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiRemoveUserList(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
