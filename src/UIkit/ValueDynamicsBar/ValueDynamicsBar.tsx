import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'
import { formatWithCurrency } from 'utils/formatWithCurrency/formatWithCurrency'

import styles from './ValueDynamicsBar.module.css'

export interface ValueDynamicsBarProps {
  userStyles?: string
  title?: string
  value: string
}

const ValueDynamicsBar: FC<ValueDynamicsBarProps> = ({
  userStyles = '',
  title,
  value,
}) => {
  const color = Number(value) >= 0 ? 'green' : 'red'

  return (
    <div className={styles.root}>
      {title && <span className={styles['title']}>{title}</span>}

      <div className={cc([styles.wrapper, userStyles, styles[color]])}>
        <SvgIcon icon={`${color}Triangle`} />

        {formatWithCurrency(value, '%')}
      </div>
    </div>
  )
}

export default ValueDynamicsBar
