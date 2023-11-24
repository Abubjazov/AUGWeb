import * as firestoreApi from 'api/fireStore/fireStoreAPI'
import { dappletsDataConverter } from 'api/fireStore/fireStoreDataConverters/fireStoreDataConverters'
import { ELastVisible, EQueryOperator } from 'store/slices/dappletsSlice'

import { apiGetDapplets } from '../apiGetDapplets'

describe('apiGetDapplets', () => {
  test('apiGetDapplets call resolved', async () => {
    const getDappletOptions = {
      withLimit: 13,
      withStartAfter: ELastVisible.NO_MORE_DAPPLETS,
      withWhere: {
        field: 'fieldName',
        operator: EQueryOperator.ARRAY_CONTAINS,
        comparisonValue: 'value',
      },
    }

    const mockedFirestoreApi = vi
      .spyOn(firestoreApi, 'fireStoreGetCollection')
      .mockResolvedValueOnce([{ tagId: 'tagId', tagName: 'tagName' }])

    await apiGetDapplets(getDappletOptions)

    expect(mockedFirestoreApi).toHaveBeenCalledWith(
      'Dapplets',
      dappletsDataConverter,
      getDappletOptions.withLimit,
      getDappletOptions.withStartAfter,
      getDappletOptions.withWhere,
    )
    expect(mockedFirestoreApi).toHaveBeenCalledTimes(1)
  })
})
