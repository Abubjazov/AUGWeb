import { DragEvent, FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SmartTag.module.css'

export enum SmartTagMode {
  MY_TAG = 'my-tag',
  COMMUNITY_TAG = 'community-tag',
}

export interface SmartTagProps {
  tagId: string
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
}) => {
  const onDragStartHandler = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('tagId', tagId)
    event.dataTransfer.setData('tagMode', mode)
    event.dataTransfer.setData('tagLabel', label)
  }

  const onClickHandler = () => {
    if (onClick) onClick(tagId)
  }

  return loading ? (
    <div className={cc([styles.root, styles.skeleton, userStyles])}></div>
  ) : (
    <div
      data-testid="smart-tag"
      draggable
      onDragStart={onDragStartHandler}
      className={cc([styles.root, styles[mode], userStyles])}
    >
      <span className={styles.label}>{label}</span>
      <button
        data-tag-id={tagId}
        type="button"
        data-testid="smart-tag-cross-button"
        className={styles.button}
        onClick={onClickHandler}
      >
        <SvgIcon icon={'smarttagcross'} />
      </button>
    </div>
  )
}

export default SmartTag
