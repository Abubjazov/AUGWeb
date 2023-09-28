import { FC } from 'react'

import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeMyTagFromDapplet } from 'store/slices/myDappletsSlice'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletTags.module.css'

export interface DappletTagsProps {
  userStyles?: string
  dappletId: string
  dappletState: boolean
}

const DappletTags: FC<DappletTagsProps> = ({
  userStyles = '',
  dappletId,
  dappletState,
}) => {
  const windowInnerWidth = useResize()

  const dispatch = useAppDispatch()

  const allDapplets = useAppSelector(state => state.dapplets.dapplets)
  const myDapplets = useAppSelector(state => state.myDapplets.myDapplets)
  const communityTags = useAppSelector(state => state.dapplets.tags)

  const targetAllDapplet = allDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  const targetMyDapplets = myDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  return (
    <div className={cc([styles.root, userStyles])}>
      {targetMyDapplets &&
        targetMyDapplets.userTags.map(tag => (
          <SmartTag
            key={nanoid()}
            mode={SmartTagMode.MY_TAG}
            tagId={tag.tagId}
            label={tag.tagName}
            onClick={() =>
              dispatch(
                removeMyTagFromDapplet({
                  dappletId: dappletId,
                  userTagId: tag.tagId,
                }),
              )
            }
          />
        ))}

      {targetAllDapplet &&
        targetAllDapplet.communityTags.map(tagId => {
          const tagName = communityTags.filter(tag => tag.tagId === tagId)[0]
            .tagName

          return (
            <SmartTag
              key={nanoid()}
              mode={SmartTagMode.COMMUNITY_TAG}
              tagId={tagId}
              label={tagName}
            />
          )
        })}

      {windowInnerWidth <= 880 && dappletState && (
        <button
          type="button"
          data-testid="cross-button"
          className={styles.button}
        >
          +
        </button>
      )}
    </div>
  )
}

export default DappletTags
