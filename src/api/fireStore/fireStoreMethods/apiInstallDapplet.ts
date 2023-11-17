import { IUserDapplet } from 'store/slices/userDataSlice'

import { fireStoreSetDoc } from '../fireStoreAPI'

export const apiInstallDapplet = async (
  newData: {
    userDapplets: IUserDapplet[]
  },
  uid: string,
) => await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })
