import * as firestoreApi from 'api/fireStore/fireStoreAPI'

import { apiInstallDapplet } from '../apiInstallDapplet'

describe('apiInstallDapplet', () => {
  test('apiInstallDapplet call resolved', async () => {
    const newData = {
      userDapplets: [
        {
          dappletId: 'dappletId',
          userTags: ['userTagId'],
          dappletState: true,
        },
      ],
    }
    const uid = 'userId'

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreSetDoc')
      .mockResolvedValueOnce()

    await apiInstallDapplet(newData, uid)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(newData, 'UsersData', uid, {
      merge: true,
    })
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
