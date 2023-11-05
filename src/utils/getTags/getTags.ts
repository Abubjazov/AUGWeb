import { IDapplet, ITag } from 'store/slices/dappletsSlice'
import { IUserDapplet } from 'store/slices/userDataSlice'

export const getTags = (
  dappletId: string,
  tags: ITag[],
  dapplets: (IDapplet | IUserDapplet)[],
): ITag[] => {
  let targetDapplet: IDapplet | IUserDapplet = dapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  let dappletTags: string[] = []

  if (
    targetDapplet &&
    Object.prototype.hasOwnProperty.call(targetDapplet, 'communityTags')
  ) {
    targetDapplet = targetDapplet as IDapplet

    typeof targetDapplet?.communityTags !== 'string'
      ? targetDapplet.communityTags
      : []
  }

  if (
    targetDapplet &&
    Object.prototype.hasOwnProperty.call(targetDapplet, 'userTags')
  ) {
    targetDapplet = targetDapplet as IUserDapplet
    dappletTags =
      typeof targetDapplet?.userTags !== 'string' ? targetDapplet.userTags : []
  }

  if (dappletTags.length) {
    const result: ITag[] = dappletTags.map(tagId => {
      const tagName = tags.filter(tag => tag.tagId === tagId)[0]?.tagName
      return { tagId, tagName }
    })

    return result
  }

  return []
}
