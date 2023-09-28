import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { IDapplet, ITag } from 'store/slices/dappletsSlice'
import { IMyDapplet, TMyDapplets } from 'store/slices/myDappletsSlice'

const getFirebaseIconUrl = async (url: string) => {
  const storage = getStorage()
  const starsRef = ref(storage, url)

  return getDownloadURL(starsRef).then(
    url => {
      return url
    },
    () => {
      return '/src/mockData/logos/dyson.svg'
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
): TMyDapplets => ({
  myDapplets: (querySnapshot.data()?.userDapplets || []) as IMyDapplet[],
  myTags: (querySnapshot.data()?.userTags || []) as ITag[],
})

// class Dapplet implements IDapplet {
//   dappletId: string
//   logo: string
//   name: string
//   date: number
//   shortDesc: string
//   fullDesc: string
//   appOwner: string
//   communityTags: ITag[]
//   semperNeque: string
//   aliquam: string
//   urna: string
//   leoIpsum: string
//   inEuismod: string
//   namDiam: string
//   elitSagittis: string
//   justoAmet: string
//   constructor(
//     dappletId: string,
//     logo: string,
//     name: string,
//     date: number,
//     shortDesc: string,
//     fullDesc: string,
//     appOwner: string,
//     communityTags: ITag[],
//     semperNeque: string,
//     aliquam: string,
//     urna: string,
//     leoIpsum: string,
//     inEuismod: string,
//     namDiam: string,
//     elitSagittis: string,
//     justoAmet: string,
//   ) {
//     this.dappletId = dappletId
//     this.logo = logo
//     this.name = name
//     this.date = date
//     this.shortDesc = shortDesc
//     this.fullDesc = fullDesc
//     this.appOwner = appOwner
//     this.communityTags = communityTags
//     this.semperNeque = semperNeque
//     this.aliquam = aliquam
//     this.urna = urna
//     this.leoIpsum = leoIpsum
//     this.inEuismod = inEuismod
//     this.namDiam = namDiam
//     this.elitSagittis = elitSagittis
//     this.justoAmet = justoAmet
//   }
// }
// export const getCommunityTags = createAsyncThunk(
//   'auth/getCommunityTags',
//   async (_, { rejectWithValue, dispatch }) => {
//     const db = getFirestore()

//     try {
//       const collectionRef = collection(db, 'CommunityTags')

//       const querySnapshot = await getDocs(collectionRef)

//       const tags: ITag[] = communityTagsDataConverter(querySnapshot)

//       dispatch(setTags(tags))
//     } catch (e) {
//       return rejectWithValue(
//         typeof e == 'object' && !!e && 'message' in e
//           ? (e.message as string)
//           : 'Sorry, an unknown error occurred',
//       )
//     }
//   },
// )

// import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
// import { app } from 'store/index'
// import { ISignUpData } from 'store/slices/authSlice'

// export const getUsers = createAsyncThunk(
//   'auth/getUsers',
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`)

//       if (!response.ok) {
//         throw new Error('An error occurred while trying to load the user list')
//       }

//       const fetchData = (await response.json()) as IUser[]

//       dispatch(setUsersState(fetchData))
//     } catch (e) {
//   return rejectWithValue(
//     typeof e == 'object' && !!e && 'message' in e
//       ? (e.message as string)
//       : 'Sorry, an unknown error occurred',
//   )
//     }
//   },
// )

// const dappletConverter = {
//   toFirestore: (dapplets: IDapplet[]) => {
//     return dapplets.map(dapplet => ({
//       dappletId: dapplet.dappletId,
//       logo: dapplet.logo,
//       name: dapplet.name,
//       date: dapplet.date,
//       shortDesc: dapplet.shortDesc,
//       fullDesc: dapplet.fullDesc,
//       appOwner: dapplet.appOwner,
//       communityTags: dapplet.communityTags,
//       semperNeque: dapplet.semperNeque,
//       aliquam: dapplet.aliquam,
//       urna: dapplet.urna,
//       leoIpsum: dapplet.leoIpsum,
//       inEuismod: dapplet.inEuismod,
//       namDiam: dapplet.namDiam,
//       elitSagittis: dapplet.elitSagittis,
//       justoAmet: dapplet.justoAmet,
//     }))
//   },

//   fromFirestore: (snapshot: any, options: any) => {
//     const data: Dapplet[] = snapshot.data(options) as Dapplet[]
//     return data.map(
//       dapplet =>
//         new Dapplet(
//           dapplet.dappletId,
//           dapplet.logo,
//           dapplet.name,
//           dapplet.date,
//           dapplet.shortDesc,
//           dapplet.fullDesc,
//           dapplet.appOwner,
//           dapplet.communityTags,
//           dapplet.semperNeque,
//           dapplet.aliquam,
//           dapplet.urna,
//           dapplet.leoIpsum,
//           dapplet.inEuismod,
//           dapplet.namDiam,
//           dapplet.elitSagittis,
//           dapplet.justoAmet,
//         ),
//     )
//   },
// }
