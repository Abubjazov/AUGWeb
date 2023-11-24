import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  limit,
  startAfter,
  where,
} from 'firebase/firestore'
import { ELastVisible, EQueryOperator } from 'store/slices/dappletsSlice'

import {
  fireStoreGetCollection,
  fireStoreGetDoc,
  fireStoreSetDoc,
} from './fireStoreAPI'

vi.mock('firebase/firestore')

describe('fireStoreAPI', () => {
  test('fireStoreSetDoc call resolved', async () => {
    const mockedDoc = vi.mocked(doc)
    const mockedSetDoc = vi.mocked(setDoc)

    await fireStoreSetDoc('data', 'collectionName', 'documentName', {
      merge: true,
    })

    expect(mockedDoc).toHaveBeenCalledTimes(1)
    expect(mockedDoc).toHaveBeenCalledWith(
      undefined,
      'collectionName',
      'documentName',
    )

    expect(mockedSetDoc).toHaveBeenCalledTimes(1)
    expect(mockedSetDoc).toHaveBeenCalledWith(undefined, 'data', {
      merge: true,
    })

    vi.resetAllMocks()
  })

  test('fireStoreGetDoc call resolved', async () => {
    const mockedDoc = vi.mocked(doc)
    const mockedGetDoc = vi.mocked(getDoc)

    const mockedDataConverter = vi.fn()

    await fireStoreGetDoc('collectionName', 'documentName', mockedDataConverter)

    expect(mockedDoc).toHaveBeenCalledTimes(1)
    expect(mockedDoc).toHaveBeenCalledWith(
      undefined,
      'collectionName',
      'documentName',
    )

    expect(mockedGetDoc).toHaveBeenCalledTimes(1)
    expect(mockedGetDoc).toHaveBeenCalledWith(undefined)

    expect(mockedDataConverter).toHaveBeenCalledTimes(1)
    expect(mockedDataConverter).toHaveBeenCalledWith(undefined)

    vi.resetAllMocks()
  })

  describe('fireStoreGetCollection', () => {
    test('fireStoreGetCollection default call resolved', async () => {
      const mockedCollection = vi.mocked(collection)
      const mockedQuery = vi.mocked(query)
      const mockedGetDocs = vi.mocked(getDocs)

      const mockedDataConverter = vi.fn()

      await fireStoreGetCollection('collectionName', mockedDataConverter)

      expect(mockedCollection).toHaveBeenCalledTimes(1)
      expect(mockedCollection).toHaveBeenCalledWith(undefined, 'collectionName')

      expect(mockedQuery).toHaveBeenCalledTimes(1)

      expect(mockedGetDocs).toHaveBeenCalledTimes(1)

      expect(mockedDataConverter).toHaveBeenCalledTimes(1)

      vi.resetAllMocks()
    })

    test('fireStoreGetCollection call "withWhere & withLimit & withStartAfter" resolved', async () => {
      const testWhere = {
        field: 'fieldName',
        operator: EQueryOperator.ARRAY_CONTAINS,
        comparisonValue: 'value',
      }

      const mockedCollection = vi.mocked(collection)
      const withLimit = vi.mocked(limit)
      const withStartAfter = vi.mocked(startAfter)
      const mockedWhere = vi.mocked(where)
      const mockedQuery = vi.mocked(query)
      const mockedGetDocs = vi.mocked(getDocs)

      const mockedDataConverter = vi.fn()

      await fireStoreGetCollection(
        'collectionName',
        mockedDataConverter,
        13,
        ELastVisible.NO_MORE_DAPPLETS,
        testWhere,
      )

      expect(mockedCollection).toHaveBeenCalledTimes(1)
      expect(mockedCollection).toHaveBeenCalledWith(undefined, 'collectionName')

      expect(withLimit).toHaveBeenCalledTimes(1)
      expect(withLimit).toHaveBeenCalledWith(13)

      expect(withStartAfter).toHaveBeenCalledTimes(1)
      expect(withStartAfter).toHaveBeenCalledWith(ELastVisible.NO_MORE_DAPPLETS)

      expect(mockedWhere).toHaveBeenCalledTimes(1)
      expect(mockedWhere).toHaveBeenCalledWith(...Object.values(testWhere))

      expect(mockedQuery).toHaveBeenCalledTimes(1)

      expect(mockedGetDocs).toHaveBeenCalledTimes(1)

      expect(mockedDataConverter).toHaveBeenCalledTimes(1)

      vi.resetAllMocks()
    })
  })
})
