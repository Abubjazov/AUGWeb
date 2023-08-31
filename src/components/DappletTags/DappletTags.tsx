import { FC } from 'react'

import { useResize } from 'hooks/useResize'
import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeMyTagFromDapplet } from 'store/slices/myDappletsSlice'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './DappletTags.module.css'

export interface DappletTagsProps {
  testInnerSize?: boolean
  userStyles?: string
  dappletId: number
  dappletState: boolean
}

const DappletTags: FC<DappletTagsProps> = ({
  userStyles = '',
  dappletId,
  dappletState,
  testInnerSize,
}) => {
  const windowInnerWidth = useResize()

  const dispatch = useAppDispatch()

  const allDapplets = useAppSelector(state => state.dapplets.dapplets)
  const myDapplets = useAppSelector(state => state.myDapplets.myDapplets)

  const targetAllDapplet = allDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  const targetMyDapplets = myDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  return (
    <div className={cc([styles.root, userStyles])}>
      {targetMyDapplets &&
        targetMyDapplets.userTags.map(item => (
          <SmartTag
            key={nanoid()}
            mode={SmartTagMode.MY_TAG}
            tagId={item.tagId}
            label={item.tagName}
            onClick={() =>
              dispatch(
                removeMyTagFromDapplet({
                  dappletId: dappletId,
                  userTagId: item.tagId,
                }),
              )
            }
          />
        ))}

      {targetAllDapplet &&
        targetAllDapplet.communityTags.map(item => (
          <SmartTag
            key={nanoid()}
            mode={SmartTagMode.COMMUNITY_TAG}
            tagId={item.tagId}
            label={item.tagName}
          />
        ))}

      {(testInnerSize || windowInnerWidth <= 880) && dappletState ? (
        <button
          type="button"
          data-testid="cross-button"
          className={styles.button}
        >
          +
        </button>
      ) : null}
    </div>
  )
}

export default DappletTags
