import { ITag } from 'store/slices/dappletsSlice'
import { IUserDapplet } from 'store/slices/userDataSlice'

import { fireStoreSetDoc } from '../fireStoreAPI'

export const apiRemoveUserTag = async (
  newData: {
    userDapplets: IUserDapplet[]
    userTags: ITag[]
  },
  uid: string,
) => await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })
