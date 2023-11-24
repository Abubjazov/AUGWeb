import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiRemoveUserTag } from '../apiRemoveUserTag'

describe('apiRemoveUserTag', () => {
  test('apiRemoveUserTag call resolved', async () => {
    const newData = {
      userDapplets: [
        {
          dappletId: 'dappletId',
          userTags: [],
          dappletState: true,
        },
      ],
      userTags: [],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiRemoveUserTag(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
