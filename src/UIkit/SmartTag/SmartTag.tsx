import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './SmartTag.module.css'

export enum SmartTagMode {
  MY_TAG = 'my-tag',
  COMMUNITY_TAG = 'community-tag',
}

export interface SmartTagProps {
  loading?: boolean
  mode?: SmartTagMode
  label: string
  onClick?: () => void
}

const SmartTag: FC<SmartTagProps> = ({
  loading = false,
  mode = SmartTagMode.MY_TAG,
  label,
  onClick,
}) => {
  return loading ? (
    <div className={cc([styles.root, styles.skeleton])}></div>
  ) : (
    <div className={cc([styles.root, styles[mode]])} onClick={onClick}>
      <span className={styles.label}>{label}</span>
      <SvgIcon icon={'smarttagcross'} />
    </div>
  )
}

export default SmartTag
