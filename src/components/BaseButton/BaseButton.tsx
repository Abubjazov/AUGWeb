import { FC } from 'react'

import styles from './BaseButton.module.css'

export interface BaseButtonProps {
  disabled?: boolean
  mode?: 'outlined' | 'contained-blue' | 'contained-red'
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  disabled = false,
  mode = 'outlined',
  label,
  onClick,
}) => {
  return (
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
