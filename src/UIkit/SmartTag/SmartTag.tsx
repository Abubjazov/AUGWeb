import { FC, DragEvent } from 'react'

import { addUserTagToDapplet } from 'store/asyncThunks/userData'
import { useAppDispatch } from 'store/hooks'
import { setModalState } from 'store/slices/layoutSlice'
import Spinner from 'uikit/Spinner/Spinner'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SmartTag.module.css'

export enum ESmartTagMode {
  MY_TAG = 'my-tag',
  MY_TAG_MODAL = 'my-tag-modal',
  COMMUNITY_TAG = 'community-tag',
}

export interface SmartTagProps {
  userStyles?: string
  tagId: string
  dappletId?: string
  loading?: boolean
  mode?: ESmartTagMode
  label: string
  onClick?: (tagId: string) => void
}

const SmartTag: FC<SmartTagProps> = ({
  tagId,
  userStyles = '',
  loading = false,
  mode = ESmartTagMode.MY_TAG,
  label,
  onClick,
  dappletId,
}) => {
  const dispatch = useAppDispatch()

  const onDragStartHandler = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()

    event.dataTransfer.setData('tagId', tagId)
    event.dataTransfer.setData('mode', mode)
  }

  const onClickHandler = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()

    if (onClick) onClick(tagId)
  }

  const onDivClickHandler = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()

    if (mode === ESmartTagMode.MY_TAG_MODAL && dappletId) {
      const dragData = {
        dappletId: dappletId,
        userTagId: tagId,
      }

      void dispatch(addUserTagToDapplet(dragData)).finally(() =>
        dispatch(setModalState(false)),
      )
    }
  }

  return (
    <div
      data-testid="smart-tag"
      draggable
      onDragStart={onDragStartHandler}
      className={cc([styles.root, styles[mode], userStyles])}
      onClick={onDivClickHandler}
    >
      {loading ? (
        <div className={styles['spinner-wrapper']}>
          <Spinner width={20} height={20} strokeWidth={8} stroke="#fff" />
        </div>
      ) : (
        <>
          <span>{label}</span>
          {mode !== ESmartTagMode.MY_TAG_MODAL && (
            <button
              data-tag-id={tagId}
              aria-label={`Delete tag ${label}`}
              type="button"
              data-testid={'smart-tag-cross-button-' + tagId}
              className={styles.button}
              onClick={onClickHandler}
            >
              <SvgIcon icon={'smarttagcross'} />
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default SmartTag
