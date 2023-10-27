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
} from 'firebase/firestore'
import { TLastVisible } from 'store/slices/dappletsSlice'

export const fireStoreSetDoc = async (
  data: Partial<unknown>,
  collectionName: string,
  documentName: string,
  options: SetOptions = {},
) => {
  const db = getFirestore()
  const docRef = doc(db, collectionName, documentName)

  await setDoc(docRef, data, options)
}

export const fireStoreGetDoc = async <T>(
  collectionName: string,
  documentName: string,
  dataConverter: (
    docSnapshot: DocumentSnapshot<DocumentData, DocumentData>,
  ) => T,
) => {
  const db = getFirestore()
  const docRef = doc(db, collectionName, documentName)

  const docSnapshot = await getDoc(docRef)

  return dataConverter(docSnapshot)
}

export const fireStoreGetCollection = async <T>(
  collectionName: string,
  dataConverter: (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
  ) => T,
  withLimit?: number,
  withStartAfter?: TLastVisible,
) => {
  const db = getFirestore()

  const getCollectionRef = () => {
    if (withLimit && !withStartAfter)
      return query(collection(db, collectionName), limit(withLimit))

    if (withLimit && withStartAfter)
      return query(
        collection(db, collectionName),
        limit(withLimit),
        startAfter(withStartAfter),
      )

    return query(collection(db, collectionName))
  }

  const collectionRef = getCollectionRef()

  const querySnapshot = await getDocs(collectionRef)

  return dataConverter(querySnapshot)
}
