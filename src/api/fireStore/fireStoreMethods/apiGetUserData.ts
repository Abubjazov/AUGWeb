import { fireStoreGetDoc } from '../fireStoreAPI'
import { userDataConverter } from '../fireStoreDataConverters/fireStoreDataConverters'

export const apiGetUserData = async (uid: string) =>
  await fireStoreGetDoc('UsersData', uid, userDataConverter)
