import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './DateSwitcher.module.css'

interface DateSwitcherProps {
  userStyles?: string
}
const DateSwitcher: FC<DateSwitcherProps> = ({ userStyles = '' }) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      <span>Release Date</span>
      <SvgIcon icon={'selectArrow'} />
    </div>
  )
}

export default DateSwitcher
