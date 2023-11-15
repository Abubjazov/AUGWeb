import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ISignUpData } from 'store/slices/authSlice'

export const apiCreateUser = async (data: ISignUpData) => {
  const auth = getAuth()
  const db = getFirestore()

  await createUserWithEmailAndPassword(auth, data.email, data.password).then(
    async user => {
      await setDoc(doc(db, 'UsersData', user.user.uid), {
        userDapplets: [],
        userTags: [],
        userLists: [],
      })
    },
  )
}
