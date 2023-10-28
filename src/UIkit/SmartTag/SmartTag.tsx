import { DragEvent, FC } from 'react'

import { addUserTagToDapplet } from 'services/userData/userData'
import { useAppDispatch } from 'store/hooks'
import { setModalState } from 'store/slices/layoutSlice'
import { SmallSpinner } from 'uikit/Spinner/SmallSpinner'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SmartTag.module.css'

export enum SmartTagMode {
  MY_TAG = 'my-tag',
  MY_TAG_MODAL = 'my-tag-modal',
  COMMUNITY_TAG = 'community-tag',
}

export interface SmartTagProps {
  tagId: string
  dappletId?: string
  userStyles?: string
  loading?: boolean
  mode?: SmartTagMode
  label: string
  onClick?: (tagId: string) => void
}

const SmartTag: FC<SmartTagProps> = ({
  tagId,
  userStyles = '',
  loading = false,
  mode = SmartTagMode.MY_TAG,
  label,
  onClick,
  dappletId,
}) => {
  const dispatch = useAppDispatch()

  const onDragStartHandler = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('tagId', tagId)
    event.dataTransfer.setData('tagMode', mode)
    event.dataTransfer.setData('tagLabel', label)
  }

  const onClickHandler = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()

    if (onClick) onClick(tagId)
  }

  const onDivClickHandler = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()

    if (mode === SmartTagMode.MY_TAG_MODAL) {
      const dragData = {
        dappletId: dappletId || '',
        userTag: {
          tagId,
          tagName: label,
        },
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
          <SmallSpinner />
        </div>
      ) : (
        <>
          <span>{label}</span>
          {mode !== SmartTagMode.MY_TAG_MODAL && (
            <button
              data-tag-id={tagId}
              aria-label={`Delete tag ${label}`}
              type="button"
              data-testid="smart-tag-cross-button"
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
