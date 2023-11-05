import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { IDapplet, ITag, TLastVisible } from 'store/slices/dappletsSlice'
import { IList, IUserDapplet, IUserDataState } from 'store/slices/userDataSlice'

export const getFirebaseIconUrl = async (url: string) => {
  const storage = getStorage()
  const starsRef = ref(storage, url)

  return getDownloadURL(starsRef).then(
    url => {
      return url
    },
    () => {
      return '/images/notAvailable.svg'
    },
  )
}

export const dappletsDataConverter = async (
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
) => {
  const dapplets: IDapplet[] = []
  const lastVisible: TLastVisible =
    querySnapshot?.docs[querySnapshot.docs.length - 1]

  for (const doc of querySnapshot.docs) {
    const logoUrl = await getFirebaseIconUrl(String(doc.data().logo))

    dapplets.push({
      dappletId: doc.id,
      appOwner: (doc.data()?.appOwner as string) || 'N/A',
      circulatingSupply: (doc.data()?.circulatingSupply as string) || 'N/A',
      communityTags: (doc.data()?.communityTags as string[]) || 'N/A',
      date: (doc.data()?.date as string) || 'N/A',
      fullDesc: (doc.data()?.fullDesc as string) || 'N/A',
      fullyDilutedMarketCap:
        (doc.data()?.fullyDilutedMarketCap as string) || 'N/A',
      logo: logoUrl,
      marketCap: (doc.data()?.marketCap as string) || 'N/A',
      maxSupply: (doc.data()?.maxSupply as string) || 'N/A',
      name: (doc.data()?.name as string) || 'N/A',
      shortDesc: (doc.data()?.shortDesc as string) || 'N/A',
      shortName: (doc.data()?.shortName as string) || 'N/A',
      totalSupply: (doc.data()?.totalSupply as string) || 'N/A',
      volume: (doc.data()?.volume as string) || 'N/A',
      volumePerMarketCap: (doc.data()?.volumePerMarketCap as string) || 'N/A',
    })
  }

  return { dapplets, lastVisible }
}

export const tagsDataConverter = (
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
): Pick<IUserDataState, 'userDapplets' | 'userTags' | 'userLists'> => ({
  userDapplets: (querySnapshot.data()?.userDapplets || []) as IUserDapplet[],
  userTags: (querySnapshot.data()?.userTags || []) as ITag[],
  userLists: (querySnapshot.data()?.userLists || []) as IList[],
})
