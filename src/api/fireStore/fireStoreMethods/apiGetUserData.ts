import { getAuth } from 'firebase/auth'

import { fireStoreGetDoc } from '../fireStoreAPI'
import { userDataConverter } from '../fireStoreDataConverters/fireStoreDataConverters'

export const apiGetUserData = async () => {
  const auth = getAuth()
  const uid = auth.currentUser?.uid

  if (!uid) {
    throw new Error('An error occurred while trying to load the user data')
  }

  return await fireStoreGetDoc('UsersData', uid, userDataConverter)
}
