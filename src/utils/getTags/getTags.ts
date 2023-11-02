import { IDapplet, ITag } from 'store/slices/dappletsSlice'
import { IUserDapplet } from 'store/slices/userDataSlice'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'

// export const getTags = (
//   dappletId: string,
//   tags: ITag[],
//   dapplets: IDapplet[] | IUserDapplet[],
// ): IDapplet[] | IUserDapplet[] => {
//   const targetDapplet = dapplets.filter(
//     dapplet => dapplet.dappletId === dappletId,
//   )[0]lf

//   if (targetDapplet?.communityTags?.length) {
//     const resTags: ITag[] = targetDapplet.communityTags.map(tagId => {
//       const tagName = tags.filter(tag => tag.tagId === tagId)[0]?.tagName
//       return { tagId, tagName }
//     })

//     return resTags
//   }

//   return []
// }

export const getTags = (
  dappletId: string,
  tagMode: ESmartTagMode,
  dapplets: IDapplet[],
  userDapplets: IUserDapplet[],
  tags: ITag[],
  userTags: ITag[],
) => {
  if (tagMode === ESmartTagMode.COMMUNITY_TAG) {
    const targetDapplet = dapplets.filter(
      dapplet => dapplet.dappletId === dappletId,
    )[0]

    if (targetDapplet?.communityTags?.length) {
      const resTags: ITag[] = targetDapplet.communityTags.map(tagId => {
        const tagName = tags.filter(tag => tag.tagId === tagId)[0]?.tagName
        return { tagId, tagName }
      })

      return resTags
    }
  }

  if (tagMode === ESmartTagMode.MY_TAG) {
    const targetDapplet = userDapplets.filter(
      dapplet => dapplet.dappletId === dappletId,
    )[0]

    if (targetDapplet?.userTags?.length) {
      const resTags: ITag[] = targetDapplet.userTags.map(tagId => {
        const tagName = userTags.filter(tag => tag.tagId === tagId)[0]?.tagName
        return { tagId, tagName }
      })

      return resTags
    }
  }

  return []
}
