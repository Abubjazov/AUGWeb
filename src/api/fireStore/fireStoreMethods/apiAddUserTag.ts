import { ITag } from 'store/slices/dappletsSlice'

import { fireStoreSetDoc } from '../fireStoreAPI'

export const apiAddUserTag = async (
  newData: {
    userTags: ITag[]
  },
  uid: string,
) => await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })
