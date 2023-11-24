import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiRemoveUserTagFromDapplet } from '../apiRemoveUserTagFromDapplet'

describe('apiRemoveUserTagFromDapplet', () => {
  test('apiRemoveUserTagFromDapplet call resolved', async () => {
    const newData = {
      userDapplets: [
        {
          dappletId: 'dappletId',
          userTags: [],
          dappletState: false,
        },
      ],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiRemoveUserTagFromDapplet(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
