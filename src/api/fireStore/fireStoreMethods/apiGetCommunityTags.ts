import { fireStoreGetCollection } from '../fireStoreAPI'
import { tagsDataConverter } from '../fireStoreDataConverters/fireStoreDataConverters'

export const apiGetCommunityTags = async () => {
  return await fireStoreGetCollection('CommunityTags', tagsDataConverter)
}
