import * as firestoreApi from 'api/fireStore/fireStoreAPI'
import { tagsDataConverter } from 'api/fireStore/fireStoreDataConverters/fireStoreDataConverters'

import { apiGetCommunityTags } from '../apiGetCommunityTags'

describe('apiGetCommunityTags', () => {
  test('apiGetCommunityTags call resolved', async () => {
    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreGetCollection')
      .mockResolvedValueOnce([{ tagId: 'tagId', tagName: 'tagName' }])

    await apiGetCommunityTags()

    expect(mockedFirestoreApi).toHaveBeenCalledWith(
      'CommunityTags',
      tagsDataConverter,
    )
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
