import { getAuth, signOut } from 'firebase/auth'

export const apiLogOut = async () => {
  const auth = getAuth()

  await signOut(auth)
}
