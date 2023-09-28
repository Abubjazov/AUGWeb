import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {
  communityTagsDataConverter,
  dappletsDataConverter,
} from 'services/firebaseDataConverters/firebaseDataConverters'
import {
  IDapplet,
  ITag,
  setDapplets,
  setTags,
} from 'store/slices/dappletsSlice'

export const getDapplets = createAsyncThunk(
  'auth/getDapplets',
  async (_, { rejectWithValue, dispatch }) => {
    const db = getFirestore()

    try {
      const collectionRef = collection(db, 'Dapplets')

      const querySnapshot = await getDocs(collectionRef)

      const dapplets: IDapplet[] = await dappletsDataConverter(querySnapshot)

      dispatch(setDapplets(dapplets))
    } catch (e) {
      return rejectWithValue(
        typeof e == 'object' && !!e && 'message' in e
          ? (e.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)

export const getCommunityTags = createAsyncThunk(
  'auth/getCommunityTags',
  async (_, { rejectWithValue, dispatch }) => {
    const db = getFirestore()

    try {
      const collectionRef = collection(db, 'CommunityTags')

      const querySnapshot = await getDocs(collectionRef)

      const tags: ITag[] = communityTagsDataConverter(querySnapshot)

      dispatch(setTags(tags))
    } catch (e) {
      return rejectWithValue(
        typeof e == 'object' && !!e && 'message' in e
          ? (e.message as string)
          : 'Sorry, an unknown error occurred',
      )
    }
  },
)

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
