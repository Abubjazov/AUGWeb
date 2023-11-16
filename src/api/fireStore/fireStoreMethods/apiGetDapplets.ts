import { IGetDappletOptions } from 'store/asyncThunks/dapplets'

import { fireStoreGetCollection } from '../fireStoreAPI'
import { dappletsDataConverter } from '../fireStoreDataConverters/fireStoreDataConverters'

export const apiGetDapplets = async (options: IGetDappletOptions) => {
  const { withLimit, withStartAfter, withWhere } = options

  return await fireStoreGetCollection(
    'Dapplets',
    dappletsDataConverter,
    withLimit,
    withStartAfter,
    withWhere,
  )
}
