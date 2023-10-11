import { FC } from 'react'

import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { removeUserTagFromDapplet } from 'services/userData/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  EDappletOperation,
  IDappletOperation,
} from 'store/slices/userDataSlice'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletTags.module.css'

export interface DappletTagsProps {
  userStyles?: string
  dappletId: string
  dappletState: boolean
  dappletOperationGoing?: IDappletOperation[]
}

const DappletTags: FC<DappletTagsProps> = ({
  userStyles = '',
  dappletId,
  dappletState,
  dappletOperationGoing = [],
}) => {
  const windowInnerWidth = useResize()

  const dispatch = useAppDispatch()

  const { dapplets, tags } = useAppSelector(state => state.dapplets)
  const { userDapplets, userTags } = useAppSelector(state => state.userData)

  const targetAllDapplet = dapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  const targetMyDapplets = userDapplets.filter(
    dapplet => dapplet.dappletId === dappletId,
  )[0]

  const onClickHandler = (userTagId: string) => {
    void dispatch(
      removeUserTagFromDapplet({
        dappletId,
        userTagId,
      }),
    )
  }

  return (
    <div className={cc([styles.root, userStyles])}>
      {targetMyDapplets &&
        targetMyDapplets.userTags.map(tagId => {
          const tagName = userTags.filter(tag => tag.tagId === tagId)[0]
            ?.tagName

          return (
            <SmartTag
              key={nanoid()}
              mode={SmartTagMode.MY_TAG}
              tagId={tagId}
              label={tagName}
              onClick={onClickHandler}
              loading={Boolean(
                dappletOperationGoing.filter(
                  operation =>
                    operation.dappletId === dappletId &&
                    operation.userTagId === tagId &&
                    operation.operation === EDappletOperation.REMOVE_USER_TAG,
                ).length,
              )}
            />
          )
        })}

      {targetAllDapplet &&
        targetAllDapplet.communityTags.map(tagId => {
          const tagName = tags.filter(tag => tag.tagId === tagId)[0]?.tagName

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
