import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { IDapplet, ITag } from 'store/slices/dappletsSlice'
import { IUserDapplet, IUserDataState } from 'store/slices/userDataSlice'

export const getFirebaseIconUrl = async (url: string) => {
  const storage = getStorage()
  const starsRef = ref(storage, url)

  return getDownloadURL(starsRef).then(
    url => {
      return url
    },
    () => {
      return '/notAvailable.svg'
    },
  )
}

export const dappletsDataConverter = async (
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
) => {
  const dapplets: IDapplet[] = []

  for (const doc of querySnapshot.docs) {
    const logoUrl = await getFirebaseIconUrl(String(doc.data().logo))

    dapplets.push({
      dappletId: doc.id,
      logo: logoUrl,
      name: doc.data().name as string,
      date: doc.data().date as number,
      shortDesc: doc.data().shortDesc as string,
      fullDesc: doc.data().fullDesc as string,
      appOwner: doc.data().appOwner as string,
      communityTags: doc.data().communityTags as string[],
      semperNeque: doc.data().semperNeque as string,
      aliquam: doc.data().aliquam as string,
      urna: doc.data().urna as string,
      leoIpsum: doc.data().leoIpsum as string,
      inEuismod: doc.data().inEuismod as string,
      namDiam: doc.data().namDiam as string,
      elitSagittis: doc.data().elitSagittis as string,
      justoAmet: doc.data().justoAmet as string,
    })
  }

  return dapplets
}

export const communityTagsDataConverter = (
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
) => {
  const tags: ITag[] = []

  for (const doc of querySnapshot.docs) {
    tags.push({
      tagId: doc.id,
      tagName: doc.data().tagName as string,
    })
  }
  return tags
}

export const userDataConverter = (
  querySnapshot: DocumentSnapshot<DocumentData, DocumentData>,
): Pick<IUserDataState, 'userDapplets' | 'userTags'> => ({
  userDapplets: (querySnapshot.data()?.userDapplets || []) as IUserDapplet[],
  userTags: (querySnapshot.data()?.userTags || []) as ITag[],
})
