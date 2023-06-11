import { FC } from 'react'

import styles from './BaseButton.module.css'

export interface BaseButtonProps {
  loading?: boolean
  disabled?: boolean
  mode?: 'outlined' | 'contained-blue' | 'contained-red'
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  loading = false,
  disabled = false,
  mode = 'outlined',
  label,
  onClick,
}) => {
  return loading ? (
    <div className={[styles.root, styles.skeleton].join(' ')}></div>
  ) : (
    <button
      type="button"
      data-testid="baseButton"
      disabled={disabled}
      className={[
        styles.root,
        styles[mode],
        `${disabled ? styles.disabled : ''}`,
      ].join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default BaseButton
