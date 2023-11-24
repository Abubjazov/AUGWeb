import * as firestoreApi from 'api/fireStore/fireStoreAPI'
import { userDataConverter } from 'api/fireStore/fireStoreDataConverters/fireStoreDataConverters'

import { apiGetUserData } from '../apiGetUserData'

describe('apiGetUserData', () => {
  test('apiGetUserData call resolved', async () => {
    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreGetDoc')
      .mockResolvedValueOnce([{ tagId: 'tagId', tagName: 'tagName' }])

    await apiGetUserData('userId')

    expect(mockedFirestoreApi).toHaveBeenCalledWith(
      'UsersData',
      'userId',
      userDataConverter,
    )

    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
