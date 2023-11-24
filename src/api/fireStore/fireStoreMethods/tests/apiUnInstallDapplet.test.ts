import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiUnInstallDapplet } from '../apiUnInstallDapplet'

describe('apiUnInstallDapplet', () => {
  test('apiUnInstallDapplet call resolved', async () => {
    const newData = {
      userDapplets: [
        {
          dappletId: 'dappletId',
          userTags: ['userTagId'],
          dappletState: false,
        },
      ],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiUnInstallDapplet(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
