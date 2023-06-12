import { FC } from 'react'

import styles from './BaseButton.module.css'

export enum BaseButtonMode {
  OUTLINED = 'outlined',
  CONTAINED_BLUE = 'contained-blue',
  CONTAINED_RED = 'contained-red',
}

export interface BaseButtonProps {
  loading?: boolean
  disabled?: boolean
  mode?: BaseButtonMode
  label: string
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({
  loading = false,
  disabled = false,
  mode = BaseButtonMode.OUTLINED,
  label,
  onClick,
}) => {
  return loading ? (
    <div className={[styles.root, styles.skeleton].join(' ')}></div>
  ) : (
    <button
      type="button"
      data-testid="base-button"
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
