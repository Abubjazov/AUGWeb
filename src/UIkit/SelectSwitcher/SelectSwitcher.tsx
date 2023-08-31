import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SelectSwitcher.module.css'

export interface SelectSwitcherProps {
  userStyles?: string
}

const SelectSwitcher: FC<SelectSwitcherProps> = ({ userStyles = '' }) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      <span>Descending</span>
      <SvgIcon icon={'selectArrow'} />
    </div>
  )
}

export default SelectSwitcher
