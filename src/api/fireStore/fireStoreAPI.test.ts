import {
  DocumentData,
  DocumentSnapshot,
  SetOptions,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  collection,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  where,
  CollectionReference,
  QueryLimitConstraint,
  QueryFieldFilterConstraint,
  QueryStartAtConstraint,
} from 'firebase/firestore'

import { fireStoreGetDoc, fireStoreSetDoc } from './fireStoreAPI'

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
})
