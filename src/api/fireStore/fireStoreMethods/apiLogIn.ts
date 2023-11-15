import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ISignUpData } from 'store/slices/authSlice'

export const apiLogIn = async (data: ISignUpData) => {
  const auth = getAuth()

  await signInWithEmailAndPassword(auth, data.email, data.password)
}
