import { IList } from 'store/slices/userDataSlice'

import { fireStoreSetDoc } from '../fireStoreAPI'

export const apiRemoveUserList = async (
  newData: {
    userLists: IList[]
  },
  uid: string,
) => await fireStoreSetDoc(newData, 'UsersData', uid, { merge: true })
