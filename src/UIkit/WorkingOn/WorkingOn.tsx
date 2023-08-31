import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './WorkingOn.module.css'

export interface WorkingOnProps {
  userStyles?: string
  dsOpened: boolean
}

const WorkingOn: FC<WorkingOnProps> = ({ dsOpened, userStyles = '' }) => {
  return (
    <div
      className={cc([
        styles.root,
        dsOpened ? '' : styles['ds-closed'],
        userStyles,
      ])}
    >
      <span className={styles['title']}>Working on</span>

      <div className={styles['list']}>
        <div className={styles['list-item']}>
          <SvgIcon icon={'redcross'} />
          <span className={styles['list-item-text']}>twitter.com</span>
        </div>

        <div className={styles['list-item']}>
          <SvgIcon icon={'redcross'} />
          <span className={styles['list-item-text']}>
            twitter.com/randomuser
          </span>
        </div>

        <div className={styles['list-item']}>
          <SvgIcon icon={'redcross'} />
          <span className={styles['list-item-text']}>facebook.com</span>
        </div>

        <div className={styles['list-item']}>
          <SvgIcon icon={'redcross'} />
          <span className={styles['list-item-text']}>
            facebook.com/randomuser
          </span>
        </div>
      </div>
    </div>
  )
}

export default WorkingOn
