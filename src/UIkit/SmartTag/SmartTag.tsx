import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './SmartTag.module.css'

export enum SmartTagMode {
  MY_TAG = 'my-tag',
  COMMUNITY_TAG = 'community-tag',
}

export interface SmartTagProps {
  tagId: number
  userStyles?: string
  loading?: boolean
  mode?: SmartTagMode
  label: string
  onClick?: () => void
}

const SmartTag: FC<SmartTagProps> = ({
  tagId,
  userStyles = '',
  loading = false,
  mode = SmartTagMode.MY_TAG,
  label,
  onClick,
}) => {
  return loading ? (
    <div className={cc([styles.root, styles.skeleton, userStyles])}></div>
  ) : (
    <div draggable className={cc([styles.root, styles[mode], userStyles])}>
      <span className={styles.label}>{label}</span>
      <button
        data-tag-id={tagId}
        type="button"
        data-testid="cross-button"
        className={styles.button}
        onClick={onClick}
      >
        <SvgIcon icon={'smarttagcross'} />
      </button>
    </div>
  )
}

export default SmartTag
