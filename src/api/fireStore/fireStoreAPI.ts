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
import { IWhere, TLastVisible } from 'store/slices/dappletsSlice'

export type TFirestoreQueryParams = [
  CollectionReference<DocumentData, DocumentData>,
  QueryLimitConstraint,
  QueryStartAtConstraint,
  QueryFieldFilterConstraint,
]

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
  withWhere?: IWhere,
) => {
  const db = getFirestore()

  const queryParams = [
    collection(db, collectionName),
    withLimit ? limit(withLimit) : undefined,
    withStartAfter ? startAfter(withStartAfter) : undefined,
    withWhere
      ? where(withWhere.field, withWhere.operator, withWhere.comparisonValue)
      : undefined,
  ].filter(param => param !== undefined) as TFirestoreQueryParams

  const collectionRef = query(...queryParams)

  const querySnapshot = await getDocs(collectionRef)

  return dataConverter(querySnapshot)
}
