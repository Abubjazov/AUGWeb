import { FC } from 'react'

import AddUserTagModalContent from 'components/AddUserTagModalContent'
import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { removeUserTagFromDapplet } from 'services/userData/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ITag } from 'store/slices/dappletsSlice'
import { setModalInner, setModalState } from 'store/slices/layoutSlice'
import {
  EDappletOperation,
  IDappletOperation,
} from 'store/slices/userDataSlice'
import SmartTag from 'uikit/SmartTag'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletTags.module.css'

export interface DappletTagsProps {
  userStyles?: string
  dappletId: string
  dappletUserTags: ITag[] | string
  dappletCommunityTags: ITag[] | string
  dappletState: boolean
  dappletOperationGoing?: IDappletOperation[]
}

const DappletTags: FC<DappletTagsProps> = ({
  userStyles = '',
  dappletId,
  dappletUserTags,
  dappletCommunityTags,
  dappletState,
  dappletOperationGoing = [],
}) => {
  const windowInnerWidth = useResize()

  const { userTags } = useAppSelector(state => state.userData)

  const dispatch = useAppDispatch()

  const onClickHandler = (userTagId: string) => {
    void dispatch(
      removeUserTagFromDapplet({
        dappletId,
        userTagId,
      }),
    )
  }

  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    dispatch(setModalInner(<AddUserTagModalContent dappletId={dappletId} />))
    dispatch(setModalState(true))
  }

  return (
    <div className={cc([styles.root, userStyles])}>
      {dappletUserTags &&
        typeof dappletUserTags !== 'string' &&
        dappletUserTags.map(userTag => {
          const loading = Boolean(
            dappletOperationGoing.filter(
              operation =>
                operation.dappletId === dappletId &&
                operation.userTagId === userTag.tagId &&
                operation.operation === EDappletOperation.REMOVE_USER_TAG,
            ).length,
          )

          return (
            <SmartTag
              key={nanoid()}
              mode={ESmartTagMode.MY_TAG}
              tagId={userTag.tagId}
              label={userTag.tagName}
              onClick={onClickHandler}
              loading={loading}
            />
          )
        })}

      {dappletCommunityTags &&
        typeof dappletCommunityTags !== 'string' &&
        dappletCommunityTags.map(communityTag => (
          <SmartTag
            key={nanoid()}
            mode={ESmartTagMode.COMMUNITY_TAG}
            tagId={communityTag.tagId}
            label={communityTag.tagName}
          />
        ))}

      {windowInnerWidth <= 880 && dappletState && userTags?.length ? (
        <button
          type="button"
          data-testid="add-tag-button"
          className={styles.button}
          onClick={buttonClickHandler}
        >
          +
        </button>
      ) : null}
    </div>
  )
}

export default DappletTags
